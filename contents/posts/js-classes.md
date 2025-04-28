---
title: 자바스크립트 프로토타입, 클래스에 대한 개념 이해
date: 2020-08-07 04:29:26
published: true
tags: ['javascript']
cover_image:
description: 생성자 함수를 통해 객체를 생성하고 프로토타입을 이용해서 객체와 객체 간의 상속을 구현해본 다음 ES6 이후 문법인 클래스를 이용해 생성자 함수와 프로토타입 방식과 비교해보기
---

이 글은 ['ECMAScript 6 길들이기'](http://www.yes24.com/Product/Goods/23904865) 서적을 읽고 정리한 글이며 모든 내용은 이 책을 통해 참고해서 내용을 정리하고 주관적인 의견을 넣었습니다.

## 상속

객체지향 프로그래밍 언어에는 **상속**이라는 개념이 있다. 일반적으로 생각할 수 있는 **상속**의 뜻은 부모로부터 재산 등을 물려받는 것을 의미한다. 프로그래밍 언어에서도 마찬가지로 부모 객체는 자식 객체에게 자신의 모든 것을 물려줄 수 있다. 때로는 자식 객체가 물려 받은 재산을 통해 부모와는 다른 행동을 할 수 있다.

예를 들어, 부모 객체에 A라는 메소드가 있고 이 메소드를 자식에게 물려주었다고 한다면 자식은 A 메소드를 조금 변형시켜 부모에게 물려 받은 A 메소드와는 달리 다른 행동을 취할 수 있다는 얘기이다. (오버라이딩)

자바스크립트는 프로토타입을 이용해서 객체지향 프로그래밍의 개념인 **상속**을 비슷하게 구현할 수 있다. 하지만 ECMAScript 6가 발표되고 난 후 `class` 문법이 추가되었기 때문에 이 문법이 추가되기 전보다 훨씬 더 쉽게 **상속** 외 타 언어에서 사용했던 것 처럼 **클래스**라는 개념을 사용할 수 있게 되었다.

## 프로토타입을 이용한 상속 구현

### 객체 생성 방법

자바스크립트에서 객체를 생성할 수 있는 방법은 2가지가 있다. 하나는 **객체 리터럴**을 이용한 방법과 **생성자를 통해 생성**하는 방법이 있다. 보통 **정적**인 객체를 생성할 때에는 객체 리터럴을 사용하고 동적으로 객체를 생성해야 할 필요가 있다면 생성자를 사용해 객체를 생성한다.

```js
// 객체 리터럴을 사용해서 정적인 객체를 만듬
const dog = {
  name: 'dodo',
  age: 3
}
```

위와 같이 리터럴을 이용해서 객체를 하나 만들었다. 다만 런타임시 유저의 입력에 따라 유동적인 갯수의 객체를 만들어야 된다면 객체를 생성자로 만들어 갯수대로 객체를 찍어낼 수 있다.

```js
function Dog(age, name) {
  this.age = age
  this.name = name
}

Dog.prototype.cry = function () {
  console.log(this.name + ' : wal! wal!')
}

const lucy = new Dog(3, 'Lucy')
const abel = new Dog(2, 'Abel')

lucy.cry()
abel.cry()

// Lucy : wal! wal!
// Abel : wal! wal!
```

생성자로 객체를 만들었고, 프로토타입 프로퍼티에 `cry` 메소드를 한 개 추가했다.

```js
console.log(lucy.__proto__ === Dog.prototype)
console.log(lucy.__proto__.constructor === Dog)
```

만들어진 객체의 프로토타입은 생성자의 프로토타입과 동일하다.

### 프로토타입을 이용한 상속

프로토타입을 이용해서 `Doberman` 이라는 `Dog`를 상속 받는 객체를 하나 만들어보자.

```js
function Dog(age, name) {
  this.age = age
  this.name = name
}

Dog.prototype.cry = function () {
  console.log(this.name + ' : wal! wal!')
}

function Doberman(age, name, weight) {
  this.weight = weight

  // or Dog.call(this, age, name)
  Dog.apply(this, [age, name])
}

Doberman.prototype = new Dog()
Doberman.prototype.cry = function () {
  console.log(`${this.name}(${this.weight}) : wal~!!!!!! wal~!@!!!!`)
}

const muse = new Doberman(4, 'Muse', 20)

muse.cry()

// Muse(20) : wal~!!!!!! wal~!@!!!!
```

`Doberman`의 프로토타입을 `Dog`로 지정하고 `Dog`에서 받는 인자 외에 `weight` 프로퍼티는 자신의 인스턴스에 할당하고, 부모 객체 격인 `Dog`의 생성자를 `apply` 메소드를 생성자 호출에 필요한 인자들과 함께 호출한다. `Doberman` 생성자로 만들어진 객체가 생성되었으며 `cry` 메소드를 따로 오버라이딩 하지 않아도 프로토타입이 `Dog`이기 때문에 `Dog`의 메소드를 사용할 수 있다.

### 메소드를 this에 넣지 않는 이유

프로토타입에 프로퍼티를 추가해서 메소드를 넣지 않고도 생성자 인스턴스가 생성될 때 메소드도 집어 넣을 수 있다.

```js
function Dog(age, name) {
  this.age = age
  this.name = name
  this.cry = function () {
    console.log(this.name + ' : wal~!')
  }
}
```

만약 이 생성자로 10개의 객체가 생성될 경우 이 10개 모두 다 `cry` 메소드에 대한 사본을 갖고 있는 상태이기 때문에 10개의 인스턴스가 모두 똑같은 메소드를 실행하는 반면 메모리에는 10개의 메소드가 있는 격이다.

```js
function Dog(age, name) {
  this.age = age
  this.name = name
}

Dog.prototype.cry = function () {
  console.log(this.name + ' : wal~!')
}
```

반면 위와 같이 프로퍼티에 메소드를 추가할 경우 한 개의 메소드를 10개의 인스턴스가 공유하기 때문에 메모리 측면에서 이 위의 방법과 비교했을 때 효율적이다.

## 클래스를 이용한 상속 구현

### 자바스크립트에서의 클래스

타 언어에서 사용했던 클래스와 자바스크립트에서 사용하는 클래스는 무언가 느낌이 다르다. 위에서 정리한 대로 자바스크립트는 생성자와 프로토타입을 기반으로 둔 객체지향 프로그래밍 언어이다.

클래스 문법이 나왔다고 해서 자바스크립트 세상에 새로운 객체지향 모델이 제시된 건 아니고 단지 생성자와 프로토타입을 좀 더 쉽게 다룰 수 있는 문법이라고 생각하면 편할 것이다. 실제로 클래스는 함수로 취급되며 많은 **폴리필**들을 봐도 클래스는 함수로 변환되어진다.

### constructor

프로토타입과 생성자를 이용해서 객체를 생성할 때 함수 내부에서 `this`에 값을 할당한 것 처럼 클래스에서도 `constructor` 내부에서 `this` 값에 값을 할당하면 그 값은 인스턴스의 변수가 된다.

```js
class Dog {
  constructor(age, name) {
    this.age = age
    this.name = name
  }
}

// 위와 같은 함수 선언식
function Dog(age, name) {
  this.age = age
  this.name = name
}
```

클래스로 객체를 생성했을 때와 생성자로 객체를 생성했을 때와 객체는 똑같이 만들어진다. 단지 생성자로 객체를 만드는 방법보다 좀 더 세련된(?) 구문이라고 하면 편하겠다.

### 클래스 선언과 표현식

위의 코드처럼 클래스를 선언해놓는 경우를 클래스 선언문이라고 하고, 표현식으로도 사용할 수 있다.

```js
// 클래스명은 생략 가능
var Dog = class {
  constructor(age, name) {
    this.age = age
    this.name = name
  }
}

// 위와 같은 함수 표현식
var Dog = function (age, name) {
  this.age = age
  this.name = name
}
```

위 아래는 각각 클래스 표현식 / 함수 표현식이다. 이런식으로도 사용할 수 있다.

### 클래스 메소드

클래스에는 메소드가 추가될 수 있다.

```js
class Dog {
  constructor(age, name) {
    this.age = age
    this.name = name
  }

  cry() {
    console.log(this.name + ' : wal~!')
  }

  greet() {
    console.log(this.name + ' : hello~!')
  }
}

const lucy = new Dog(1, 'Lucy')

lucy.cry()
lucy.greet()

console.log(lucy.cry === Dog.prototype.cry)

//Lucy : wal~!
//Lucy : hello~!
//true
```

메소드를 추가하면 그 메소드는 클래스의 프로토타입에 추가되며 생성된 인스턴스는 클래스의 프로토타입을 참조해서 메소드를 실행한다. 실제로 생성된 인스턴스의 메소드와 클래스 프로토타입 메소드는 서로 같은 것을 볼 수 있다.

### get / set 메소드

클래스의 메소드 앞에 `get` 혹은 `set` 키워드를 붙이게 되면 해당 프로퍼티로 접근했을 때 어떠한 행동을 취할 수 있다.

```js
class Dog {
  constructor(age, name) {
    this.__age__ = age
    this.__name__ = name
  }

  cry() {
    console.log(this.name + ' : wal~!')
  }

  greet() {
    console.log(this.name + ' : hello~!')
  }

  get name() {
    return this.__name__
  }

  get age() {
    return this.__age__
  }

  set name(name) {
    this.__name__ = name
  }

  set age(age) {
    this.__age__ = age
  }
}

const lucy = new Dog(1, 'Lucy')

console.log(lucy.name)
lucy.name = 'lucky'
console.log(lucy.name)

//Lucy
//lucky
```

클래스의 멤버 변수를 캡슐화 시킬 수 있다.

### 정적 메소드

인스턴스를 생성하지 않고 해당 클래스의 메소드를 사용할 수 있는 방법은 바로 정적 메소드를 만드는 것이다. 메소드 선언시 앞에 `static` 키워드를 붙여주면 해당 메소드는 정적 메소드가 된다.

```js
class Dog {
  constructor(age, name) {
    this.__age__ = age
    this.__name__ = name
  }

  get name() {
    return this.__name__
  }

  get age() {
    return this.__age__
  }

  /** @param {Dog} dog */
  static olderThanFive(dog) {
    return dog.age > 5
  }
}

const dog = new Dog(6, 'Lucy')
const olderThanFive = Dog.olderThanFive(dog)

console.log(olderThanFive)
//true
```

5살보다 많은지 그렇지 않은지 판별하는 메소드를 하나 만들고 `static` 키워드를 붙여 정적 메소드로 만들었다. 이 정적 메소드는 따로 인스턴스를 만들지 않고도 접근할 수 있다.

### 클래스 상속

클래스에서의 상속은 `extends` 키워드와 `super` 키워드를 사용하면 프로토타입을 이용해서 상속을 구현했을 때보다 훨씬 편하고 간결해진다.

```js
class Dog {
  constructor(age, name) {
    this.__age__ = age
    this.__name__ = name
  }

  get age() {
    return this.__age__
  }

  get name() {
    return this.__name__
  }

  set age(age) {
    this.__age__ = age
  }

  set name(name) {
    this.__name__ = name
  }

  cry() {
    console.log(this.name + ' : maw~~')
  }
}

class Doberman extends Dog {
  constructor(age, name, weight) {
    super(age, name)

    this.__weight__ = weight
  }

  get weight() {
    return this.__weight__
  }

  set weight(weight) {
    this.__weight__ = weight
  }

  // Override
  cry() {
    console.log(`${this.name}(${this.weight}) : wal!!!!!!!!`)
  }
}

const lucy = new Doberman(3, 'Lucy', 20)

console.log(lucy.name, lucy.weight)

lucy.cry()

// Lucy 20
// Lucy(20) : wal!!!!!!!!
```

`extends` 키워드로 `Dog` 클래스를 상속했으며 상속받은 모든 메소드를 사용할 수 있다. 또한 자식 클래스인 `Doberman` 클래스에서 생성자를 실행할 때 `super` 키워드를 사용해서 부모 클래스의 생성자를 호출했고 부모 생성자 호출에 필요한 `age`와 `name` 인자를 넘겨주었다.

> 자식 클래스에서 생성자가 없으면 부모 클래스의 생성자가 대신 호출된다.
