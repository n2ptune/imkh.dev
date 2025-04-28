---
description: 자바스크립트 객체의 타입을 변환시켜 원시 자료형 값과 더하거나 원하는 출력 형식으로 출력하는 방법
cover_image:
tags: ['javascript']
published: true
date: 2020-03-27
title: 자바스크립트 객체의 타입 형변환
---

## 객체의 자료형

자바스크립트가 연산을 수행할 때, 형변환이 필요한 경우 형변환을 시킨다. 이 형변환이 이루어질 때의 기준 값은 `hint`라고 하는 기준 값에 의해 형변환이 일어난다. 예를 들어 객체를 콘솔에 출력한다고 하면 문자열로 형변환이 일어난다. `hint`의 종류는 **string**, **number**, **default**로 총 3가지가 있다.

### string

```js
const people = {
  age: 24,
  name: 'James'
}

console.log(people) // {age: 24, name: "James"}
```

`console.log` 메서드는 매개변수로 오는 객체들을 문자열로 변환하여 콘솔에 출력한다. 여기서 바로 `hint`가 `string`형이 된다.

### number

수학 연산을 시도하면 객체의 `hint`는 `number`가 된다.

```js
const people = {
  age: 24,
  name: 'James'
}
const now = Date.now()
const someday = new Date('2020-03-26')

const num = +people // 객체 -> 숫자형 변환
const day = now - someday // 두 날짜간의 차이

console.log(num, day) // NaN, 93788797
```

### default

연산을 수행할 때 자료형을 평가할 수 없을 때 `hint`가 `default`로 된다. 두 자료형을 더한다고 하면 피연산자에 따라 자료형이 알맞게 변환된다. 하지만 피연산자가 객체로 온다면 애매해지므로 `default`가 된다. `==` 연산자에서, `object == number`가 된다면 이 또한 `default`가 된다.

```js
const kim = {
  age: 14,
  name: 'Kim'
}
const lee = {
  age: 15,
  name: 'Lee'
}

const people = kim + lee // hint === default

// hint === default
if (people === 14) {
  console.log(14)
}
```

### 자바스크립트가 형변환하는 메커니즘

- 객체가 `Symbol.toPrimitive` 메서드를 구현했다면 그 메서드를 호출
- 메서드를 구현하지 않고 주어진 `hint`가 `string`이면 `toString` 혹은 `valueOf` 메서드를 호출
- 마찬가지로 위에 해당되지 않고 `hint`가 `number` or `default`면 `vauleOf` 혹은 `toString` 메서드를 호출

## Symbol.toPrimitive

`Symbol.toPrimitive`는 객체를 원시형 값으로 바꾸기 위해 호출되는 자바스크립트 내장 심볼이다. 간단하게 객체에서 이 함수를 구현한다면 연산에서 형변환될 때 주어지는 `hint`로 객체의 해당 값을 내보내거나 형변환을 자유자재로 조절할 수 있다.

```js
const people = {
  age: 15,
  name: 'Kim',
  [Symbol.toPrimitive](hint) {
    return hint === 'number' ? this.age : this.name
  }
}

console.log(+people, people + people)
// +people 연산은 수학 연산으로 hint가 number고 숫자형으로 형변환된다.
// Symbol.toPrimitive 함수에서 hint가 number일 때, age 속성이 반환되게
// 구현했으니 여기에서는 15가 출력된다.
// people + people에서는 피연산자가 객체이므로 hint가 default로 된다.
// hint가 number가 아니면 이름 값을 반환하게 했으므로 여기서는 'Kim' + 'Kim'으로 변환된다.
// 출력 값은 'KimKim'이 된다.
```

`window.alert(people)` 도 마찬가지로 `hint`가 `string`이므로 이름 값을 출력하게 된다. (nodejs 런타임에선 다를 수 있음)

## 심볼을 사용하지 않고 형변환

```js
const somePeople = {
  age: 24,
  name: 'vue'
}

window.alert(somePeople)
window.alert(somePeople.toString())
window.alert(somePeople.valueOf())

// [object Object] x 3
```

위 코드는 `[object Object]` 문자열을 단지 3번 출력한다. `hint`가 `string`이고 `Symbol.toPrimitive` 메서드가 없다. 그러므로 제일 먼저 객체의 `toString` 메서드를 호출한다. (객체의 `toString` 메서드는 문자열 '[object Object]'를 반환한다) 이 메서드가 없으면 `valueOf` 메서드를 호출한다.

`toString`과 `valueOf`는 반드시 원시 자료형인 값을 반환하도록 설계되어 있다. 만약 값이 그러하지 않는 경우 이 메서드는 무시된다. `valueOf` 메서드는 자기 자신을 반환하는(여기서는 객체를 반환) 메서드인데, 위의 코드에서는 제대로 출력이 되지 않는다. 왜냐하면 원시 자료형 값을 반환하지 않기 때문에 이 메서드는 무시되기 때문이다.

`Symbol.toPrimitive`를 구현하지 않으면 형변환은 `toString` -> `valueOf` 순으로 이루어진다. (메서드가 없을 때) 객체의 형변환이 이루어질 때 주어진 `hint`를 기준으로 `string`이면 이름을 `name` 속성을 출력하고 `hint`가 `number`라면 `age` 속성을 출력할 수 있도록 바꾸려면, 해당 객체에 `toString`과 `valueOf` 메서드를 오버라이딩하면 된다.

```js
const somePeople = {
  age: 24,
  name: 'vue',

  toString() {
    return this.name
  },

  valueOf() {
    return this.age
  }
}

window.alert(somePeople)
window.alert(somePeople + somePeople)
window.alert(+somePeople)

// vue
// 48
// 24
```

첫번째 `alert` 호출 때, `somePeople` 객체는 `hint`가 `string`으로 결정되므로 vue를 출력한다. 그 아래 2줄 코드는 덧셈 연산자에 의해 객체가 숫자형으로 변환되어 `valueOf`가 호출되므로 24와 24로 형변환되고 둘이 더한 값 48을 출력한다. 아래 코드 마찬가지로, 숫자형으로 형변환되기 때문에 24가 출력된다.

## 참고

- [https://ko.javascript.info/object-toprimitive](https://ko.javascript.info/object-toprimitive)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
- [http://blog.kazikai.net/?p=142](http://blog.kazikai.net/?p=142)
- [http://insanehong.kr/post/javascript-datatype/](http://insanehong.kr/post/javascript-datatype/)
