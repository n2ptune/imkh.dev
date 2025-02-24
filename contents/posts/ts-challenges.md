---
title: 타입스크립트 유틸리티 타입과 타입 챌린지로 실력 올리기
date: 2021-03-28 10:12:00
published: true
tags: ['typescript']
cover_image:
description: 타입스크립트 유틸리티 타입으로 다양한 타입을 선언해서 사용하고 타입 챌린지 오픈 소스 프로젝트를 통해 타입스크립트 실력 기르기
---

## 유틸리티 타입

타입스크립트에서 기본적으로 제공하는 유용한 유틸리티 타입들이 있다. 그 중 사용 빈도 수가 높으며 개인적인 생각으로 많이 쓰일 것 같은 유틸리티 타입 몇 개를 여기에 정리하고 사용해본다.

### Partial

시그니처는 `Partial<T>`이다. 제네릭 타입으로 온 `T`에 대한 모든 키값을 선택적으로 만든다.

```typescript
type Person = {
  name: string
  age: number
  job: string
}

type PartialPerson = Partial<Person>
// type PartialPerson = {
//   name?: string
//   age?: number
//   job?: string
// }

const person: PartialPerson = {
  name: 'Lee'
}

console.log(person)
// { name: 'Lee' }
```

매우 자주 쓰이는 유틸리티 타입 중 하나라고 생각한다.

### Readonly

시그니처는 `Readonly<T>`이다. 제네릭 타입으로 온 `T`에 대한 모든 키값을 `readonly`로 설정한 타입을 반환한다.

```typescript
const noModifyPerson: Readonly<Person> = {
  name: 'Lee',
  age: 25,
  job: 'Developer'
}

// 아래 라인은 실행될 수 없다.
noModifyPerson.name = 'Kim'
```

갖고있는 타입에서 수정 불가능한 타입을 만들어야 할 때 유용하게 사용될 수 있다.

### Record

시그니처는 `Record<T, K>`로 작성되며 `T`에 `K`의 키들을 매핑시킨다.

```typescript
type ScoreOnlyMaxAndMin = {
  min: number
  max: number
}

type Subject = 'english' | 'math' | 'science'

const mySubjectScore: Record<Subject, ScoreOnlyMaxAndMin> = {
  english: {
    max: 100,
    min: 65
  },
  math: {
    max: 90,
    min: 20
  },
  science: {
    max: 80,
    min: 50
  }
}
```

`Subject` 타입은 각각 `english`, `math`, `science` 프로퍼티를 가지며 각 프로퍼티에 `ScoreOnlyMaxAndMin` 타입을 매핑시키므로 `Subject` 타입의 프로퍼티는 모두 `max`와 `min` 프로퍼티를 가진다.

### Pick

시그니처는 `Pick<T, K>`이며 `T`에서 `K`를 선택해 새로운 타입을 구성한다.

```typescript
type Product = {
  name: string
  price: number
  image: string
  seller: number
  shelfLife: number
}

type ProductPreview = Pick<Product, 'name' | 'price'>

const productPreview: ProductPreview = {
  name: 'apple',
  price: 25000
}
```

타입 `T`에서 고르고 싶은 것만 골라 새로운 타입을 만들어낼 수 있는 점이 유용하고, 아주 많이 사용된다.

유틸리티 타입은 [공식 홈페이지](https://www.typescriptlang.org/docs/handbook/utility-types.html)에 문서화가 잘 되어있어 한 눈에 알아보기 편하다. 직접 [플레이그라운드](https://www.typescriptlang.org/ko/play)에서 실행해볼 수도 있다.

## 타입 챌린지

위에 나와있는 유틸리티 타입을 직접 정의해서 문제를 풀어볼 수 있는 좋은 오픈 소스 프로젝트가 있어서 여기에 정리한다. [Github](https://github.com/type-challenges/type-challenges)에서 리드미에 모든 문제에 대한 내용이 적혀져 있고 해당 저장소 이슈에 자신이 정의한 타입을 올려 피드백을 받거나 다른 사람이 어떻게 정의했는지 참고할 수 있는 저장소다.

수록된 문제들을 풀다보면 유연한 타입을 어떻게 정의해야 하는지, 창의적인 방법이 떠오를 수 있다.
