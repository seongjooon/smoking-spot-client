# Smoking Spot

![main-logo](main-logo.png)

>## Contents

- [Introduction](#Introduction)
- [Installation](#Installation)
- [Additional requirement](#Additional-requirement)
- [Usage](#Usage)
- [Tech](#Usage)
- [Chellenges](#Chellenges)
- [Things to do](#Things-to-do)
- [Version Control](#Version-Control)
- [Other tools](#Other-tools)

>### Introduction

비흡연자, 흡연자 모두가 쾌적할 수 있도록 주변의 Smoking Spot(흡연 구역)을 찾아주는 위치기반의 모바일 전용 웹 어플리케이션. 원하는 흡연구역의 주소를 검색하고 사진을 첨부하고 등록할 수 있다. 현재위치, 원하는 위치의 주변 흡연 구역을 찾을 수 있다. 흡연구역의 상세페이지에서는 평점과 댓글을 추가할 수 있으므로 사용하기 전에 검색을 통해서 구역의 평판을 확인할 수 있다.

#### Click!

[![simulation-screenshot](simulation-screenshot.png)](https://www.youtube.com/watch?v=3vRajzFeuJg)

>### Installation

#### - Client

```
git clone https://github.com/MrKamake/smoking-spot-client.git
cd 1984-client
yarn install
yarn start
```

#### - Server

```
git clone https://github.com/MrKamake/smoking-spot-server.git
cd 1984-server
yarn install
yarn start
```

>### Additional requirement
- Set client envirionment

```
.env
REACT_APP_FIREBASE_API_KEY="Input your firebase api key.."
REACT_APP_FIREBASE_AUTH_DOMAIN="Input your firebase auth domain key.."
REACT_APP_GOOGLE_API_KEY="Input your google api key.."
REACT_APP_SECRET_KEY="Input your secret key.."
```

- Set server envirionment

```
.env
DATABASE_URL="Input your MongoDB cluster url.."
SECRET_KEY="Input your secret key.."
ONE_HOUR=3600000
CLIENT_URL=http://localhost:3000
AWS_ACCESS_KEY_ID="Input your aws access key.."
AWS_SECRET_ACCESS_KEY="Input your aws secret access key.."
```

>### Usage

1. Social service을 통해 Sign in.
2. New 버튼이나 (+) 버튼을 클릭해서 새로운 흡연구역 추가 가능.
3. 사용자가 직접 찍은 사진 첨부, 구역의 별명, 주소검색, 상세 주소 추가.
4. Map 버튼을 클릭해서 현재 위치에서 주변의 흡연구역 촥인.
5. 등록된 흡연구역 클릭시, 작은 창에 간단한 정보 확인 가능.
6. 작은 창 클릭해서 해당 구역의 상세 페이지의 평점, 댓글 확인 가능.
7. 평점과 댓글 추가 가능.

>### Tech

- Javascript (ES2015+)
- React, for component based architecture
- Routing using react-router
- State management using redux
- Node.js
- Express
- Mongo DB
- Mongoose, object data modeling library for Mongo DB
- Sass, for easy to understand stylesheet
- Google Maps API

>### Chellenges
- **React(Lifecycle) 활용의 어려움**

  : Google Maps API의 Vanilla Javascript Guid를 React Lifecyle에 맞게 변형 또는 접목시키는 부분이 어려웠다. 기초적인 Javascript와 React에 대한 이해가 더 필요하다고 생각해서 문서나 참고할 만한 블로그들을 보며 직접 예제들을 만들어서 해결했다.

>### Things to do

>### Version Control

- git 을 사용.
- 새로운 브랜치를 생성하고 master 브랜치에 병합.

>### Other tools

- Notion의 Status를 이용한 task 세분화 및 스케줄 관리
- Lucidchart를 이용한 Schema design.
- Oven을 이용한 Mockup design.
- Redux devtools extention을 이용한 debugging.
