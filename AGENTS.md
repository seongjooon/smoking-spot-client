# AGENTS.md — smoking-spot-client

흡연구역 지도 웹앱(모바일 우선)의 클라이언트. 서버: https://github.com/seongjooon/smoking-spot-server

## 스택
React 19 · Vite · React Router 7 · Redux Toolkit · SCSS · Firebase Auth(Google) · `@vis.gl/react-google-maps`(+ `@googlemaps/markerclusterer`) · Vercel Blob(클라이언트 직접 업로드) · Vitest + Testing Library

## 명령
```bash
npm install
npm run dev      # http://localhost:5173
npm test         # vitest (6개)
npm run build
```
PR/푸시마다 CI(`.github/workflows/ci.yml`)가 `npm ci`, `npm test`, `npm run build` 를 실행한다. 두 가지 다 로컬에서 통과시킨 뒤 푸시할 것.

## 구조
- `src/App.jsx` 라우팅(`/home`, `/spots`, `/spots/new`, `/spots/:id`), 로그아웃 상태면 `/home` 으로 리다이렉트. `APIProvider` 가 지도 스크립트를 한 번 로드한다.
- `src/lib/api.js` axios 래퍼. 요청마다 `auth.currentUser.getIdToken()` 으로 `Authorization: Bearer` 를 붙이고, 이미지는 `uploadImage` 가 Blob 으로 직접 올린다.
- `src/lib/firebase.js`, `useAuth.js` 로그인 상태(`undefined` 확인 중 / `null` 로그아웃 / user), 로그인되면 서버 `POST /users` 호출.
- `src/lib/usePlaceSearch.js` + `components/PlaceSearch.jsx` Places API (New) 자동완성.
- `src/store/index.js` Redux 슬라이스(spotList, selectedSpot, coments, error)와 thunk.
- `src/components/` `Map`, `ClusteredMarkers`, `Detail`, `New`, `Stars`, 그리고 SCSS.

## 환경변수 (`.env.example` 참고, Vite 라서 `VITE_` 접두사)
`VITE_API_URL`, `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_GOOGLE_API_KEY`, (선택) `VITE_GOOGLE_MAP_ID`

## 규칙 / 주의
- 비밀값을 클라이언트 번들에 넣지 말 것(`VITE_*` 는 전부 공개된다). 서버 비밀키는 서버에만 둔다.
- 작성자 정보는 서버가 토큰에서 정하므로 클라이언트가 이메일을 body 로 보내지 않는다.
- 테스트는 `vite.config.js` 의 더미 Firebase 환경변수에 의존한다. `src/lib/firebase.js` 를 import 하는 코드를 테스트할 때 유의.
- 브랜치: 기준은 `seongjoon` (`master` 없음). 병합은 사용자 요청이 있을 때만.

## 아직 검증되지 않은 것
실제 키가 필요한 동작(Google 로그인, 지도 렌더링/클러스터링, 자동완성, 이미지 업로드, 실제 DB 연동)은 한 번도 실제 환경에서 실행해 보지 못했다. 가짜 Firebase/API + Playwright 로 화면 흐름만 확인했다.

## 미구현
장소 수정/삭제, 마이페이지, 평점순 정렬, E2E 테스트 자동화.

배포 순서와 환경변수 설정은 `README.md` 참고.
