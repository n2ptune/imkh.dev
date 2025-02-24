---
title: 타입스크립트 인터페이스 아주 간단하게 살펴보기
date: 2021-03-29 13:23:58
published: true
tags: ['typescript']
cover_image:
description: 타입스크립트에서 인터페이스를 사용해보자.
---

## 인터페이스

`interface` 키워드를 이용해 인터페이스를 정의한다. 인터페이스 안에 정의되는 형태는 키와 값이 쌍을 이루는 형태로 정의한다. 아래는 인터페이스의 모든 프로퍼티가 `string` 타입을 가지는 인터페이스다.

```ts
interface Car {
  modelName: string
  color: string
}
```

인터페이스 `Car`는 두 개의 프로퍼티를 가지며 두 프로퍼티의 타입은 모두 문자열 타입이다. 타입스크립트에서 인터페이스란 어떤 구조물의 기본 설계도 정도라고 생각한다. 그 구조물이 가져야 하는 높이, 넓이, 색상 등 기본 뼈대를 갖추는 시스템인 셈이다.

### 인터페이스를 구현한 클래스

구조물은 넓이와 높이를 가지고 색상을 가진다. 이를 통해 넓이와 높이 그리고 색상을 가진 여러가지 구조물을 가질 수 있다. 이렇게 만들어진 여러 구조물들은 결국은 하나의 인터페이스에서 시작된 구현체이다. 인터페이스에서 반드시 넓이와 높이 그리고 색상을 가져야 한다고 정의 해놓고 클래스가 이를 구현한다면 이는 인터페이스를 구현한 클래스가 된다.

```ts
// 구조물 인터페이스
interface Structure {
  area: number
  width: number
  height: number
  color: string
  getArea: () => number
  getColor: () => string
}
```

위 구조물 인터페이스를 구현한 여러 구조물들을 만들어낸다.

```ts
// 남산 타워
class Namsan implements Structure {
  public area: number
  public color: string

  constructor(public width: number, public height: number) {
    this.area = width * height
    this.color = 'white'
  }

  getArea(): number {
    return this.area
  }

  getColor(): string {
    return this.color
  }
}

// ...
```

### 구성 시그니처

위 구조물 인터페이스에 대한 생성자 시그니처를 하나 만들어 팩토리 함수와 연결시킬 수 있다.

```ts
interface StructureConsturctor {
  new (w: number, h: number): Structure
}
```

함수 시그니처 제일 앞 쪽에 `new` 연산자를 붙여 구성 시그니처로 표현한다. 위 인터페이스를 기반으로 팩토리 함수를 만들어 구조물 인터페이스를 구현한 여러 클래스를 생성할 수 있게 한다.

```ts
function makeStructure(
  S: StructureConsturctor,
  w: number,
  h: number
): Structure {
  return new S(w, h)
}

const namsan = makeStructure(Namsan, 100, 200)

namsan.getArea()
// 100 x 200
namsan.getColor()
// white
```

구조물 인터페이스를 구현한 클래스라면 해당 클래스 타입인 인스턴스를 만들어 반환해준다.

## 인덱스 연산자

인터페이스와 관련된 내용은 아니지만 타입을 구성함에 있어 매우 유용하게 쓰이는 연산자가 있어 여기에 정리한다. 인터페이스에서 모든 프로퍼티 이름을 배열로 저장하여 반환하는 함수를 구현한다.

```ts
interface Structure {
  area: number
  width: number
  height: number
  color: string
}

function getProperties<T, U extends keyof T>(s: T): T[U][] {
  const properties = []

  for (const k in s) {
    properties.push(k)
  }

  return properties
}

const structure: Structure = {
  area: 6,
  width: 2,
  height: 3,
  color: 'white'
}

const props = getProperties(structure)

console.log(props)
// ['area', 'width', 'height', 'color']
```

`getProperties` 함수는 인자로 오는 값의 모든 프로퍼티 이름을 배열에 담아 반환하는 기능을 한다. 제네릭을 이용해 함수를 구성하였으므로 어떤 인터페이스를 가진 객체가 오더라도 대응이 가능하다.

여기서 `U extends keyof T`의 `keyof T`는 `T`의 모든 프로퍼티를 유니언으로 반환한다. 여기서는 `area | width | height | color`를 반환한다. 마지막 반환 타입은 `T[U][]`를 가지는데, 이 부분은 인덱스 접근 연산자가 쓰인 부분이다. 여기서 모든 프로퍼티를 배열에 담아 반환하는 표현을 한다.

### 유연한 타입 만들기

만약 어떤 타입의 모든 프로퍼티를 선택적으로 만들고, `readonly`를 포함하며 기존의 타입에서 몇 개의 프로퍼티가 추가 되어야하는 상황이면 어떻게 해결할 수 있을까?

```ts
type OldType = {
  loggable: boolean
  logging: (log: string[]) => void
}

type AllNewType<T> = { readonly [P in keyof T]?: T[P] }

type ExtendType = {
  fetch: (v: string) => void
}

type ExtendAllNewType = AllNewType<OldType> & ExtendType
```

`AllNewType`은 제네릭으로 오는 타입 `T`에 대해 모든 프로퍼티에 `readonly`, 그리고 선택적으로 변환한다. 새로운 타입이 만들어진 셈이다. 여기에 `ExtendType`과 결합해 어떤 새로운 타입을 만들어내고 싶을 때, `&` 연산자를 통해 두 타입을 하나로 묶는다.
