---
title: React와 Firebase 프로젝트 초기 환경설정
date: 2020-12-05 15:19:02
published: true
tags: ['react', 'firebase']
cover_image: /images/thumbnail-phone.jpg
description: React에서 Firebase를 사용하기 위해서 애플리케이션을 초기화 하기
---

## Firebase

[Firebase](https://firebase.google.com/)는 웹 애플리케이션 혹은 기타 다른 애플리케이션 프로젝트를 시작할 때 필요한 도구를 제공하는 서비스다. 필요한 도구라고 하면 다양한 종류의 도구들이 있다. 예를 들어 우리가 프론트엔드 라이브러리인 리액트를 이용해서 웹 애플리케이션을 개발했다고 가정하고, 애플리케이션이 빌드되고 난 후의 정적 파일들(HTML, CSS, 자바스크립트)은 웹 호스팅 서버에 파일을 올려야만 다양한 유저들이 주소를 통해 들어와서 우리가 만든 리액트 애플리케이션을 볼 수 있다. 여기서 도구는 웹 호스팅 서버이다. Firebase는 이러한 웹 호스팅 서버뿐만이 아니라 Database, Analytics, Cloud Functions 등 다양한 서비스를 제공하고 문서 또한 한글화가 잘되어 있으며 프로젝트를 구축할 때 개발자가 개발에만 집중할 수 있게 도와준다.

포스트에서 리액트에 Firebase 앱을 통합시키고 초기화하는 방법을 정리하고 복습한다.

### 프로젝트 만들기

프로젝트는 구글 계정이 필요하며 [공식 사이트](https://firebase.google.com/)에 프로젝트를 시작하는 동영상과 가이드를 제공하므로 프로젝트를 만드는데에 어려움이 없다.

### 리액트 프로젝트에 SDK 설치

Node.js와 브라우저에서 사용할 수 있는 SDK를 제공한다. 자바스크립트 이외의 다른 언어로도 구현되어 있어서 다른 언어를 사용할 계획이라면 문서를 보고 알맞게 설치할 수 있다.

```sh
yarn global add firebase-tools
```

`firebase-tools`는 Firebase의 여러 기능을 CLI 환경에서 사용할 수 있게 제작된 도구이다. 프로젝트 설정, 에뮬레이터 구동, 테스트 등 다양한 도구를 제공한다. 이 도구가 주는 편리함이 매우 좋기 때문에 설치해서 사용한다.

```sh
yarn add firebase
```

현재 리액트 프로젝트에 Firebase SDK를 설치한다. 여기에는 Auth, Firestore 등 다양한 패키지들이 포함되어 있다.

### 호스팅 사용하기

호스팅 또한 Firebase에서 제공하는데, 도메인과 무료 HTTPS까지 제공한다. CLI를 통해 간단히 현재 프로젝트에 호스팅을 사용하도록 설정할 수 있다.

```sh
firebase init
```

프로젝트 폴더에서 위 명령어를 실행하면 어떤 서비스를 설치할 건지 묻는 글이 나온다. 스페이스바를 통해 원하는 서비스를 선택할 수 있다. 여기서는 호스팅만 체크하여 넘어가도록 한다.

호스팅을 체크하고 엔터를 누르면 어떤 Firebase 프로젝트에 사용할건지 묻는다. 먼저 Firebase 프로젝트를 만들었다고 가정하고, 로그인이 되어 있지 않다면 로그인 후에 원하는 프로젝트를 설정한다. 그 다음 SPA가 정상적으로 작동하기 위해 모든 경로에 대해 `index.html`을 제공할까? 라는 문장이 나오면 Y라고 입력하고 엔터를 누른다. (나중에 바꿀 수 있다) 빌드된 폴더가 어딘지 묻는 폴더에 알맞는 폴더명을 입력한다. (나중에 바꿀 수 있다)

```sh
firebase deploy --only hosting
```

빌드된 폴더명을 지정했으면 그 안에 있는 정적 파일들을 위 명령어로 호스팅 서버에 올릴 수 있다. 모두 올려지면 Firebase Console에서 확인할 수 있으며 각 정적 파일들을 버전별로 제공한다.

## 리액트 프로젝트에 통합

리액트가 컴포넌트를 렌더링하기 전에 Firebase를 초기화하고 컴포넌트에서 사용할 수 있도록 한다. Firebase 호스팅을 사용하면 예약된 경로에 Firebase 관련 설정 파일과 패키지 SDK가 포함되어 간단하게 불러올 수 있다.

### 설정 가져오기

콘솔 -> 프로젝트 개요에 해당 프로젝트의 API KEY, ID 등 정보가 담겨져 있으며 SDK에서 초기화하기 위해 정보들이 필요하다. 해당 정보들을 `.env` 파일에 저장하고 설정 파일에서 사용한다.

```
REACT_APP_API_KEY=xxxxxxxxxxxxxxx
REACT_APP_AUTH_DOMAIN=xxxxxxxxxxx
REACT_APP_DATABASE_URL=xxxxxxxxx
REACT_APP_ID=xxxxxxxxxx
REACT_APP_PROJECT_ID=xxxxxx
```

### 프로덕션 환경 / 개발 환경

각각 다른 환경에서 설정 파일을 불러와야 한다. 개발 환경에서는 만들어놓았던 `.env`에 있는 값들을 사용하면 되고, 프로덕션 환경에서는 URL을 통해 설정 값들을 가져오도록 한다.

```js
// firebase.config.js
if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dev')
} else {
  module.exports = require('./prod')
}
```

Firebase 초기화 메서드에서 위의 파일을 불러온다. 해당 파일은 환경에 따라 다른 파일을 내보낸다.

```js
// dev.js
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_ID
}

const getFirebaseConfig = () =>
  new Promise((resolve, reject) => resolve(firebaseConfig))

export default getFirebaseConfig

// prod.js
import axios from 'axios'

const getFirebaseConfig = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/__/firebase/init.json')
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}

export default getFirebaseConfig
```

예약된 URL이 제공되기 때문에 `/__/firebase/init.json`에는 `.env`에 작성했던 설정 값들과 비슷한 값들이 제공된다. 이제 초기화 로직에 위의 파일을 불러와서 앱을 초기화하면 된다.

### 초기화

```js
// firebase.js
import getFirebaseConfig from 'api/config/firebase.config'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

async function init() {
  const config = await getFirebaseConfig()

  firebase.initializeApp(config)
}

export { init }
export default firebase
```

Firebase 앱을 초기화하는 `init` 메서드를 만들고 해당 메서드를 내보낸다.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { init as fireabseInit } from 'api/firebase'

fireabseInit()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
```

내보냈던 `init` 메서드를 Entry Point에서 실행시킨다. 이제 Firebase를 리액트 프로젝트 어디에서나 사용할 수 있다.
