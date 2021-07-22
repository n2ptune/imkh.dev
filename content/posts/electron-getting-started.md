---
title: 일렉트론 톺아보기
date: 2021-07-22 05:31:05
published: true
tags: ['electron']
cover_image: ./images/electron-getting-started-thumbnail.jpg
description: 일렉트론 설치부터 빌드까지, 공식 문서 보며 차근차근 톺아보기
---

## Electron 톺아보기

Electron은 HTML, Javascript, CSS만으로 데스크탑 애플리케이션을 만들 수 있도록 도와주는 오픈소스다. 일렉트론에 대한 자세한 내용 혹은 내부 동작 방식 등은 여기에 정리하지 않는다. 산책하는 느낌으로 가볍게 일렉트론에 대해서 톺아본다.

### 설치

설치부터 모든 과정은 [공식문서 퀵 스타트 튜토리얼](https://www.electronjs.org/docs/tutorial/quick-start)을 따라 정리한다. 설치 및 프로젝트를 시작하기 전 사전에 준비되어야 하는 것들은 `npm`과 `node`가 설치되어 있어야 한다. `node`의 버전은 공식 문서에서 LTS 버전을 권장하고 있다.

일렉트론이 프로젝트를 빌드할 때 `package.json`의 여러 필드를 읽어들이므로 주의 깊게 작성해야한다.

```sh
npm init -y
```

테스트만 해볼 것이므로 대충 작성한다. `main` 필드에 자동으로 작성된 파일 명과 똑같은 파일을 하나 생성하고 자바스크립트를 작성한다.

```sh
npm i -D electron
```

그 전에 먼저 일렉트론 의존성을 설치한다.

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

`package.json`을 수정한다. `start` 명령어를 통해 프로젝트 개발 서버를 일렉트론이 실행시켜준다. 지금은 `main` 필드에 해당하는 자바스크립트 파일에 아무 것도 작성하지 않았으므로 아무런 동작도 하지않는다.

### 개발 서버 시작

일렉트론의 진입점은 항상 `package.json`에 명시된 `main` 필드의 파일이다. (부정확)

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    Hello Electron We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>, and Electron
    <span id="electron-version"></span>.
  </body>
</html>
```

먼저 화면을 보여줄 HTML을 작성한다. `node` 버전 및 브라우저 버전, 일렉트론 버전을 띄우기 위한 태그를 몇 개 삽입한다.

```js
const { app, BrowserWindow } = require('electron')
const path = require('path')
```

두 모듈을 불러온다. `app`은 말 그대로 일렉트론 어플리케이션 컨텍스트이며 `BrowserWindow`는 브라우저를 어플리케이션 형태처럼 띄워주는 클래스인 것 같다.

```js
const createWindow = () => {
  const __window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  __window.loadFile('./views/index.html')
}
```

창을 띄우기 위한 함수를 작성한다. 이 함수는 앞으로 보게 될 일렉트론 어플리케이션 창을 띄우기 위한 함수로 자주 사용된다. `webPreferences` 프로퍼티가 있는데, 이 프로퍼티를 이용해 창을 띄움으로서 외부 자바스크립트 파일을 불러올 수 있다. 여기서는 `preload.js` 파일을 작성하고 여기에 아까 버전별로 만들어놓은 태그에 버전을 기입하는 스크립트를 작성한다.

```js
// preload.js
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

크롬, 노드, 일렉트론의 버전을 표기하는 스크립트를 작성했다. (공식문서 참고)

```js
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

어플리케이션이 준비되면 창을 만들어주는 함수를 작성한다. 컨텍스트의 `whenReady` 함수는 프로미스를 반환하는 함수며 어플리케이션이 준비되면 `resolve` 되는 것 같다.

```js
app.on('ready', () => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```

`whenReady` 함수를 사용하지 않고 `on` 메서드를 통해 이벤트를 등록시킬 수 있는 것 같다. 두 방식의 차이점은 조금 더 알아봐야할 것 같다.

```sh
npm start
```

정상적으로 모든 파일을 작성했다면 아래 사진처럼 일렉트론 어플리케이션이 구동된다.

![Electron Example](./images/electron-getting-started-1.png)

### 빌드

일렉트론 생태계에는 `electron-forge`라는 일렉트론을 도와주는 오픈소스가 있다. 어떤 걸 도와주느냐면 프로젝트 생성, 배포, 설치, 빌드 등 다양한 기능을 도맡아서 해주는 아주 착한 녀석이다. 본래 이 녀석을 이용해서 프로젝트를 처음부터 시작하는 방법도 많이 사용하지만 여기에서는 그렇지 않았기 때문에 존재하는 일렉트론 프로젝트에 `electron-forge`를 이용하는 방법에 대해서 정리한다.

```sh
npm i -D @electron-forge/cli
npm exec --package=@electron-forge/cli -c "electron-forge import" # npm version >= 7
npx electron-forge import # npm version 6
```

몇 가지를 물어보고 적당히 대답하면 `package.json`을 통으로 수정해주고 빌드 파일을 떨어뜨릴 수 있게 명령어도 만들어준다.

```sh
npm run make
```

해당 명령어를 사용하면 기본적으로 out 이라는 디렉터리에 빌드 파일이 떨어진다.

```sh
npm i -D @electron-forge/maker-dmg
```

MacOS에서 사용하는 `dmg` 확장자 앱으로 빌드하기 위해 의존성을 설치한다.

```json
"config": {
  "forge": {
    "packagerConfig": {},
    "makers": [
      {
        "name": "@electron-forge/maker-squirrel",
        "config": {
          "name": "electron_test"
        }
      },
      {
        "name": "@electron-forge/maker-zip",
        "platforms": [
          "darwin"
        ]
      },
      {
        "name": "@electron-forge/maker-deb",
        "config": {}
      },
      {
        "name": "@electron-forge/maker-rpm",
        "config": {}
      },
      {
        "name": "@electron-forge/maker-dmg",
        "config": {
          "format": "ULFO"
        }
      }
    ]
  }
}
```

`package.json`을 위 처럼 수정한다. 그리고 다시 `npm run make` 명령어를 실행하면 `dmg` 파일이 생성된다.
