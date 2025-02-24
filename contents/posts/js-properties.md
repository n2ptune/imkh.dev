---
title: 자바스크립트 데이터 프로퍼티와 접근자 프로퍼티 이해하기
date: 2021-01-23 09:15:07
published: true
tags: ['javascript']
cover_image:
description: 데이터 프로퍼티와 접근자 프로퍼티에 대해 이해하고 정리하기
---

## 데이터 프로퍼티

일반적으로 객체에 속해있는 프로퍼티를 데이터 프로퍼티라고 한다.

```js
const obj = {
  id: 1, // 데이터 프로퍼티
  name: 'Obj' // 데이터 프로퍼티
}
```

`obj` 변수에 저장된 객체는 `id`와 `name` 프로퍼티를 가지고 두 프로퍼티는 모두 데이터 프로퍼티다. 일반적으로 `obj.id` 혹은 `obj.name`과 같이 객체의 프로퍼티를 읽을 수 있다.

## 접근자 프로퍼티

객체의 프로퍼티 종류 중 새로운 종류의 프로퍼티이다. 함수처럼 정의되며 호출은 데이터 프로퍼티에 접근하는 것 처럼 호출할 수 있다.

```js
const obj = {
  id: 1, // 데이터 프로퍼티
  name: 'Obj', // 데이터 프로퍼티
  get idAndName() {
    return `${this.id}, ${this.name}`
  }, // 접근자 프로퍼티
  set idAndName({ id, name }) {
    this.id = id
    this.name = name
  } // 접근자 프로퍼티
}

obj.idAndName // '1, Obj'
obj.idAndName = { id: 2, name: 'Obj2' }
obj.idAndName // '2, Obj2'
```

함수 앞에 `get`과 `set` 키워드가 붙으면 해당 함수는 접근자 프로퍼티로 동작한다. `get`은 객체의 어떠한 데이터를 읽어서 반환할 때 사용하며 `set`은 데이터를 쓸 때 사용한다.

### defineProperty로 접근자 프로퍼티 만들기

동적으로 접근자 프로퍼티를 설정하려면 `Object.defineProperty` 메소드를 이용해 지정할 수 있다.

```js
const obj = {
  id: 1,
  name: 'Obj'
}

Object.defineProperty(obj, 'idAndName', {
  get() {
    return `${this.id}, ${this.name}`
  },

  set({ id, name }) {
    this.id = id
    this.name = name
  }
})

obj.idAndName = { id: 2, name: 'OOO' }
console.log(obj.idAndName) // '2, OOO'
```

접근자 프로퍼티는 데이터 프로퍼티에 있는 `value`를 가질 수 없기 때문에 `get`과 `set` 그리고 `value`까지 지정하면 오류가 나게 된다. 접근자 프로퍼티가 가질 수 있는 설명자는 `get`, `set`, `enumerable`, `configurable`가 있다.

### 생성자 함수에서 접근자 프로퍼티 사용하기

생성자 함수로 객체를 만들고 그 객체를 기반으로 하는 어떠한 데이터를 만들어 반환해야 하는 경우 접근자 프로퍼티를 이용해 반환하는 방법이 있다.

```js
function Student(name, { math, english }) {
  this.name = name
  this.score = {
    math,
    english
  }

  Object.defineProperty(this, 'average', {
    get() {
      const len = Object.keys(this.score).length
      let sum = 0

      for (const score of Object.values(this.score)) {
        sum += score
      }

      return parseInt(sum / len)
    }
  })
}

const score = { math: 50, english: 70 }
const student = new Student('철수', score)
console.log(student.average)
```

`Student` 생성자 함수는 이름과 각 시험의 점수를 받고 내부에 저장한다. 그리고 시험의 점수를 기반으로 반환해야 할 평균을 접근자 프로퍼티를 이용해 만든다. `average` 접근자 프로퍼티는 `score`에 저장되어 있는 모든 시험 점수를 더한 값에 과목 수를 나누어 반환한다. 객체의 어떤 데이터를 기반으로 접근자 프로퍼티를 이용해 새로운 값을 반환했다.

물론, 생성자 함수가 실행될 시점에 평균을 계산하고 내부에 저장하는 방법도 있겠지만 구현하기 나름이라고 생각한다. 그 방법은 그 방법 나름대로의 장점이 존재할 것이고, 이 방법도 이 방법 나름대로의 장점이 존재할 것이다. 상황에 맞게 접근자 프로퍼티가 유용할 것 같으면 주저없이 사용할 것 같다.
