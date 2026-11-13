# Smoking Spot

주변의 흡연구역을 찾아 등록하고, 평점·댓글로 평판을 확인하는 위치기반 모바일 웹앱.
React + Vite 클라이언트 / Express + MongoDB 서버 ([smoking-spot-server](https://github.com/seongjooon/smoking-spot-server)), 둘 다 Vercel 에 배포합니다.

## 구조
- 로그인: Firebase Google 로그인 → 클라이언트가 Firebase ID 토큰을 `Authorization: Bearer` 로 전송 → 서버가 검증
- 지도/장소 검색: Google Maps JavaScript API + Places API (New)
- 이미지: 브라우저 → Vercel Blob 직접 업로드 (서버는 인증 후 업로드 토큰만 발급)

## 배포 순서

### 1. MongoDB Atlas
무료 클러스터 생성 → Database User 생성 → Network Access 에 `0.0.0.0/0` 허용(Vercel IP 가 고정이 아님) → 접속 URL 복사.

### 2. Firebase
1. 프로젝트 생성 → Authentication → 로그인 방법에서 **Google** 활성화
2. 프로젝트 설정 → 웹 앱 등록 → `apiKey`, `authDomain` 확인
3. Authentication → 설정 → 승인된 도메인에 **클라이언트 배포 도메인** 추가

### 3. Google Maps
Google Cloud 에서 **Maps JavaScript API** 와 **Places API (New)** 를 사용 설정하고 API 키 생성(결제 계정 필요).
키에 HTTP 리퍼러 제한(클라이언트 도메인, `localhost:5173`)을 반드시 걸어주세요.

### 4. Vercel — 서버
`smoking-spot-server` 저장소를 Import. 환경변수:

| 이름 | 값 |
|---|---|
| `DATABASE_URL` | Atlas 접속 URL |
| `FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID |
| `CLIENT_URL` | 클라이언트 주소 (쉼표로 여러 개 가능) |

그리고 프로젝트의 **Storage → Create → Blob** 을 만들어 연결하면 `BLOB_READ_WRITE_TOKEN` 이 자동 주입됩니다.
배포 후 `https://<서버>/health` 가 `{"ok":true}` 를 돌려주면 정상입니다.

### 5. Vercel — 클라이언트
이 저장소를 Import (Framework: Vite). 환경변수:

| 이름 | 값 |
|---|---|
| `VITE_API_URL` | 서버 배포 주소 (끝에 `/` 없이) |
| `VITE_FIREBASE_API_KEY` | Firebase apiKey |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase authDomain |
| `VITE_GOOGLE_API_KEY` | Google Maps 키 |
| `VITE_GOOGLE_MAP_ID` | (선택) Map ID |

클라이언트 도메인이 확정되면 서버의 `CLIENT_URL` 과 Firebase 승인 도메인에 반영하고 서버를 재배포하세요.

## 로컬 개발
```bash
# 서버 (.env.example 참고해서 .env 작성)
npm install && npm run dev        # http://localhost:5000
# 클라이언트
npm install && npm run dev        # http://localhost:5173
npm test
```

## 알려진 제한
- 지도 마커 클러스터링 없음 (스팟이 많아지면 추가 필요)
- 수정/삭제, 마이페이지, 평점순 정렬은 미구현
