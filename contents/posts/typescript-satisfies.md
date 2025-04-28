---
title: 타입스크립트 satisfies 연산자
published: true
date: 2025-04-07T08:58:26.635Z
cover_image:
description: 타입스크립트 satisfies 연산자에 대해 학습하고 정리하기
tags: ['typescript']
---

## 사전적 의미

`satisfies` 의 사전적 의미는 만족이라는 단어와 관련이있다. 만족시키다로 주로 해석되는 것 같다. 원형은 satisfy 이며 `satisfies` 는 복수형이다. 비슷한 단어로 convince, fulfil (프로미스 이행 단계의 그 단어와 동일하다.), comply with 등이 있다.

## 연산자가 나오게 된 배경

새로운 기능에 대해서 접근할 때에는 이 기능이 어떤 문제를 해결하고자 나온 것일까? 라는 관점에서 바라보면 좀 더 재미있게 기능을 이해할 수 있는 것 같다. 그런 관점에서 이 연산자 `satisfies` 가 나오게 된 배경은 어떠할까?

```typescript
const strOrNumberArr: string | number[] = 'kkk'
strOrNumberArr.toUpperCase() // ?
```

유니온 타입인 어떤 변수가 두 타입 중 한 타입에만 존재하는 메서드를 사용하려고 하면 어떤 상황이 벌어질까? -> 정답은 에러없이 사용된다. 변수에 값 할당시 해당 값으로부터 타입을 추론할 수 있기 때문에 `toUpperCase` 메서드 사용시 `string` 타입으로 추론되고, 사용이 가능하다.

```typescript
const wrapper: { strOrNumberArr: string | number[] } = {
  strOrNumberArr: 'kkkk'
}
wrapper.strOrNumberArr.toUpperCase() // ?
```

해당 구문은 `toUpperCase` 메서드에 타입스크립트 에러가 표시된다. 왜일까? 첫번째 예제는 타입이 바뀔 일이 없는 상수이고, 아래 객체의 프로퍼티 값은 언제든지 바뀔 수 있는 값이다. 런타임시 해당 값이 `number[]` 타입으로 변경될 수 있기 때문에 정확히 추론이 불가능하다. 따라서, 타입스크립트는 유니온 타입에 공통되지 않은 메서드를 호출하려고 할 때 에러를 표시한다.

그렇다면 이것은 조금 불편하다고 느낄 수 있다. 타입 설계는 맞을 수 있으나, 객체 리터럴에 한해서는 절대 다른 타입이 할당되지 않는다고 생각할 수 있다. 어떻게 하면 객체 프로퍼티의 타입을 유니온 타입에서 한 타입으로 강제할 수 있을까?

### as 연산자로 반창고 붙이기

```typescript
const wrapper: { strOrNumberArr: string | number[] } = {
  strOrNumberArr: 'kkkk'
}
;(wrapper.strOrNumberArr as string).toUpperCase()
```

`strOrNumberArr` 프로퍼티를 `as` 연산자로 타입 단언을 하면 `toUpperCase` 메서드를 사용할 수 있긴 하다. 다만 프로퍼티가 많아질 수도 있고, 확장성을 고려하고 앞으로 이런 부분이 더 나올 것을 생각하면 `as` 지옥이 펼쳐질 수도 있다.

## satisfies 연산자 사용하기

여기서 나는 과일 공장들의 월 수확량을 관리하는 관리자라고 가정한다. 사과 공장, 블루베리 공장, 체리 공장에서 각각 월별 수확량이 보고되는데, 나는 그 수확량을 총합하여 관리하는 책임을 가진다. 이 현실 세계의 문제를 코드와 같이 표현해보자.

```typescript
type Fruits = 'apple' | 'blueberry' | 'cherry'

const fruits: Record<Fruits, number[]> = {
  apple: [20, 40, 30],
  blueberry: [30, 60, 90],
  cherry: [60, 10, 20]
}

const apples = fruits.apple.reduce((pre, cur) => pre + cur, 0)
const blueberries = fruits.blueberry.reduce((pre, cur) => pre + cur, 0)
const cherries = fruits.cherry.reduce((pre, cur) => pre + cur, 0)
```

각 공장에서 3달치 수확량이 보고되며 나는 내가 관리하는 공장의 이름을 타입으로 지정하고 객체의 키는 공장의 이름, 값은 3달치 수확량을 저장하도록 설계했다. **나는 코딩을 잘 못하므로, 공장이 추가될 때마다 한 줄씩 추가한다고 가정한다.** 그러던 어느날, 바나나 공장도 관리하라는 대표님의 명령이 떨어졌다. 그러나 이 바나나 공장, 3달치 수확량을 무려 "문자열"로 제공한다.

나는 청천벽력과 같은 소식에 기존에 해오던 방식과 달라 적지 않게 당황한다. 하지만 이내 정신을 차리고 방법에 대해서 고민한다.

```typescript
type Fruits = 'apple' | 'blueberry' | 'cherry' | 'banana'

const fruits: Record<Fruits, string | number[]> = {
  apple: [20, 40, 30],
  blueberry: [30, 60, 90],
  cherry: [60, 10, 20],
  banana: '10 20 50'
}

const apples = fruits.apple.reduce((pre, cur) => pre + cur, 0)
const blueberries = fruits.blueberry.reduce((pre, cur) => pre + cur, 0)
const cherries = fruits.cherry.reduce((pre, cur) => pre + cur, 0)
```

일단 타입부터 다시 설계한 나는, 변수 할당까지는 문제 없어 보이나 총 수확량을 계산하는 부분의 빨간 줄들을 보며 무엇이 잘못되었는지 생가해본다. `number[]` 타입에는 `reduce` 메서드가 있지만, `string` 타입에는 `reduce` 메서드가 없다는 점을 깨닫게 된다.

```typescript
const bananas = fruits.banana
  .split(' ')
  .map(v => parseInt(v))
  .reduce((pre, cur) => pre + cur, 0)
```

문자열로 오는 총 수확량에 대해서 계산하는 코드를 작성했다. 하지만 무수히 보이는 빨간 줄로 인해 이게 잘한건가 싶다. 빨간 줄이 뜨는 이유는 위에 서술했듯 `string | number[]` 서로 공통된 타입 중 `reduce` 메서드가 존재하지 않고, `split` 메서드 또한 존재하지 않는다.

```typescript
const fruits = {
  apple: [20, 40, 30],
  blueberry: [30, 60, 90],
  cherry: [60, 10, 20],
  banana: '10 20 50'
} satisfies Record<Fruits, string | number[]>
```

객체 할당 구문에 이렇게 `satisfies` 연산자를 추가하면 그 많던 빨간 줄이 한번에 사라진다. 이 연산자는 유니온 타입중 특정 타입을 만족하는지 검증해주는 역할을 한다. 따라서, `banana` 타입은 `string | number[]` 타입 중 `string` 타입으로 추론될 수 있다.

## 참고

지원 버전: 4.9

- [https://github.com/microsoft/TypeScript/pull/46827](https://github.com/microsoft/TypeScript/pull/46827)
