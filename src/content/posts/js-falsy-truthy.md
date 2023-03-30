---
title: 자바스크립트 논리 연산자와 참, 거짓으로 평가되는 값들
date: 2021-02-10 15:43:33
published: true
tags: ['javascript']
cover_image: /images/js-falsy-truthy-thumbnail.jpg
description: 자바스크립트 논리 연산자와 참, 거짓으로 평가되는 값들에 대해서 알아보고 학습해보기
---

## 자바스크립트 논리 연산자와 참, 거짓으로 평가되는 값들

자바스크립트에서는 `||(OR)` 혹은 `&&(AND)`로 논리 연산자를 표현할 수 있다. 둘 말고도 `!(NOT)`을 이용해 참인 값을 거짓으로 반전시키거나 그 반대인 경우도 표현할 수 있다. 이 논리 연산자를 학습하기 앞서 자바스크립트에서 참으로 평가되는 값과 거짓으로 평가되는 값에 대해서 알아보고 학습해볼 필요가 있다. 왜냐하면 자바스크립트에서 해당 값을 참으로 판단하느냐 거짓으로 판단하느냐는 다른 프로그래밍 언어와는 사뭇 다른 점이 있기 때문이다.

### 거짓으로 평가되는 값들

자바스크립트 원시 타입중 `null`, `undefined`, `0(Number)`, `''(String)`, `false`는 모두 거짓으로 평가된다.

```js
if (null) {
  alert('null')
}
```

`if` 블록으로 감싸져 있는 부분은 절대 실행되지 않는다. `null`이 거짓으로 평가되기 때문이다.

```js
if (NaN) {
  alert('NaN')
}
```

`NaN` 또한 거짓으로 평가된다.

### 참으로 평가되는 값들

거짓으로 평가되는 값들은 얼마 없지만 참으로 평가되는 값들은 비교적 많다. 위에서 언급했던 거짓으로 평가되는 값들 외에는 전부 참으로 평가된다. `0`이 아닌 숫자 음수 혹은 양수는 모두 참으로 평가되는 값들이다. 그리고 빈 문자열 외의 문자열은 모두 참으로 평가된다.

```js
if ([]) {
  alert('빈 배열')
}
```

위 코드는 얼럿창이 뜬다. 빈 배열은 참으로 평가된다.

```js
if ({}) {
  alert('빈 객체')
}
```

마찬가지로 빈 객체도 참으로 평가된다.

```js
if (function () {}) {
  alert('함수')
}
```

실행부에 아무 것도 없는 함수도 참으로 평가된다.

```js
if ('0') {
  alert('0')
}
```

빈 문자열이 아니기 때문에 참으로 평가된다. 그 외 참으로 평가되는 값들이 많지만 자바스크립트에서는 크게 빈 객체 혹은 빈 배열을 `if` 블록에 조건으로 줄 경우가 많으므로 이 부분을 집중적으로 학습할 필요가 있어보인다.

### OR 연산자

`||` 기호로 사용할 수 있는 해당 연산자는 TRUTHY한 값을 찾아 반환한다. 피연산자들 중 제일 먼저 참인 것 같은 값을 반환한다는 소리다.

```js
const zero = 0
const value = 421
const truthy = zero || value(1)(2)

console.log(truthy)
// 421
```

피연산자들중 왼쪽부터 차례로 참으로 평가되는 값을 먼저 반환한다. `zero`는 0이므로 거짓으로 평가된다. 그 다음 피연산자인 `value`는 421로 참으로 평가되는 값이다. 고로 변수 `truthy`에는 숫자 421이 담기게 된다.

```js
if (zero || value) {
  console.log('truthy')
}
// truthy
```

마찬가지로 위 `if` 블록의 조건문에서 421이 반환되기 때문에 참으로 평가 되어 해당 블록이 실행된다.

### AND 연산자

`&&` 기호로 사용할 수 있는 해당 연산자는 FALSY한 값을 찾아 반환한다. OR 연산자와 마찬가지로 피연산자들 중 왼쪽부터 하나씩 평가한다. 피연산자가 참으로 평가되면 지나친다. 마지막 피연산자까지 도달한 경우라면 그 마지막 피연산자를 평가하지 않고 반환한다.

```js
const and = 1 && 2 && null && undefined(1)(2)(3)
```

위 AND 연산자는 `undefined` 까지 도달하지 않고 `null`이 대입된다. 1과 2는 모두 참인 값이므로 지나치고 그 다음으로 온 피연산자가 거짓으로 평가되는 값인 `null`이라서 해당 값이 대입된다.

```js
const and = 1 && 2(1)(2)
```

모든 피연산자가 참으로 평가되는 값인데, 마지막 피연산자까지 거짓으로 평가되는 값이 없으면 마지막 피연산자가 반환되므로 변수 `and`에는 2가 담긴다.

```js
if (full && not_tired) {
  code.hard()
}
```

`if` 조건문에서는 피연산자가 모두 참인 값으로 평가될 때 블록이 실행된다.

```ts
const List: React.FC = (props: ListProps) => {
	return props.loaded && <div>{...}</div>
}
```

리액트에서는 AND 연산자를 이용해 어떠한 값이 참일 때에 JSX를 반환하는 코드를 작성할 때 유용하게 사용한다.

### 빈 배열 검사

어떤 객체의 속성에 대해 검사해야할 상황이 있다.

```js
const places = {
  image: ['a.jpg', 'b.jpg']
}

if (places.image) {
  console.log('image load')
  places.image.forEach(image => console.log(image))
}
// image load
// a.jpg, b.jpg
```

위 코드는 얼핏 보면 위화감이 없어보이지만 `places` 객체에 `image` 속성이 빈 배열시에도 `if` 블록 안에 있는 코드가 실행된다. 빈 배열은 참으로 평가되기 때문이다.

```js
const places = {
  image: ['a.jpg', 'b.jpg']
}

if (places.image.length) {
  console.log('image load')
  places.image.forEach(image => console.log(image))
}
// image load
// a.jpg, b.jpg
```

비교하는 대상을 `places.image.length`로 바꾸어 해당 속성에 값이 있을 때만 해당 블록을 실행시킬 수 있다. 하지만 모든 경우의 수를 대비한다고 생각한다면 위 코드는 기대한 대로 동작하지 않을 수 있다. 만약 `places` 객체에 `image` 속성이 없다면 위 코드는 에러를 내뱉는다.

```js
const places = {
  image: ['a.jpg', 'b.jpg']
}

if (Array.isArray(places.image) && places.image.length) {
  console.log('image load')
  places.image.forEach(image => console.log(image))
}
// image load
// a.jpg, b.jpg
```

[Array.isArray](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) 메서드를 이용해서 해당 값이 배열인지 아닌지를 구분할 수 있다. 위 스타일대로 코드를 실행한다면 좀 더 안전하게 해당 블록을 실행할 수 있다.
