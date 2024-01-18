---
title: JSDoc 알고 사용하기
date: 2024-01-18 18:00:00
published: true
tags: ['javascript']
cover_image:
description: JSDoc에 대해서 학습하고 정리
---

## JSDoc 이란

[JSDoc](https://jsdoc.app/) 공식 사이트에서는 자신을 자바스크립트 전용 API 문서 생성기라고 소개하고 있는데, JSDoc을 사용하는 입장에서 보면 자바스크립트의 객체를 사람의 언어로 묘사할 수 있는 어떠한 도구로 생각되어진다. 일반적인 주석을 다는 것 처럼, 객체나 함수에 대한 묘사를 작성하거나, 다른 사람이 보았을 때 주의해야되는 점 이라든지, 사람의 언어로 객체나 함수를 **설명**할 수 있다. 일반적인 주석을 다는 것과 다른 것은, 마크다운 문법을 사용해 코드 블록을 제공한다거나, 코드와 코드 사이를 이동할 수 있도록 링크로 연결한다거나, 특정 객체의 타입에 대한 힌트를 제공할 수 있다거나, 여러모로 편리한 기능들을 제공하기 때문에 잘 사용하면 타입스크립트를 사용하지 않고도 여러 타입 힌트를 누릴 수 있는 장점이 존재한다.

여기서는 JSDoc을 사용하는 방법에 대해서 학습하고 정리한다.

## 사용 방법

개체 혹은 JSDoc 으로 설명하고자 하는 문장 전에 멀티 라인 주석을 위한 `/** ... */` 주석 구문을 사용한다.  (멀티 라인 주석은 기본적으로 `/* ... */` 이지만, 해당 형식으로 작성시 JSDoc 은 무시된다. 따라서 `/** ... */` 로 사용해야 한다.) 예를 들면 아래 코드 블록처럼 사용할 수 있다.

```js
/**
 * 이미지 업로드에 대한 작업을 관측할 수 있는 객체로 반환하는 함수
 */
export function getUploadImageTask(image) {
  ...
}
```

위처럼 작성하고, 함수에 마우스를 올려보면 함수에 대한 설명과 함께 툴팁이 뜨는데,

![jsdoc-sample-image](/images/jsdoc-sample-1.png)

이미지처럼 내가 작성한 내용이 도움말로 제공된다. 싱글 라인 주석 구문도 위와 동일하게 텍스트가 표현되는데, 앞서 서술했듯이 JSDoc 의 다양한 기능을 사용하려면 멀티 라인 주석 구문을 사용해야 정상 작동한다.

## 기능의 종류

### 타입 지정

객체나 함수에 타입을 지정할 수 있다.

```js
/**
 * @type {string}
 */
let a = '1'

/**
 * @type {() => number}
 */
const b = () => {
  return 123
}

/**
 * @type {Record<string, number>} obj
 */
let obj = {
  a: 1,
  b: 2,
  c: 3
}
```

타입스크립트의 유틸리티 타입도 사용할 수 있고, 타입스크립트에서 타입을 선언하는 것처럼 사용할 수 있다. 다만 자바스크립트 생성자 형식으로 지정하는 방식에 대해서도 정상적으로 동작을 하는 것처럼 보이는데, 이는 지양해야되는 걸로 생각된다. 생성자 그 자체로는 타입이 아니며 타입스크립트에서는 원시 타입의 경우 소문자로 시작한다. [공식 홈페이지](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#%EC%9B%90%EC%8B%9C-%ED%83%80%EC%9E%85--string-number-%EA%B7%B8%EB%A6%AC%EA%B3%A0-boolean)에서도 생성자를 타입으로 지정하는 것은 유효한 타입이긴 하지만, 항상 타입스크립트 원시 타입(소문자)을 사용하라고 안내하고 있다.

### 타입 선언

`@typedef` 을 사용해서 타입 선언이 가능하다. 타입스크립트에서 타입에 대한 선언을 하는 것 처럼 파일에 적어두고 다른 변수에 타입을 지정하는 등의 행위가 가능하다.

```js
/**
 * @typedef {() => Promise<string>} FnPromise
 * @typedef {import('dependency').Action} MyAction
 */

/**
 * @type {MyAction}
 */
const action = { ... }
```

눈 여겨 볼만한 점은, 외부 라이브러리를 `import` 해서 타입 정보를 가져올 수도 있다는 점이다. 외부 라이브러리뿐만 아니라, 다른 파일에 있는 정보도 가져올 수 있다. 다른 파일에 `@typedef` 로 선언된 타입이 있을 경우 `import` 로 사용이 가능하단 말이다. 타입에 대한 힌트만 제공하는 것이기 때문에 실제 메모리 영역에 할당되는 함수 자체를 직접 가져올 순 없다.

### 매개변수 타입

`@param` 으로 함수의 매개변수에 대해 타입 힌트를 제공할 수 있다.

```js
/**
 * @param {object} userAdf
 * @param {string} userAdf.name
 * @param {number} userAdf.id
 * @param {string[]} userAdf.nickname
 * @param {string[]} userAdf.friends
 *
 * @param {object} userAdb
 * @param {string} userAdb.rdb
 * @param {number} userAdb.uuid
 */
const handleAction = (userAdf, userAdb) => {}
```

위 예제는 `userAdf` 와 `userAdb` 가 모두 `object` 타입인 경우로 예를 들었는데, 원시 타입인 경우 한 줄로 끝날 수 있고, 객체인 상황에도 객체 리터럴 혹은 `@typedef` 로 지정된 타입으로 한 줄에 정리할 수 있지만 이런식으로 객체 하위 키에 대한 타입도 `@param` 으로 지정할 수 있어 이렇게 정리한다.

### 객체 타입

`@property` 는 객체 하위의 타입을 지정한다.

```js
/**
 * @typedef {object} WebpackConfig
 * @property {object} webpack
 * @property {'s3' | 'u2' | 'm5'} webpack.buildTarget
 * @property {number} webpack.buildNumber
 */

/**
 * @type {WebpackConfig}
 */
const config = {
  webpack: {
    buildNumber: 2,
    buildTarget: 'u2'
  }
}
```

`config` 객체 작성시 타입 힌트 제공에 대한 이점을 얻을 수 있다. 객체 하위/상위 구분은 `.` 구분자로 한다.

## 제네릭

`@template` 을 이용해서 타입스크립트 제네릭 관련 기능을 사용할 수 있다.

```js
/**
 * @template T
 * @param {T} findSymbol
 * @returns {T}
 */
function getUser(findSymbol) {
  return findSymbol
}

const s = getUser('123') // string or '123'
const n = getUser(1) // number
```

타입스크립트로 매개변수를 제네릭 변수로 지정한 것처럼 타입이 추론될 수 있게끔 제네릭을 사용할 수 있다.

## 생성자

`@constructor` 를 이용해서 생성자에 대한 타입스크립트 지원을 받을 수 있다.

```js
/**
 * @constructor
 * @param {string} name
 */
function User(name) {
  this.name = name
  this.id = Math.random()
}

const user = new User('John')
user.name // string
user.id // number (프로퍼티 타입은 추론될 수 있다.)

const user2 = User('Kim') // error 지원
```

위 코드에서 `User` 는 `@constructor` 로 지정했고, 매개변수로 받는 `name` 에 대해서도 `@param` 을 이용해 `string` 타입임을 명시했다. 생성자로 생성된 인스턴스에 대해 타입 추론에 대한 지원을 받을 수 있다. `user2` 의 경우 `new` 연산자를 제외하고 호출했는데, `@constructor` 가 없다면 에디터에 상관없이 경고 문구가 뜨지 않는다. VSCode 기준 해당 라인은 에러가 뜨며, `new` 와 같이 사용할 것을 제안해준다.

## 상속과 제네릭

순수 자바스크립트 환경에서 제네릭 기반 클래스를 상속하는 경우 제네릭에 대한 정보를 알 수 있는 방법이 없다. 따라서 `@template` 와 `@extends` 를 적절히 사용하여 상속한 클래스의 제네릭에 대한 정보를 제공한다.

```js
/**
 * @template T
 * @extends {Array<T>}
 */
class LinkedArray extends Array {
  /**
   * @type {T[]}
   */
  name = []

  /**
   * @param {T[]} name
   */
  constructor(name) {
    super()
    this.name = name
  }
}
```

`LinkedArray` 클래스의 필드 `name` 은 `T[]` 로 추론된다. `@extends` 는 제네릭 기반 클래스의 제네릭 정보를 제공하기 위해 사용된다.

## Enum

`@enum` 을 이용해 enum을 사용하는 것에 대한 명시를 할 수 있다.

```js
/**
 * @enum {number}
 */
const UserPosition = {
  Teacher: 0,
  Student: 1,
  Manager: 2
}

UserPosition.Teacher // number
```

따로 큰 기능을 제공하거나 하지는 않는 것 같다.