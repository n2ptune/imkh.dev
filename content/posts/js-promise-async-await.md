---
description: 비동기 작업을 유연하게 다루기 위해 Promise를 사용하는 방법과 Promise가 나온 배경, Promise에 대한 문제점, 이를 해결하기 위한 방안 등을 정리
cover_image: ./images/js-promise-async-await.jpg
tags: ['javascript', 'es6']
published: true
date: 2020-03-21
title: 자바스크립트 프로미스 정리 (js-promise)
---

## 비동기 / 동기

비동기(Asynchronous)는 쉽게 말하면 어떤 한 작업에 대해서 기다리지 않겠다는 의미다. 비동기적인 작업을 다른 일하는 프로세스에게 넘기고 나는 내 할일을 하다가 프로세스에게서 이 작업이 끝났다는 응답을 받는 것이다.

동기(Synchronous)는 비동기를 반대로 이해하면 쉽다. 일을 시키면 일이 끝날때까지 기다린다는 의미이다.

예를 들자면, 나는 카페를 운영하는 카페 사장이고 직원은 총 5명이다. 매장의 청결 유지를 위해 직원들에게 각각 일을 시킨다. 그 후 작업이 끝나면 나에게 알려달라고 말한 뒤에 나는 매출 전표를 정리한다. 그 뒤 5명의 직원들에게 모두 일이 끝났다는 통보를 받았고 그리고 그 다음 작업을 시킨다. 이런 경우 **비동기적**이라고 말할 수 있다.

만약 내가 직원 한명 한명 다가가서 어떤 일을 시키고 그 일을 시킬 때까지 기다린다. 그리고 그 일이 끝나면 다음 직원에게 가서 일을 시키고 기다린다. 이 경우가 **동기적**이다.

## Promise 등장 배경

자바스크립트에서는 지금 당장 실행할 수 없는 명령은 **비동기적**으로 작동한다. 어떤 작업을 끝마치고 반환받은 값으로 어떤 함수를 실행해야 되는 상황에 놓였다면 '콜백'이라는 패턴을 이용해서 그 함수를 실행할 수 있다.

```js
/**
 * @callback responseCallback
 * @param {number} a
 * @param {number} b
 * @param {responseCallback} callback
 */

function doSomething(a, b, callback) {
  setTimeout(function () {
    let sum = a + b
    callback(sum) // Execute callback
  }, 500)
}

doSomething(1, 2, function (sum) {
  console.log(sum)
})
```

`doSomething` 함수는 매개변수로 받은 두 값을 더하고 콜백을 실행해주는 함수다. 예제에서는 지금 당장 실행할 수 없는 함수를 만들기 위해서 `setTimeout` 함수를 이용했고, 사실 네트워크 요청이라든지 지금 당장 작업을 실행할 수 없는 상황이 존재한다.

호출은 간단하게 콜백함수가 들어갈 자리에 실행 될 함수를 구현한다. 그럼 정확히 500ms가 지나면 매개변수로 넘긴 콜백함수가 실행되고 매개변수로 받은 `sum`을 출력한다.

과거의 자바스크립트에서 어떤 작업이 끝난 후의 작업은 이렇듯 콜백 패턴으로 구현된 코드가 많았다. 이런 콜백 패턴은 다음과 같은 문제를 야기시킨다.

- 여러 콜백이 중첩될 경우 코드가 복잡해짐.
- 여러 개의 작업 중 에러 발생시 오류 처리에 대한 문제
- 이런 작업들이 많아지면 관리하기 힘들다.

## 비동기 예제

자바스크립트에서 비동기를 테스트 해보기에 아주 좋은 함수가 있다. `setTimeout` 함수다. 이 함수는 특정 시간 이후에 매개변수로 들어온 함수를 실행해주는 함수다.

```js
for (let i of Array(10).keys()) console.log(i)
console.log('end')

// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// end
```

위의 코드는 0부터 10개의 숫자를 출력하고 마지막에 'end'를 출력한다. 모두가 예상하듯 이 코드에는 비동기적인 작업이 없다. 10번의 루프를 돌고 해당 숫자를 출력하고 마지막 라인의 코드를 실행해서 'end'를 출력하게 된다.

하지만 여기에 `setTimeout` 함수를 넣게되면 결과가 조금 달라지게 된다.

```js
for (let i of Array(10).keys()) {
  setTimeout(function () {
    console.log(i)
  }, 150)
}
console.log('end')

// end
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
```

'end' 문자열이 먼저 출력되고 그 다음 숫자들이 출력된다. `setTimeout`으로 전달된 매개변수는 지금 당장 실행하면 안되는 함수이기 때문에 실행을 미루고 그 다음 출력을 먼저 하고 숫자들이 출력되는 걸 볼 수 있다.

파이썬의 경우 `time` 라이브러리를 이용해서 비슷한 결과를 내는 코드를 작성할 수 있다.

```python
import time

for i in range(0, 10):
  time.sleep(0.1)
  print(i)

print('done')

# 0
# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
# done
```

`time.sleep` 함수는 프로세스를 잠시 정지시키는 것이기 때문에 자바스크립트에서의 비동기 작업과는 약간 다를 수가 있겠다.

## Promise

이런 콜백의 문제점을 해결하기 위해 ES6가 세상에 나오기 전에는 많은 라이브러리들이 있었다. 이 라이브러리들은 콜백 함수의 문제를 어느 정도 해결해준다. (전부 해결할 수 있는 문제는 아니였다) Promise 디자인 패턴이 정말 유용하고 콜백 함수의 문제를 해결해줄 수 있기 때문에 ES6부터 언어 레벨에서 지원하기로 했다.

Promise를 사용하기 위해서는 Promise 인터페이스를 따라 함수를 구현해야 한다.

```js
function doSomething(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(a + b)
    }, 500)
  })
}

doSomething(1, 2)
  .then(sum => console.log(sum))
  .catch(err => console.error(err))
```

`doSomething` 함수는 Promise 객체를 반환하도록 바뀌었다. 이 Promise 객체는 생성될 때 두 개의 매개변수를 갖는다. `resolve` 함수는 비동기 작업이 완료되었을 때 호출할 함수고, `reject` 함수는 비동기 작업이 어떤 이유로든지간에 실패했을 경우 호출될 함수다.

그리고 함수 실행부다. 이 함수는 2개의 매개변수를 갖고 해당 매개변수를 더해주는 함수이니 두 개의 정수를 넣는다. 그리고 `then` 함수다. 이 함수는 비동기 작업이 완료되었을 때 `resolve` 함수로 인해 매개변수에 있는 함수를 호출시킨다. `resolve` 함수의 매개변수에 a와 b를 더한 값을 주었으니 `then` 함수에서 이 값을 받는다. 그리고 출력한다.

`catch` 함수는 에러가 있을 경우 `reject` 함수가 실행되는데, 이 부분에 에러 처리를 하기 위해 필요할 수도 있다.

`then` 함수, `catch` 함수는 새 Promise 객체를 반환하기 때문에 위와 같이 연결시킬 수 있다.

## Promise 상태

Promise는 3개의 상태를 갖는다. 아직 실행되기 전 상태인 **대기(pending)**상태, 비동기 작업이 완료되었을 때의 상태인 **이행(fulfilled)**상태, 비동기 작업이 실패한 상태인 **거부(rejected)**상태가 있다.

이 Promise가 처리 되었다고 말하는 **처리(settled)**상태도 있다고 하는데 정확하지 않다.

## Promise 함수

Promise를 좀 더 유용하게 사용할 수 있게 제공하는 함수가 몇 개 있다.

- `Promise.all`
- `Promise.race`

`Promise.all` 함수는 매개변수로 오는 반복 가능한 객체에 대해 모든 Promise를 실행한다. 하나라도 Promise가 거부된다면 `reject` 시킨다. 모든 매개변수에 대해 Promise 실행이 끝났다면 데이터를 배열로 한데모아 반환한다.

## async/await

서버에서 `JSON`을 가져온다고 가정하자. 많은 HTTP 요청 라이브러리에서 Promise를 구현하고 있기 때문에 `then` 함수나 `catch` 함수를 손쉽게 사용할 수 있다.

```js
const axios = require('axios')
const url = 'https://api.myjson.com/bins/11i1x0'

axios
  .get(url)
  .then(result => console.log(result.data))
  .catch(err => console.error(err))

// { status: true, data: [ { id: 0, name: 'Leon' } ] }
```

`axios` 라이브러리는 결과 값을 결과 객체의 `data` 속성에 붙여넣어 주고 다양한 메타데이터들을 보기 쉽게 가져와준다.

Promise Chain을 이용하지 않고 더 직관적으로 손쉽게 이용할 수 있다.

```js
const axios = require('axios')
const url = 'https://api.myjson.com/bins/11i1x0'

;(async function () {
  const { data } = await axios.get(url)
  console.log(data)
})()

// { status: true, data: [ { id: 0, name: 'Leon' } ] }
```

`async` 키워드로 감싸진 함수는 암묵적으로 Promise를 반환하고 `await` 키워드 옆에 붙는 구문이 처리될 때까지 기다렸다가 다음 명령을 실행한다.

## 참고

- [https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Async_await](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Async_await)
- [http://myjson.com/11i1x0](http://myjson.com/11i1x0)
- [https://devrepository.tistory.com/13](https://devrepository.tistory.com/13)
- [https://hyunseob.github.io/2015/08/09/async-javascript/](https://hyunseob.github.io/2015/08/09/async-javascript/)
- [https://devpouch.tistory.com/35](https://devpouch.tistory.com/35)
- [https://joshua1988.github.io/web-development/javascript/js-async-await/](https://joshua1988.github.io/web-development/javascript/js-async-await/)
