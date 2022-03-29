---
description: Function.prototype.call 함수에 대해서 어디에 쓰일지와 기능에 대해서 알아보고 사용해보기
cover_image: ./images/js-function-prototype-call.png
tags: ['javascript']
published: true
date: 2020-03-12
title: Function.prototype.call가 뭐죠?
---

## 기본 사용

`Function.prototype.call`은 모든 함수에서 사용할 수 있다. 첫번째 매개변수는 `call` 함수가 실행하는 함수에 컨텍스트로 전달한다. 예를 들어, `TwoNumber`라는 함수가 있고, 이 함수안의 `sum`과 `mul` 함수는 생성자를 통해 받은 매개변수 두개의 값을 더하거나 곱해서 반환하는 함수다.

```js
function TwoNumber(a, b) {
  this.a = a
  this.b = b

  this.sum = function () {
    return this.a + this.b
  }

  this.mul = function () {
    return this.a * this.b
  }
}

const n = new TwoNumber(1, 2)

const sum = n.sum()
const mul = n.mul()

console.log(sum, mul)

// output: 3 2
```

두 개의 매개변수를 받아서 각각 변수 a와 b에 저장하고 `sum`과 `mul`은 해당 객체가 가지고 있는 a와 b를 더하거나 곱해서 값을 반환하는 간단한 함수다. `call` 함수를 사용하면 `call` 함수가 호출하는 객체에 재할당한다.

```js
const _d = n.sum.call({ a: 3, b: 5 })
const _e = n.mul.call({ a: 3, b: 5 })

console.log(_d, _e)

console.log(n.sum(), n.mul())

// output: 8 15
//         3 2
```

기존 출력 값이 3 2이고 `call` 함수를 이용해서 재할당한 객체의 출력 값은 8 15이다. 기존 객체는 유지가 된다는 걸 알 수 있다.

## 클래스 흉내

```js
/** @param {string} name */
/** @param {number} age */
function Animal(name, age) {
  this.name = name
  this.age = age
}

function Dog(name, age) {
  Animal.call(this, name, age)
  this.bark = function () {
    console.log(`${this.name}: wal! wal!`)
  }
}

function Bird(name, age) {
  Animal.call(this, name, age)
  this.bark = function () {
    console.log(`${this.name}: Jak! Jak!`)
  }
}

const dog = new Dog('James', 2)
const bird = new Bird('Ari', 1)

dog.bark()
bird.bark()

// output: James: wal! wal!
//          Ari: Jak! Jak!
```

이름과 나이 값을 매개변수로 받고 해당 객체에 바인딩 시키는 함수 `Animal`과 이 함수와 관련된 `Dog`, `Bird` 함수가 있다. 각각의 함수는 `Animal` 함수와 마찬가지로 이름과 나이를 매개변수로 받고 `Animal`을 호출한다. 여기서, `this` 값으로 `Animal`을 호출하고 입력받은 이름과 나이를 같이 넘긴다.

해당 객체로 재할당 시킨다. `bark` 함수는 각각 '이름: wal! wal!', '이름: Jak! Jak!'을 출력한다. 이렇듯 타 언어에서 클래스를 사용해서 만들 수 있는 기능은 자바스크립트에서는 이런 방식으로 흉내낼 수 있다. (ES6 부터는 타 언어에서 사용하던 것 처럼 class로 작성하고 super()나 constructor()를 사용하면 된다)

마치 `Animal` 클래스를 상속받은 `Dog`, `Bird` 클래스를 구현한 것과 같은 흉내를 낼 수 있다.

## 객체의 타입 알아내기

`Object.prototype.toString` 함수는 객체 내의 `this` 값을 보고 객체 타입을 문자열로 반환한다. `call` 함수를 응용하면 `this` 값을 매개변수로 오는 값으로 바꿔 타입 값을 확인할 수 있다.

```js
console.log(Object.prototype.toString.call(undefined))
console.log(Object.prototype.toString.call(null))
console.log(Object.prototype.toString.call(true))
console.log(Object.prototype.toString.call([]))
console.log(Object.prototype.toString.call(function () {}))
console.log(Object.prototype.toString.call(new Date()))
console.log(Object.prototype.toString.call(/^abc+d/))
console.log(Object.prototype.toString.call(23455))
console.log(Object.prototype.toString.call(1.234))
console.log(Object.prototype.toString.call(-0.2))
console.log(Object.prototype.toString.call('undefined'))
console.log(Object.prototype.toString.call(new Error('error')))

// output:  [object Undefined]
//          [object Null]
//          [object Boolean]
//          [object Array]
//          [object Function]
//          [object Date]
//          [object RegExp]
//          [object Number]
//          [object Number]
//          [object Number]
//          [object String]
```

## 참고

- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
