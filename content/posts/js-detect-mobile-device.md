---
title: 자바스크립트로 모바일 기기 감지하는 여러 방법
date: 2020-11-02 08:01:17
published: true
tags: ['javascript', 'web']
cover_image: ./images/js-detect-mobile-detect-thumbnail.jpg
description: 자바스크립트로 모바일 기기를 감지하는 여러 방법에 대해서 조사해보고 정리하기
---

## 접근 방법

모바일 기기를 감지하기 위해 접근할 수 있는 방법은 `window` 객체의 `navigator` 속성 안에 `userAgent`를 통해 접근할 수 있다. 이 곳에는 사용자가 어떤 운영체제, 브라우저에서 접근했는지에 대한 정보가 담겨있다. 많은 방법이 있겠지만 일반적으로 생각할 수 있는 접근 방법에 대해서 정리하고 알아본다.

## [http://detectmobilebrowsers.com/](http://detectmobilebrowsers.com/)

페이지에는, 다양한 언어로 구현된 모바일 기기를 감지할 수 있는 소스 코드가 포함되어 있다. 자바스크립트로 구현된 코드를 보면, 결국에는 `navigator` 객체를 이용해서 구현한 걸 볼 수 있다. 매우 긴 정규식을 사용해서 다양한 조건에 해당하는 기기에서 접속하면 `true` 혹은 `false`를 반환하는 함수가 구현되어 있다.

코드를 직접 쓰지 않고도 모바일 기기인지 아닌지를 감지할 수 있기 때문에 매우 간편하며 정확히 모바일 기기를 감지할 수 있다.

## 정규식 배열

정규식 배열을 만들고 해당 정규식 중 하나라도 통과하면 해당 기기를 모바일 기기로 판단하는 함수 예다. 이 함수도 마찬가지로 `window.navigator.userAgent`를 사용한다.

```js
function detectMobileDevice(agent) {
  const mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ]

  return mobileRegex.some(mobile => agent.match(mobile))
}

const isMobile = detectMobileDevice(window.navigator.userAgent)

if (isMobile) {
  console.log('current device is mobile')
} else {
  console.log('current device is not mobile')
}
```

해당 함수는 실행될 때, `userAgent` 값이 하나라도 정규식 배열에 포함이 된다면 `isMobile` 값이 `true`가 된다. 해당 값이 `true`일 때 적절한 로직을 짤 수 있다.

## window.innerWidth

실제 모바일 기기가 중요한 것이 아니고 보여지고 있는 웹 페이지의 실제 크기에 따라 어떤 로직을 실행시켜야 한다면, 위의 방법들은 좋은 방법은 아니라고 할 수 있다. 단순 보여지는 부분의 너비 값을 계산해서 모바일 기기인지 아닌지를 감지할 수 있다.

```js
function detectMobileDevice() {
  const minWidth = 500

  return window.innerWidth <= minWidth
}

const isMobile = detectMobileDevice()
```

해당 함수는 실제 보이고 있는 너비의 값을 계산해서 모바일 기기인지 아닌지를 반환한다. 데스크탑 기기에서 브라우저의 창을 줄이면 해당 브라우저를 모바일 기기로 판단하는 것이 문제점이다. 실제로 모바일 기기의 어떤 기능을 이용하고자 하면 올바르지 않은 방법일 수 있다.

## 매우 짧은 정규식

맨 위에 나왔던 방법의 정규식은 매우 길었고 조건도 많았지만 이 정규식에 `userAgent` 값을 대입시키면 매우 실용적이며 일반적으로 사용하는 모바일 기기를 감지할 수 있다.

```js
const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
```

`userAgent` 값에 `iPhone`, `iPad`, `iPod`, `Android`가 포함되어 있는지를 체크하고 포함되어 있다면 접속한 기기를 모바일 기기로 감지한다.

## 그 밖의 방법들

현재는 권장되지 않는 방법으로, `window.orientation`을 이용하는 방법도 있고, 논외이지만 [Modernizr](https://modernizr.com/)라는 라이브러리를 활용해서 특정 기능을 사용할 수 있는지 감지할 수 있다.

DOM의 이벤트 중에 `TouchEvent` 라는 것이 있다. DOM이 이 터치 이벤트를 만들 수 있으면 모바일 기기로 감지하는 방법이 있는데, 이 이벤트는 모바일 외에 노트북도 터치 가능한 기기가 있고 태블릿도 감지하기 때문에 정확성이 떨어진다. (터치 가능한 데스크탑 모니터가 있을 수도 있다.)
