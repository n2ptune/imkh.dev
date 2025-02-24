---
title: 타입스크립트 제네릭 사용하기
date: 2020-12-13 11:01:18
published: true
tags: ['typescript']
cover_image:
description: 메타몽같은 녀석 제네릭에 대해서 알아보고 정리하기
---

## 타입스크립트 제네릭과 제네릭 형태

- 해당 글은 [원문](https://typescript-kr.github.io/pages/generics.html)을 읽고 복습한 뒤 정리한 내용입니다.

제네릭은 [메타몽](https://namu.wiki/w/%EB%A9%94%ED%83%80%EB%AA%BD)(다른 녀석으로 변할 수 있는 포켓몬)같은 녀석이다. 어떤 함수를 작성하고 있다고 가정하고 인자로 `number` 타입인 인자 한 개를 받는다. 나중에 개발하다가 보니 `number` 타입 외에 다른 타입이 올 수 있다는 점을 인식하고 유니온 타입으로 인자로 올 수 있는 타입을 적었다. 하지만 시간이 더 지나면서 인자로 올 수 있는 타입의 갯수가 무궁무진하게 많아졌고 유니온 타입으로는 힘든 점이 있어 `any` 타입을 붙여버렸다. 만약 이 함수의 반환 타입이 인자의 타입이라면 반환하는 값의 정보를 잃어버린다. 여기서 제네릭을 사용하면 재사용 가능하고 좀 더 유연한 함수를 만들 수 있다.

### 아무거나 출력하는 함수

아무거나 출력하는 함수 하나를 작성하자.

```ts
function print(arg: any): any {
  console.log('print function:', arg)
  return any
}
```

`print` 함수는 인자로 아무거나 올 수 있으며 (`any` 타입) 약간의 문자열과 인자를 출력하고 인자를 반환하는 함수다. 인자가 `any` 타입이기 때문에 아무거나 올 수 있다. 제네릭을 사용해서 이 함수의 인자와 반환타입을 지정해줄 수 있다.

```ts
function print<T>(arg: T): T {
  console.log('print function:', arg)
  return arg
}
```

함수 이름 옆에 꺽쇠 괄호와 타입 변수로 지정할 변수의 이름을 넣는다. 그리고 인자와 반환 값의 타입을 타입 변수로 지정한다.

```ts
const n = print<number>(1)
const s = print<string>('asd')
```

`n`은 `number` 타입을 가지는 걸 명확히 할 수 있고, `s`는 `string` 타입인 걸 명확히 할 수 있다. 물론 `1` 혹은 `asd` 같은 간단한 문자열은 타입 추론에 의해 알아서 타입이 정해지지만 더 복잡한 타입은 타입을 명시해주고 명확히 할 수 있다.

### 제네릭 인터페이스

```ts
interface PrintFn {
  <T>(arg: T): T
}

function print<T>(arg: T): T {
  console.log('print function:', arg)
  return arg
}

const printFn: PrintFn = print

printFn(1234)
```

위와 같이 제네릭 인터페이스를 작성할 수 있다.

```ts
interface PrintFn<T> {
  print: (arg: T) => T
  myValue: T
}

function print<T>(arg: T): T {
  console.log('print function:', arg)
  return arg
}

const printFn: PrintFn<number> = { print, myValue: 123 }

console.log(printFn.print(12345))
console.log(printFn.myValue)
```

제네릭 매개변수를 인터페이스 전체에서 사용할 수도 있다. 이 경우 인터페이스의 이름 뒤 꺽쇠 괄호 안에 사용할 제네릭 타입 변수 이름을 지정하고 멤버에서 사용하면 된다. `print` 함수와 `myValue` 멤버에서 둘 다 타입이 `T`인 값을 반환한다. 사용할 때에는 어떤 타입이 쓰여질지 타입을 지정해준다.

### 제네릭 클래스

제네릭 인터페이스와 비슷하게 클래스도 제네릭으로 만들 수 있다.

```ts
class PlusTwoGeneric<T> {
  plus: (a: T, b: T) => T
}

const plusTwoString = new PlusTwoGeneric<string>()
const plusTwoNumber = new PlusTwoGeneric<number>()

plusTwoString.plus = (a: string, b: string) => {
  return a + b
}

plusTwoNumber.plus = (a: number, b: number) => {
  return a + b
}

const strOneAndTwo = plusTwoString.plus('1', '2')
const numOneAndTwo = plusTwoNumber.plus(1, 2)

console.log(strOneAndTwo)
console.log(numOneAndTwo)
// '12'
// 3
```

`PlusTwoGeneric`은 제네릭 타입 `T`를 받고 `plus` 추상 함수에 인자 두 개가 모두 `T` 타입을 갖는다. 반환 값의 타입 역시 `T` 타입이다. 인스턴스를 새로 만들고 `plus` 함수를 제네릭 타입에 맞게 구현한다. 문자열 `1`과 `2`를 합치면 `12`이 되고 숫자 `1`과 `2`를 합치면 `3`이 되므로 정상적으로 동작하는 걸 볼 수 있다. 이와 같이 제네릭 클래스를 통해 추상적인 형태를 만들어 놓으면 어떤 타입이 와도 타입에 맞게 구현할 수 있다.

## 제네릭 제약 조건 만들기

```ts
function printLength<T>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

위 함수는 무조건 에러가 표시된다. 타입스크립트에서는 `T` 타입에 `length` 속성이 있는지 없는지 모르며 이 함수가 실행되는 시점에 인자 속성에는 `length`가 없을 수도 있다. `T` 타입이 반드시 `length` 속성이 있다는 걸 보장하기 위해 제약 조건을 걸 수 있다.

```ts
interface LimitPrint {
  length: number
}

function printLength<T extends LimitPrint>(arg: T): T {
  console.log(arg.length)
  return arg
}

const a = printLength(1)
const b = printLength([1, 2, 3, 4])
```

제네릭 타입 이름 뒤에 `extends` 키워드와 제약 조건을 포함하는 인터페이스의 이름을 넣어주면 `T` 타입은 반드시 `LimitPrint` 인터페이스의 멤버가 있어야 된다고 명시할 수 있다. 이제 함수 구현부에서는 오류가 안나지만 `length` 속성이 없는 값이 오는 함수 호출부에서 에러가 나게 된다. 위의 코드에서 `printLength(1)` 호출 부분에서는 에러가 난다. `1` 에는 `length` 속성이 없다.

다만 그 아래의 `[1, 2, 3, 4]`는 배열 객체이기 때문에 `length` 속성을 가지고 있다.
