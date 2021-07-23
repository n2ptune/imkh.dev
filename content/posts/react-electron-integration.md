---
title: 리액트와 일렉트론으로 데스크탑 애플리케이션 만들기 (포르젝트 초기 구성)
date: 2021-07-23 01:53:40
published: true
tags: ['react', 'electron']
cover_image: ./images/react-electron-inte-thumbnail.jpg
description: 리액트와 일렉트론으로 프로젝트를 초기 구성해보고 데스크탑 애플리케이션을 만들어보기
---

## electron-forge

electron-forge는 일렉트론 생태계에서 아주 멋있는 일을 하고있는 오픈소스다. 프로젝트 세팅부터 프로젝트 배포까지 개발을 제외한 모든 프로세스에 도움을 준다. 여기에서는 리액트 어플리케이션과 일렉트론을 통합해서 리액트로 데스크탑 애플리케이션을 만들 수 있는 방법을 정리한다.

### electron-forge 설치

[공식 문서](https://www.electronforge.io/)가 친절하게 설치 방법을 가이드하고 있으며, 다양한 패키지 매니저에 대한 커맨드를 출력해준다. (매우 친절) `npx`를 이용해서 손쉽게 설치할 수 있다. `yarn`의 경우 `yarn create` 커맨드를 통해 매우 쉽게 프로젝트를 설치할 수 있다. 이건 Create React App 등을 사용해서 프로젝트를 초기화하는 방식과 똑같다.

```sh
npx create-electron-app electron-typescript-react --template=typescript-webpack
```

뒤에 `--template` 옵션으로 `typescript-webpack`이라는 값을 주면 타입스크립트와 웹팩 세팅이 자동으로 되어있는 프로젝트가 생성된다.

### 프로젝트 구조

`webpack`과 관련된 파일이 4개 생성되고 메인 파일인 `webpack.main.config.js` 파일을 참조하면 된다.

그 외 타입스크립트 컴파일러 설정 파일인 `tsconfig.json` 파일과 `src` 디렉터리 내 HMTL, CSS, 타입스크립트 파일이 생성된 걸 볼 수 있는데 `index.ts` 파일은 이전 일렉트론 톺아보기에서 살펴봤던 그 예제 코드가 그대로 작성되어있다. 일렉트론은 이 상태로 프로젝트 세팅이 거의 끝났다고 보면 되며 이제 리액트 어플리케이션을 만들어 일렉트론과 접합시키는 과정을 거치면 된다.

## 리액트

`electron-forge` 위에 생성된 프로젝트이므로 Create React App 등을 사용해 리액트 프로젝트를 초기화하는 것과는 다르다. 리액트 의존성만 설치해서 사용하면 된다.

```sh
npm i react react-dom
npm i -D @types/react @types/react-dom
```

리액트 의존성을 설치하고 `tsconfig.json` 파일을 업데이트한다.

```json {13}
{
  "compilerOptions": {
    "allowJs": true,
    "module": "commonjs",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "noImplicitAny": true,
    "sourceMap": true,
    "baseUrl": ".",
    "outDir": "dist",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "jsx": "react",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["src/**/*"]
}
```

`jsx` 프로퍼티를 설정해준다. 그 후 `src` 디렉터리 내 `components` 디렉터리를 만들고 그 안에 리액트 컴포넌트들을 작성한다.

### 리액트 컴포넌트

최상단 컴포넌트 파일인 `App.tsx`을 작성하고 렌더링하기 위한 `index.tsx` 또 작성한다. 각각 아래와 같다.

```ts
import React, { useEffect, useState } from 'react'

const App: React.FC = () => {
  const [count, setCount] = useState(0)
  const [doubleCount, setDoubleCount] = useState(0)

  useEffect(() => {
    setDoubleCount(count * 2)
  }, [count])

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <div>double count : {doubleCount}</div>
    </div>
  )
}

export default App
```

간단히 버튼을 누르면 상태 값이 업데이트되는 간단한 컴포넌트이다.

```ts
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '../styles/index.css'

ReactDOM.render(<App />, document.querySelector('#app'))
```

최상단 컴포넌트를 렌더링하기위한 파일을 작성하고 `src/renderer.ts` 파일로 돌아와 수정한다.

````ts
/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './components'

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
)
````

리액트 컴포넌트를 렌더링하는 파일을 여기에서 임포트시키면 된다. 일렉트론 메인 진입점에서 `BrowserWindow` 인스턴스를 생성할 때 옵션 값을 변경해야한다.

```ts {6-9}
const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}
```

`webPreferences` 객체 내 `nodeIntegration` 속성을 `true`로 설정해야한다. 그렇지 않으면 나중에 빌드한 뒤 실행했을 때 `require` is not defined 라는 오류가 뜨게 된다.

```sh
npm run start # 개발 서버 시작
npm run make # 빌드
```

electron-forge에서는 다양한 maker를 제공해서 여러 OS에서 지원하는 실행 파일로 만들어버릴 수 있다. 예를 들어 맥에서 사용하는 `dmg` 확장자는 간단한 메이커 의존성을 설치하면 매우 손쉽게 빌드할 수 있다. `npm run make` 커맨드를 실행하면 `out` 디렉터리 내 빌드 파일이 만들어지게 된다.
