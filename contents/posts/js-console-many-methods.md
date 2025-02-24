---
description: 평소 자주 사용하던 console에 대해 다양한 함수들을 정리
cover_image: /images/js-console-object.png
tags: ['javascript']
published: true
date: 2020-03-14
title: Javascript Console Object(자바스크립트 콘솔 객체)
---

## Window.console

`console` 객체는 브라우저에서 작동하는 자바스크립트에서 `window` 하위 객체이고 Node.js 환경에서는 `global` 하위 객체이다. 워커를 사용하는 환경에서는 `WorkerGlobalScope` 속성으로 사용할 수 있다.

이 객체는 말 그대로 콘솔에 어떤 동작을 할 수 있게 도와주는 객체다. 터미널로 어떤 문자열을 출력하기 위해서 사용하거나, 브라우저의 개발자 도구 중 콘솔에 어떤 내용을 찍게 하거나 도와주는 객체다.

## console.assert

`assert` 함수는 테스트 환경에서 주로 사용했던 그 함수와 비슷한 동작을 한다. 첫번째 매개변수가 거짓이라면 그 뒤에 오는 문자열이나 객체를 출력한다.

```js
for (let n = 1; n < 20; n++) {
  console.log(n)
  console.assert(n % 2 === 0, '%d은 짝수가 아님', n)
}

// output: 1
//    VM501:3 Assertion failed: 1은 짝수가 아님
//    (anonymous) @ VM501:3
//    VM501:2 2
//    VM501:2 3
//    VM501:3 Assertion failed: 3은 짝수가 아님
//    (anonymous) @ VM501:3
//    VM501:2 4
//    VM501:2 5
//    VM501:3 Assertion failed: 5은 짝수가 아님
//    (anonymous) @ VM501:3
//    VM501:2 6
//    VM501:2 7
```

`assert`의 첫번째 매개변수는 `Boolean` 값을 포함한 거짓과 참을 표현할 수 있는 모든 표현식이 올 수 있다. 두번째 매개변수로 문자열이 오게되면 그 뒤로 오는 매개변수들은 두번째 매개변수의 문자 치환 값으로 쓰이게 된다. (위의 예제에서는 %d가 n으로 치환됨)

문자열 대신 객체가 올 수 있다. `console.log`의 치환 문자열은 거의 모든 브라우저에서 작동하지만 `console.assert`에서 사용되는 치환 문자열은 일부 브라우저에서 작동하지 않는다.

- [브라우저 호환성](https://developer.mozilla.org/ko/docs/Web/API/Console/assert#%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%ED%98%B8%ED%99%98%EC%84%B1)

## console.clear / console.count

`console.clear`는 리눅스의 `clear` 명령어 처럼 단순히 콘솔의 내용을 지우기만 한다. 브라우저에서 사용시 할당된 변수의 값과 같이 다 사라지는 것이 아니라, 정말 콘솔에 출력된 내용만 지움.

`console.count`는 어떤 라벨의 콘솔이 몇 번 호출되었는지 그 횟수를 출력해주는 함수

```js
function printWithLabel(label) {
  console.count(label)
  return `Hello, ${label}`
}

printWithLabel('Mike')
printWithLabel('Mike')
printWithLabel('Mike')
printWithLabel('Kim')
printWithLabel('Kim')
printWithLabel('Lee')
printWithLabel('Kim')

// Mike: 1
// Mike: 2
// Mike: 3
// Kim: 1
// Kim: 2
// Lee: 1
// Kim: 3
```

매개변수 `label`은 선택적이며 있어도 되고 없어도 되지만 없으면 기본 값인 default로 지정된다.  
`console.countReset`은 카운팅된 레이블을 초기화시킨다.

```js
function printWithLabel(label) {
  console.count(label)
  return `Hello, ${label}`
}

printWithLabel('Mike')
printWithLabel('Mike')
printWithLabel('Mike')
printWithLabel('Kim')
printWithLabel('Kim')
printWithLabel('Lee')
console.countReset('Kim')
printWithLabel('Kim')

// Mike: 1
// Mike: 2
// Mike: 3
// Kim: 1
// Kim: 2
// Lee: 1
// Kim: 1
```

위의 예제와 똑같은 예제지만 중간 `console.countReset`을 추가해본다. 본래대로라면 Kim이란 레이블을 가지는 카운팅은 총 3회 호출되며 Kim: 3이 최종 결과값으로 기대되지만 카운팅을 리셋시킴으로써 0이 되고, 그 후에 한번 카운팅 되어 최종 출력값은 1이 된다.

이 함수는 반복문에서의 간략한 테스트나(갯수가 맞는지에 대한) 어떤 수의 누락 등을 체크해볼 때 좋은 방법인 것 같다.

## console.debug

디버그 중요도를 콘솔에 출력하는 함수, 크롬 개발자 도구에서는 로그 레벨을 **Verbose**까지 올리고 함수를 사용하면 콘솔의 내용이 파란색 글씨로 표시된다. 그 외에는 `log` 함수와 차이가 없다.

## console.dir / console.dirxml

때로 크롬 개발자 도구에서 `document.querySelector` 혹은 DOM을 조작하기 위해 해당 DOM을 선택하고 변수에 저장해서 `console.log`로 띄우면 다음과 같이 표시될 때가 있다.

![js-console-object-example](/images/js-console-object-example.png)

실질적으로 이 DOM이 가지고 있는 속성이나 함수를 알지 못하기 때문에 불편함이 있다. `console.dir`은 이런 문제를 해결하기 위한 좋은 대안이다.

![js-console-object-example-2](/images/js-console-object-example-2.png)

`document.querySelector`로 DOM을 잡고 변수에 할당한 뒤에 `console.dir`로 뿌려준 결과다. 이렇게하면 DOM이 가지고 있는 모든 속성이나 함수 값을 콘솔에서 확인할 수 있다.

이 함수는 자바스크립트에서 객체의 속성을 대화식 목록으로 만들어 계층 구조 목록으로 표시한다. 이 방법을 사용하면 자바스크립트 객체가 가진 모든 속성을 확인할 수 있다.

`console.dirxml`은 매개변수가 XML 혹은 HTML로 표현이 될 수 있으면 그렇게 표시하고, XML이나 HTML로 표현이 되지 않는다면 자바스크립트 객체로 표현한다.

```js
const postContent = document.querySelector('.post-content')

console.dir(postContent) // 자바스크립트 객체로 표현됨
console.dirxml(postContent) // 매개변수가 HTML로 표현이 가능하므로 HTML로 표현됨
console.log(postContent) // HTML로 표현됨
```

위의 예제에서는 3개의 함수 중 `dir` 함수는 자바스크립트 객체로 매개변수를 표현하고, `dirxml` 함수는 매개변수가 HTML로 표현이 되므로 HTML로 표현하고, `log` 함수는 매개변수를 HTML로 표현한다.

- [브라우저 호환성 - console.dir](https://developer.mozilla.org/ko/docs/Web/API/Console/dir#Browser_compatibility)
- [브라우저 호환성 - console.dirxml](https://developer.mozilla.org/en-US/docs/Web/API/Console/dirxml#Browser_compatibility)

## console.exception / console.error

에러를 표시하기 위한 함수. 두 함수는 똑같은 기능을 하며 `console.exception`은 `console.error`의 별칭이다. deprecated된 API다.

첫번째 매개변수로 문자열이나 객체 n개를 받을 수 있다. 매개변수가 객체로 시작된다면 객체가 매개변수 순서대로 표시되고 문자열로 시작한다면 치환 가능한 문자열로 출력된다.

```js
console.error(
  'Error Code: %d, Error Message: %s',
  Math.floor(Math.random() * 404 + 100),
  '오류 발생'
)

// Error Code: 227, Error Message: 오류 발생
```

더이상 치환할 수 없다면 본래 메세지에 문자열을 이어붙여서 출력한다.

## console.group

콘솔에 그룹을 만든다. 폴더 형식을 생각하면 쉽다. 새로운 폴더 하나를 만들고 그 안에 콘솔의 내용을 담는다. `groupEnd` 라는 함수를 만나기 전까지 모든 콘솔의 내용을 담다가 이 함수를 만나게 되면 바깥쪽 그룹으로 나가게된다.

```js
console.log('Outer Console Group')

console.group('level-1') // 여기서 그룹을 생성한다.
console.error('console.error in level-1 group')
console.log('console.log in level-1 group')

console.group('level-2') // 그룹을 중첩한다.
console.error('console.error in level-2 group')
console.log('console.log in level-2 group')
console.groupEnd() // level-2 그룹을 빠져나온다.

console.groupEnd() // level-1 그룹을 빠져나온다

console.log('Outer Console Group End')
```

![js-console-object-example-3](/images/js-console-object-example-3.png)

이렇게 계층적으로 그룹을 만든다. 현재 이 코드를 그대로 실행하면 모두 펼쳐있는 상태로 출력이 되는데, `console.groupCollapsed`를 사용하게 되면 모두 접혀있는 상태로 출력이 된다. 이 후의 사용법은 `console.group`과 동일하다.

## console.info / console.log

많이 사용해왔던 함수들 두개. `info` 함수는 어떤 정보를 담는 메세지를 출력하고, `log`는 일반 메세지를 출력하는 용도로 쓰인다. 두 함수 모두 첫번째 매개변수의 문자열을 치환할 수 있는 매개변수를 넣을 수 있고, 다양한 데이터를 받을 수 있다.

## console.table

테이블 형태의 데이터를 출력해준다. 매개변수로 오는 데이터는 열거 가능한 객체 혹은 배열이어야 한다.

```js
// 배열 사용
console.table(['a', 'b', 'c', 'd'])

/**
 * ┌─────────┬────────┐
 * │ (index) │ Values │
 * ├─────────┼────────┤
 * │    0    │  'a'   │
 * │    1    │  'b'   │
 * │    2    │  'c'   │
 * │    3    │  'd'   │
 * └─────────┴────────┘
 **/
```

이렇게 예쁜 표를 생성해준다. 매개변수로 오는 데이터의 타입에 따라 표를 그려주는 형식이 달라진다.

```js
// 객체 사용
console.table({
  age: 24,
  name: 'n2ptune',
  phoneNumber: '010-0000-0000'
})

/**
 * ┌─────────────┬─────────────────┐
 * │   (index)   │     Values      │
 * ├─────────────┼─────────────────┤
 * │     age     │       24        │
 * │    name     │    'n2ptune'    │
 * │ phoneNumber │ '010-0000-0000' │
 * └─────────────┴─────────────────┘
 **/
```

위와 같이 열거 가능한 객체를 주게되면 키:값 쌍으로 예쁘게 출력해준다.

```js
// 이중 배열 사용
console.table([
  ['a', 'b'],
  ['c', 'd', 'E'],
  ['e', 'f']
])

/**
 * ┌─────────┬─────┬─────┐
 * │ (index) │  0  │  1  │
 * ├─────────┼─────┼─────┤
 * │    0    │ 'a' │ 'b' │
 * │    1    │ 'c' │ 'd' │
 * │    2    │ 'e' │ 'f' │
 * └─────────┴─────┴─────┘
 **/
```

이중 배열을 넣으면 각 배열은 행에 채워지고 각 원소들은 열에 채워진다. 고로 행의 최대 길이는 모든 배열들의 원소 최대길이가 된다.

```js
// 배열 객체 사용
console.table([
  {
    name: 'Lee',
    age: 23,
    phoneNumber: '010-0000-0000'
  },
  {
    name: 'Kim',
    age: 22,
    phoneNumber: '010-0000-000'
  }
])

/**
 * ┌─────────┬───────┬─────┬─────────────────┐
 * │ (index) │ name  │ age │   phoneNumber   │
 * ├─────────┼───────┼─────┼─────────────────┤
 * │    0    │ 'Lee' │ 23  │ '010-0000-0000' │
 * │    1    │ 'Kim' │ 22  │ '010-0000-000'  │
 * └─────────┴───────┴─────┴─────────────────┘
 **/
```

배열에 속성이 열거가능한 객체를 넣게 되면 더 깔끔하게 객체를 정리할 수 있다.

- [브라우저 호환성](https://developer.mozilla.org/ko/docs/Web/API/Console/table#Browser_compatibility)

## console.time / console.timeEnd

어떤 작업이 몇 초(분,시) 정도 소요됬는지 출력해주는 함수다. 작업이 시작되는 부분에 `time` 함수를 설정하고 작업이 끝날 부분에 `timeEnd`를 사용해서 해당 함수를 종료시켜주면 된다.

매개변수로 해당 함수를 식별할 이름을 지정해주고 이 매개변수는 필수적이며, **10000**개 정도 지정할 수 있다. `timeEnd` 함수도 마찬가지로 `time` 함수로 지정했던 이름으로 종료시켜주면 된다.

```js
function somethingWork() {
  console.time('somethingWork')

  // 어떤 작업이 실행될 부분이라 가정하고
  // 이 작업은 1500ms 후에 실행됨
  setTimeout(function () {
    console.timeEnd('somethingWork')
  }, 1500)
}

somethingWork()

// somethingWork: 1500.63818359375ms
```

`somethingWork` 함수는 어떤 작업을 실행해주는 함수. 식별자 이름을 지정하고 1500ms 후에 이 작업을 실행한 뒤 해당 식별자로 된 `time` 함수를 종료하고 작업에 소요된 시간을 반환.

이렇게 하면 어떤 작업이 얼마나 소요되었는지 알 수 있어 매우 유용한 함수이다.

```js
function getSomeData() {
  console.time('timeOfSomeData')

  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(function (res) {
      console.timeEnd('timeOfSomeData')
    })
    .catch(function (err) {
      console.error(err)
    })
}

getSomeData()

// timeOfSomeData: 131.18994140625ms
```

`getSomeData`는 `fetch`를 사용해 어떤 데이터를 가져오기 전에 `time` 함수로 `timeOfSomeData`라는 식별자로 타이머를 지정시키고 응답이 오면 해당 타이머를 종료시킨다.

그래서 걸리는 시간이 131ms.

nodejs 환경에서 테스트하려면 `fetch` 대신 `node-fetch` 혹은 `axios`를 이용하면 된다. 내장 모듈인 `request`를 사용해도 된다.

## console.warn

info, error 혹은 log 함수와 모두 동일한 함수. 문자열이 치환될 수 있다. 크롬 개발자 도구로 해당 함수를 사용하면 노란색 배경의 띠로 출력된다.

## 참고

- [https://developer.mozilla.org/ko/docs/Web/API/Console](https://developer.mozilla.org/ko/docs/Web/API/Console)
- [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)
