---
description: HTMLCollection 인터페이스와 NodeList 인터페이스의 차이점과 특징, 그리고 이러한 유사 배열을 일반 자바스크립트 배열 객체로 변환하는 방법을 서로의 특징을 이해하고 정리한 뒤 사용해보기
cover_image: /images/js-nodelist-to-array-thumbnail.png
tags: ['javascript']
published: true
date: 2020-04-25
title: HTMLCollection과 NodeList의 차이점과 일반 자바스크립트 배열로 바꾸기
---

## NodeList란

일반적으로 **DOM**을 가져오기 위한 메소드로 `querySelector`, `getElementsByClassName` 등이 있다. 단일 원소를 가져오는 것은 해당되지 않는다만 원소 리스트를 가져올 때에 일반적인 자바스크립트 객체 배열의 메소드를 사용할 수 없다. 이유는 원소 리스트가 자바스크립트 객체 배열이 아니기 때문이다.

```vue
<div class="container">
  <div class="red"></div>
  <div class="red"></div>
  <span class="red"></div>
  <div class="red"></div>
  <h1 class="red"></h1>
</div>
```

컨테이너 안에 서로 다른 태그지만 클래스 명은 모두 같은 원소 5개가 있다. 이 중에서 태그가 `div`인 원소만 가져오고 싶다. 이럴 때 제일 먼저 생각나는 자바스크립트 배열 메소드인 `filter`가 있다.

```js
const reds = document.querySelectorAll('.red')
// instead of
// const reds = document.getElementsByClassName('red')
```

`querySelector`는 단일 원소를 선택할 때 사용되고, `querySelectorAll` 메소드는 인자로 오는 선택자에 해당하는 모든 원소를 `NodeList`라는 객체로 내보낸다. 그리고 다수의 원소를 선택할 때 대신 사용되는 것 중 하나인 `getElementsByClassName`은 `HTMLCollection`이라는 인터페이스를 내보낸다. 이 콜렉션과 `NodeList`라는 객체는 배열과 유사한 객체이고 자바스크립트 배열은 아니다.

서로 비슷한 부분이 많지만 차이점이 존재한다.

## HTMLCollection vs NodeList

두 객체는 배열과 유사하기 때문에 배열과 유사한 속성을 가진다. 예를 들어 배열의 길이에 대한 정보를 가지고있는 `length` 속성을 가진다. 이 부분은 두 객체 모두 공통적으로 가지고 있는 속성이다.

### item()

이 메소드는 두 객체에 모두 있는 메소드다. 배열과 유사하기 때문에 `collection[index]` 꼴의 표현이 가능하다. 이 메소드는 그와 비슷한 행동을 한다. 첫번째 인자로 받는 `index` 값에 해당하는 아이템을 반환한다.

```js
const reds = document.getElementsByClassName('red')
console.log(reds.item(8), reds[8])
// null undefined
```

차이점은 객체의 길이를 벗어난 참조를 할 때 나타난다. 메소드를 이용해서 아이템을 반환받는 과정에서는 길이를 벗어난 참조를 하면 `null`을 반환하는 반면, 일반적인 배열에서 접근할때와 비슷하게 참조를 하게 되면 `undefined`가 반환된다.

> 이러한 메소드 구현은 자바스크립트가 아닌 프로그래밍 언어에서 DOM을 구현할 때 유용하다고 한다.

### namedItem()

`HTMLCollection` 객체에만 있는 메소드로서 원소에 `name` 속성이 사용가능한 경우에 이 메소드를 이용해서 `name` 속성이 메소드의 인자로 오는 문자열과 일치하는 원소를 반환한다.

```vue
<div class="container">
  <div class="red"></div>
  <div class="red"></div>
  <span class="red"></div>
  <div class="red"></div>
  <h1 class="red" name="kkk"></h1>
</div>

<script>
const reds = document.getElementsByClassName('red')
console.log(reds.namedItem('kkk'))
// <h1 class="red" name="kkk"></h1>
console.log(reds['kkk1'], reds.namedItem('kkk1'))
// undefined null
</script>
```

특징은 `item` 메소드와 비슷하다. 아래부터는 모두 `NodeList` 객체에서만 사용가능한 메소드들이다.

### entries()

객체 내의 모든 원소들을 반복 가능한 `iterator`를 반환한다. 반환되는 값은 키와 값이 쌍을 이루고 있는 배열이며 값은 `Node` 객체이다.

```js
const reds = document.querySelectorAll('.red')

for (const entry of reds.entries()) {
  console.log(entry)
}
// (2) [0, div.red]
// (2) [1, div.red]
// (2) [2, span.red]
// (2) [3, div.red]
// (2) [4, h1.red]
```

### forEach()

일반 자바스크립트 배열 객체에서 사용했던 메소드, 리스트 내에 모든 원소에 대해 인자로 오는 콜백 함수를 실행시킨다.

```js
const reds = document.querySelectorAll('.red')

reds.forEach(red => console.log(red.tagName))
// DIV....
```

`forEach` 메소드의 두번째 인자로 `this`를 바인딩시킬 수 있다. **Optional**한 인자기 때문에 줘도 되고 안줘도 된다.

콜백 함수는 3개의 인자를 가지며 `(a, b, c) => {...}` 형태일 때 a는 현재 콜백에 담긴 요소이며 b는 현재 콜백에 담긴 요소의 인덱스 값이고 c는 콜백을 실행중인 `NodeList` 객체다.

### keys(), values()

각각 원소들의 키와 값을 반복가능한 객체인 `iterator`로 반환한다. `for ... of`문에서 사용할 수 있다.

```js
const reds = document.querySelectorAll('.red')

for (const values of reds.values()) {
  console.log(values)
}
// Node 객체...

for (const keys of reds.keys()) {
  console.log(keys)
}
// 0..1..2..3
```

### 브라우저 호환성

두 인터페이스 모두 **IE8** 이상부터 구현되어 있지만 `NodeList` 객체의 거의 모든 메소드를 **IE**에선 사용할 수 없다. 그렇기 때문에 약간의 **폴리필**이 필요하다. 기본적으로 `NodeList`의 `forEach` 메소드는 `Array` 객체의 `forEach` 메소드와 똑같이 동작하기 때문에 아래와 같이 정의해주면 사용할 수 있다.

```js
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}
```

그 외 메소드들은 자주 사용되는 메소드들이 아니기 때문에 **폴리필**에 대한 정보가 부족하다.

## NodeList와 HTMLCollection을 일반 배열로 사용하기

두 가지 방법이 있다. 첫번째는 `Array.from` 메소드를 사용하는 방법

```js
const reds = document.querySelectorAll('.red')
const redsArr = Array.from(reds)

redsArr.map(red => console.log(red))
```

매우 쉬운 방법이다. 다른 이견이 없다면 이 방법을 사용하는 것이 매우 좋아보인다. 하지만 언제나 문제는 IE에서 생기는 법. `Array.from`은 IE에서 구현되지 않았다. 문제를 해결하려면 `Array.from`의 **폴리필**을 사용해야 되는데 이 **폴리필**의 사이즈가 작은 편이 아니니 다른 방법을 쓰자.

```js
const reds = document.querySelectorAll('.red')

const redsArr = Array.prototype.slice.call(reds)
redsArr.map(red => console.log(red))
```

`reds`를 `slice` 메소드에 주고 실행시킨다. 그러면 리스트에 대해 얕은 복사본을 만들어 배열로 반환하기 때문에 배열을 받을 수 있다. 이 방법은 매우 낮은 버전의 IE에서도 동작하기 때문에 `Array.from`의 대체재로 사용할 수 있다.

### Codepen example

포스트에 사용된 예제를 여기서 확인할 수 있다.

<https://codepen.io/n2ptune/pen/BaoWXRb>

## 참고

- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [https://developer.mozilla.org/ko/docs/Web/API/NodeList](https://developer.mozilla.org/ko/docs/Web/API/NodeList)
- [https://developer.mozilla.org/ko/docs/Web/API/NodeList](https://developer.mozilla.org/ko/docs/Web/API/NodeList)
- [https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)
- [https://devsoyoung.github.io/posts/js-htmlcollection-nodelist](https://devsoyoung.github.io/posts/js-htmlcollection-nodelist)
- [https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/](https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/)
