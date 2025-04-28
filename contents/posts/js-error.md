---
description: 자바스크립트에서 에러란 어떤 것이고 기본 내장되어 있는 에러 객체 외에 에러 객체를 커스텀해서 특별한 에러 객체를 만들고 에러 객체의 특성에 대해서 알아본다.
cover_image:
tags: ['javascript', 'nodejs']
published: true
date: 2020-05-08
title: 자바스크립트의 에러와 처리 방법에 대해서 알아보기
---

## Error

최근 취업 준비를 위해 포트폴리오를 작성하고 있다. 그 포트폴리오에 들어갈 만한 프로젝트를 진행하던 도중 서버와 클라이언트가 통신하는 과정에서 오류에 대한 처리를 할 때 오류에 대한 지식이 별로 없다보니 처리가 힘들었다. 에러란 뭔지 어떻게 처리해야 하는지 등에 대해서 정리해본다.

### 정의

런타임 시에 발생하는 오류에 대한 객체다. 런타임시에 발생하는 오류에 대해 적절하게 예외 처리를 하고 핸들링 할 수 있어야 우리가 작성한 애플리케이션이 정상적으로 동작할 수 있다. 에러 객체는 사람이 읽을 수 있는 에러에 대한 설명과 어떤 부분에 오류가 났는지에 대한 설명, 에러 객체 자신에 대한 이름 등을 담고 있다.

### 사용

주로 최신 스펙으로 만들어진 자바스크립트 엔진에서는 `async/await`를 사용하는 함수 내에서 `try...catch`와 주로 쓰인다.

```js
async function something(someValue) {
  try {
    const { data } = await axios.get('/api/list/' + someValue)
  } catch (error) {
    throw new Error(error)
  }
}
something(1)
```

`axios`라는 라이브러리를 사용해 서버와 통신한다. 오류가 발생할 경우 `throw` 구문을 사용해 예외 값을 이 함수를 호출한 곳으로 던진다. 이렇듯 일반적인 상황에서 이렇게 사용할 수 있다. 서버에서 받은 값을 기반으로 특정한 에러를 던지거나 해야할 때는 아래와 같이 사용할 수 있다.

```js
async function something(someValue) {
  try {
    const { data } = await axios.get('/api/list/' + someValue)

    if (data.isMistake) {
      throw new Error('something wrong')
    }
  } catch (error) {
    errorHandling(error)
  }
}
something(1)
```

에러 객체는 자신의 이름과 사람이 읽을 수 있는 에러에 대한 설명을 담고 있는 메세지 프로퍼티로 구성되어 있는데 각각 에러 객체의 `name`과 `message` 속성에 접근해 얻을 수 있다.

## Custom Error Object

### 자바스크립트 내장 에러 객체 유형

일반적인 Error 객체 외에 자바스크립트에서 미리 만들어진 에러 객체가 몇 개 존재한다. 그 중에서 몇 가지는 매우 많이 봐왔던 에러다.

- EvalError
- InternalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

기본적으로 존재하는 Error 객체를 포함해 총 8개의 에러 객체가 있다. 이 중 **ReferenceError**와 **TypeError**는 수도 세지 못할 만큼 본 것 같다.

그렇다면, 나만의 커스텀 에러 객체를 만들 수 없을까? 당연히 만들 수 있다! ES6 이후 스펙의 자바스크립트 코드를 이용하면 매우 쉽게 이용할 수 있지만 최신 스펙을 사용할 수 없는 환경도 존재하기 때문에 각각 따로 나눠 사용해본다.

### Make custom Error object before ES6

ES6 이전의 자바스크립트에서 커스텀 에러 객체를 만든다.

```js
function CustomError(message) {
  this.message = message
  // 이 부분은 new Error().stack 과 동일하다.
  this.stack = Error().stack
}

CustomError.prototype = Object.create(Error.prototype)
CustomError.prototype.name = 'CustomError'

// throw 구문은 모든 브라우저에서 사용할 수 있는 구문이다.
throw new CustomError('Emit CustomError')
```

커스텀 에러 객체를 만들어내는 생성자 함수를 만들어서 프로토타입을 조작해주면 자신만의 에러 객체를 만들 수 있다. 이 말은 기본적으로 자바스크립트에서 제공하는 에러 객체를 확장시킬 수 있고 다채로운 에러 처리를 할 수 있게 된다는 말이다.

### Make custom Error object after ES6

ES6 이후에는 Error 객체를 상속받는 클래스를 지정해서 보다 간결하고 쉽게 만들 수 있다.

```js
class CustomError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CustomError'
  }

  toString() {
    return this.name + ': ' + this.message
  }
}

throw new CustomError('Emit CustomError')
```

위의 ES6 이전의 코드에 비해 매우 간결해졌다. 메소드를 오버라이딩해서 다르게 보이게 할 수도 있고 좀 더 다양한 처리가 가능해졌다. 그리고 이러한 것도 가능하다.

```js
class CustomError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CustomError'
  }

  toString() {
    return this.name + ': ' + this.message
  }
}

class MyError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MyError'
  }

  toString() {
    return this.name + ': ' + this.message
  }
}

function start() {
  throw new MyError('1')
  // throw new CustomError('2')
}

try {
  start()
} catch (e) {
  if (e instanceof MyError) {
    console.log('catch MyError')
  } else if (e instanceof CustomError) {
    console.log('catch CustomError')
  }
}
```

서로 다른 에러 객체 두 개와 무조건 에러를 던지는 함수 하나를 만들어 `try...catch` 블록에서 던져지는 에러의 타입을 비교해서 다양한 처리를 할 수 있다. (start 함수에 주석을 하나씩 넣고 제거해서 테스트 하기)

## 참고

- [https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript](https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript)
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Error](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#%EC%98%88%EC%99%B8%EC%B2%98%EB%A6%AC%EB%AC%B8](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#%EC%98%88%EC%99%B8%EC%B2%98%EB%A6%AC%EB%AC%B8)
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/throw](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/throw)
