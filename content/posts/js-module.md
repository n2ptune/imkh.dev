---
description: Nodejs가 어떻게 모듈을 내보내고 가져오는지에 대한 정리
cover_image: ./images/js-module-thumbnail.png
tags: ['nodejs', 'javascript']
published: true
date: 2020-04-11
title: 자바스크립트에서 모듈을 가져오고 사용해보자 (js-module)
---

## 배우기 전에

- 이 포스트에서 말하는 **자바스크립트**는 **Node.js** 런타임 위에서 동작하는 자바스크립트를 말한다.
- 자바스크립트 모듈은 파일 단위로 쪼개진 자바스크립트 파일을 의미한다.
- 브라우저 밖에서 자바스크립트를 사용하기 위해(범용적으로 사용하기 위해) 필요한 모듈화와 모듈 시스템에 대해서 알아본다.

## CommonJS

**CommonJS**는 자바스크립트를 범용적으로 사용하기 위해 여러 표준을 만들어 명세를 작성하는 조직이다. 초기에는 **ServerJS**라는 이름으로 시작했지만 **CommonJS**로 이름을 바꿨다. 서버 사이드 외 데스크탑 애플리케이션이나 앞으로 나올 수 있는 여러 디바이스들에서도 자바스크립트를 사용할 수 있게 하겠다는 이유에선가 이름을 바꿨다.

아직 Node.js가 탄생하기 전, 이 조직은 자바스크립트가 브라우저 밖에서 사용되려면 지켜져야 할 여러 표준들을 만들어내기 시작했다. 그 중 하나가 타 언어와 같은 모듈 체계를 만들어야 된다고 생각했다. 그리고 자바스크립트가 서버 사이드에서 사용되기에 부족한 점에 대해 의논했다.

자바스크립트는 애초에 브라우저 밖에서 사용될 목적으로 만들어진 언어가 아니기 때문에 데이터베이스에 연결할 수 있는 표준 인터페이스가 있는 것도 아니었고, 다른 모듈을 불러오거나 내보내거나 하는 기능도 없을 뿐더러, 만약 이 모듈 시스템이 만들어지면 이 모듈에 대한 의존성, 모듈을 패키징하고 배포, 설치하는 표준 시스템이 필요했다.

## 모듈화

결국에 제시된 문제들을 해결하려면 모듈화가 선행되어야 한다. 자바스크립트에서 타 언어처럼 모듈을 불러오거나 내보낼 수 있는 표준 시스템을 정립한다면 위의 문제가 모두 해결될 거라 생각했다. 그래서 모듈화에 대한 내용을 다음과 같이 정했다.

- Scope: 모든 모듈은 자신만의 독립적인 영역이 있어야 한다.
- Definition: 모듈 정의는 exports 객체를 이용한다.
- Usage: 모듈은 `require()`로 불러온다.

## Scope

현재 우리가 사용하고 있는 Node.js에서는 한 모듈(파일)당 독립적인 영역이 존재하기 때문에 서로 다른 모듈의 변수명이 충돌하는 문제가 일어나지 않는다. 하지만 이 문제가 왜 제시됬고 Node.js는 이 문제를 어떻게 해결했는지에 대해 알아보면 좋은 공부가 될 것 같다.

먼저 아래와 같은 폴더 구조를 만든다.

```bash
.
├── index.html
└── js
    ├── a.js
    └── b.js
```

`index.html`에서 두 자바스크립트 파일(편의상 모듈 a와 모듈 b)을 불러 온다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./js/a.js"></script>
    <script src="./js/b.js"></script>
  </body>
</html>
```

그리고 모듈 각각에 간단한 코드를 작성한다.

```js
// a.js
var something = 123
console.log(something)

// 123
```

``

```js
// b.js
console.log(something)

// 123
```

이런 상황이 벌어질 수 있다. 모듈 a의 규모가 크고, 모듈 b의 규모도 어느정도 된다면 분명 사용하는 변수명에 있어서 충돌이 있을 수가 있다. `let`을 쓰던 `var`를 쓰던 `<script>`로 불러 온 자바스크립트 파일은 한 스코프에 묶여 모두 같은 변수명을 공유한다.

Node.js는 이런 문제를 해결하기 위해 각각의 모듈은 각각 독립적인 영역을 갖도록 설계했다. 그래서 위와 비슷한 구조를 갖는 프로젝트가 있다면 Node.js에서는 모듈 a와 b가 서로 각각 영역을 갖기 때문에 모듈 b에서 에러가 난다. (something is not defined)

## Definition & Usage

위의 방식대로 서로 각각의 독립적인 영역을 갖는 것이 필요할 때도 있고 각각의 모듈들이 어떤 데이터를 공유해야 하는 상황이 필요할 때도 있다. 그래서 Node.js는 전역 객체를 통해 이런 문제를 해결하도록 했다.

위의 예제에서 똑같은 구조로 `index.js` 파일을 추가하고 수정했다.

```js
// index.js
const a = require('./js/a')
const b = require('./js/b')
```

모듈을 불러올 때 Node.js에서는 `require` 함수를 사용해서 모듈을 불러온다. Node.js에서 처음 실행 된 `index.js` 파일에서 전역 객체를 갖고 있다가, 다른 모듈에서 내보내는 데이터가 명시되어 있으면 모듈의 데이터를 전역 객체에 바인딩 시킨다. 이렇게 함으로써 모듈 간 기능을 공유할 수 있다.

간단하게 코드를 작성한다.

```js
// a.js
exports.a = function (num) {
  return num + 2
}

// b.js
exports.b = function (num) {
  return num - 2
}
```

모듈들은 `exports` 전역 객체를 통해 어떤 기능을 내보내고 어떤 데이터를 내보낼 수 있다. 함수도 내보낼 수 있고, 변수도 내보낼 수 있다. 그리고 이런 모듈들을 다른 모듈에서 쉽게 사용할 수 있다.

```js
// index.js
const moduleA = require('./js/a')
const moduleB = require('./js/b')

console.log(moduleA.a(1))
console.log(moduleB.b(3))
// 3
// 1
```

`require` 함수를 이용해서 모듈을 불러오고, 모듈에서 전역 객체에 등록했던 것과 같은 이름의 객체를 사용한다. Node.js에서는 위와 같이 CommonJS의 표준 모듈 명세를 따라 설계됬다. 그래서 위와 같은 모듈화를 이뤄냈다.

## AMD

AMD(Asynchronous Module Definition)는 필요한 모듈을 네트워크 통신을 이용해서 내려받아야 하는 브라우저 환경에서도 모듈을 사용할 수 있도록 CommonJS처럼 명세를 작성하는 조직이다.

CommonJS는 모듈에 대한 명세를 자바스크립트를 브라우저 바깥에서 사용한다는 것에 초점을 두고 명세를 만들었기 때문에 브라우저 내 자바스크립트 실행에 중점을 둔 AMD와 합의를 하지 못하고 결국 둘은 분리되었다.

둘다 서로 다른 명세를 제시하지만 어느 쪽이 더 좋다라는 것을 분명히 말할 수 없다. CommonJS에서는 이미 로컬에 다운로드 된 모듈을 불러와 사용해서 서버와 통신으로 파일을 받아야 실행할 수 있는 브라우저 환경에서는 조금 얘기가 다르다. 이런 브라우저 환경에서는 AMD가 조금 더 낫다라고 말할 수 있다.

AMD의 모듈 명세는 비동기 환경에서도 잘 작동하고 서버 사이드에서도 물론 잘 작동한다. CommonJS의 모듈 전송 포맷보다 더 간단 명확하다. AMD에서는 `define` 함수를 통해 전역 변수 문제를 해결하며 해당 모듈을 필요한 시점에 불러오는 Lazy Load 기법까지 응용이 가능하다.

## RequireJS

AMD 명세에 따라 구현된 자바스크립트 로더다. CommonJS의 스타일 포맷도 지원하고 가볍고 배우기 쉽다.

[https://requirejs.org/docs/api.html](https://requirejs.org/docs/api.html)를 참고하면 API문서가 잘 정리되어서 매우 배우기 쉽다는 느낌을 받는다.

## 참고

- [https://requirejs.org/docs/api.html](https://requirejs.org/docs/api.html)
- [http://www.commonjs.org/history](http://www.commonjs.org/history)
- [https://d2.naver.com/helloworld/12864](https://d2.naver.com/helloworld/12864)
