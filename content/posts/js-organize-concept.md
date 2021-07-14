---
description: 자바스크립트 기본 개념인 호이스팅, 이벤트 버블링, 스코프 등을 이해하고 정리하기
cover_image:
tags: ['javascript']
published: true
date: 2020-04-02
title: 자바스크립트 기본 개념(호이스팅, 이벤트 버블링 기타 등) 이해하고 정리하기 (js-organize-concept)
---

## 자바스크립트 기본 개념

자바스크립트는 타 언어와 비교했을 때 다양한 특색이 존재한다. 브라우저에서 작동될 때 최상위 객체로부터 하위 이벤트까지 이벤트가 전파되는 **이벤트 캡처링**, 하위 이벤트로부터 최상위 객체까지 이벤트가 전파되는 **이벤트 버블링** 등 다양한 특징을 가지고 있으며 이 포스트에서 하나씩 짚어가며 이해하고 정리한다.

## 호이스팅(Hoisting)

다음과 같은 코드가 있다.

```js
function sum(a, b) {
  return a + b
}

var sumOneAndTwo = sum(1, 2)
// sumOneAndTwo: 3
```

매우 간단하고 **호이스팅**을 테스트 해보기 좋은 코드다. 위의 코드는 언뜻 보기에도 아무 문제가 없이 실행될 것이고 a, b 값에 각각 1과 2가 전달되었으므로 3을 반환할 것이다. 예상 결과 값을 반환하며 `sumOneAndTwo` 변수에는 3이 담기게 된다.

함수를 선언한 뒤에 함수를 실행하는 코드를 작성해서 함수를 호출하는 것이 일반적인데, 자바스크립트에서는 다른 방법으로 함수를 선언하고 호출할 수 있다.

```js
var sumOneAndTwo = sum(1, 2)

function sum(a, b) {
  return a + b
}

// sumOneAndTwo: 3
```

처음 예제와 마찬가지로 위의 코드 또한 정상적으로 동작한다. 함수 호출을 함수 선언보다 먼저했는데 함수가 정상적으로 호출이 된다. 타 언어에서는 이런 코드를 실행할 수 없다.

```python
a = something()

def something():
  return 1

  a = something()

# Traceback (most recent call last):
# File "main.py", line 1, in <module>
#   a = something()
# NameError: name 'something' is not define
```

위는 파이썬 코드다. 예상했듯이 `something` 이라는 함수는 함수 호출 뒤에 선언되었기 때문에 함수를 호출할 때, 그 함수는 선언되지 않았다고 오류를 뿜는다. 타 언어에서는 이러한 결과가 일반적이기 때문에 자바스크립트에서 위와 같은 맥락으로 코드를 작성할 때 황당할 수도 있다.

자바스크립트 함수만 이런 것이 아니라 변수에도 이 기능이 작동한다.

```js
a = 'Hello ' + typeof a
console.log(a)

// Hello undefined
```

위의 코드는 정상적으로 동작한다. 보통 자바스크립트에서 변수를 선언하고 초기화할 때는 `var`, `let`, `const` 키워드를 이용해서 변수를 선언하거나 초기화한다. 하지만 여기서는 세개의 키워드 중 하나도 쓰지 않고 대입 연산자로만 변수에 문자열을 담았다. 하지만 a를 선언한 적도 없는데 `typeof a`를 실행했을 때 변수 `a`의 타입을 어떻게 알아낼 수 있었을까?

자바스크립트에서 모든 변수는 선언할 때 값을 지정하지 않으면 `undefined`가 된다. 위의 코드에서는 자바스크립트에 의해 변수 `a`의 선언을 최상단에 끌어올린다. 바로 `호이스팅`이 일어나는 것이다. 변수에 값을 할당하는 것은 `호이스팅`이 일어나지 않으며 오직 선언만 최상단으로 끌어올린다.

`var a;` 구문이 최상단으로 끌어올려졌으니 `a`의 값은 아무 값도 초기화 하지 않았으므로 `undefined`가 된다. 그 결과로 `typeof a`는 `'undefined'`가 된다.

### 함수 선언문과 표현식

```js
something()
something2()

function something() {
  console.log("i'm something function")
}

var something2 = function () {
  console.log("i'm something2 function")
}
```

위의 코드는 에러가 발생한다. `something` 함수는 이 함수 자체를 선언했기 때문에 이 함수 선언문 자체가 최상단으로 호이스팅 되지만 아래는 함수 표현식이기 때문에 그 뒤에 함수의 내용까지 끌어올리지 않는다. 위 코드를 호이스팅이 일어나는 과정을 통해 살펴보면 아래와 같다.

```js
// 호이스팅이 일어나 최상단으로 끌어올림
function something() {
  console.log("i'm something function")
}
// 호이스팅이 일어났지만 선언문만 끌어올렸음
var something2

something()
something2() // TypeError: something2 is not a function

something2 = function () {
  console.log("i'm something2 function")
}
```

호이스팅 과정을 살펴볼 때, 함수를 선언한 `something` 함수는 최상단으로 끌어올려지고, 변수에 함수를 대입하는 표현식을 사용했을 때는 선언문만 호이스팅이 일어나므로 `var something2`와 같이 선언문만 상단으로 끌어올려졌다. 런타임 시점에서 `something2`는 `undefined`이므로 `something2()`에서 구문 오류가 발생한다.

### 중첩 함수 내에서 함수 선언문 / 함수 표현식

중첩 함수 내에서도 위와 마찬가지로 동일한 호이스팅이 일어난다.

```js
function something() {
  var text = 'something ' + somethingInner()

  function somethingInner() {
    return 'somethingInner'
  }

  return text
}

var _ = something() // 'something somethingInner'
```

`something` 함수 내에 `somethingInner` 함수가 선언된 중첩 함수 구조다. 이 구조에서도 `somethingInner`가 함수 내부의 최상단에 끌어올려지므로 `text` 변수에 함수의 결과 값을 담는건 유효한 구문이다.

```js
function something() {
  var text = 'something ' + somethingInner() // TypeError: somethingInner is not a function

  var somethingInner = function () {
    return 'somethingInner'
  }

  return text
}

var _ = something() // 'something somethingInner'
```

위에서 살펴본 것과 같이 함수를 선언해서 사용한 것이 아닌 변수에 함수를 담는 함수 표현식을 사용했을 경우에는 `var somethingInner;` 꼴로 상단에 끌어올려지므로 `undefined`가 되서 함수로 사용할 수 없다.

## 이벤트 버블링과 이벤트 캡처링

이벤트 버블링이란 중첩된 요소가 있을 때 제일 하위의 요소로부터 최상위 요소까지 이벤트가 전파되는 걸 말하고, 캡처링은 그 반대로 최상위 요소로부터 하위 요소까지 이벤트 전파가 이루어지는 걸 말한다.

```html
<div class="container">
  <div class="depth-1">
    <div class="depth-2">
      <div class="depth-3">
        Last Depth
      </div>
    </div>
  </div>
</div>
```

중첩된 구조를 구현한다. 총 3개의 중첩된 요소가 있으며 이들을 묶는 컨테이너 요소가 있다. 중첩된 요소로 보이기 위해서 스타일을 지정한다.

```scss
.container {
  width: 400px;
  height: 400px;

  & .depth-1 {
    width: 200px;
    height: 200px;
    background-color: red;
    & .depth-2 {
      width: 150px;
      height: 150px;
      background-color: blue;
      & .depth-3 {
        width: 100px;
        height: 100px;
        background-color: green;
      }
    }
  }
}
```

각각의 크기와 바탕색을 다르게 한다. 위와 같이 지정하면 아래와 같은 구성으로 나오게 된다.

![depth example](./images/depth-example.png)

위 구성요소는 전부 중첩되어 있고 컨테이너 요소로부터 총 3개의 요소가 있다. 각각의 요소에 클릭 이벤트를 넣어본다.

```js
// prettier-ignore

function generateEvent(isCapturing) {
  const tags = [
    document.querySelector('.container'),
    document.querySelector('.depth-1'),
    document.querySelector('.depth-2'),
    document.querySelector('.depth-3')
  ]

  tags.forEach(el => {
    el.addEventListener('click', function(e) {
      console.log(el.className)
    }, isCapturing)
  })
}

generateEvent()
```

이 예제 코드에서 클래스가 `depth-3`인 클래스 요소를 클릭하면 그 외 모든 요소들의 클릭 이벤트가 발생한다. 이때 `depth-3` 요소 이벤트가 먼저 발생하고 그 뒤에 차례로 `depth-2`, `depth-1`, `container` 요소의 이벤트들이 작동한다. 하위 요소에서 상위 요소로 올라가는 걸 보고 **이벤트 버블링**이라고 한다.

이벤트 버블링을 조작하기 위해서는 `addEventListener`에 이벤트 함수를 전달할 때 세번째 인자로 `Boolean` 값을 주면 된다. 기본 값은 `false`며 `true`를 주게되면 **이벤트 캡처링**이라는 흐름대로 상위 요소부터 하위 요소까지 이벤트가 차례로 실행된다.

예로 위의 코드에서 `depth-2`를 클릭하면 `depth-2`와 그 상위 요소가 차례로 실행되며 캡처링은 그 반대로 실행된다. `generateEvent` 함수에 인자를 `true`로 주게 되면 캡처링이 발생하는 걸 볼 수 있다.

### Codepen Example

<https://codepen.io/n2ptune/pen/NWqmpVJ?tabs=js,result>

(예제에서는 캡처링의 흐름대로 실행되고 확인하기 위해 `alert`을 이용했다)

## 접근 범위(Scope, 범위)

변수나 함수를 사용하려면 유효한 범위 내에서 사용해야 한다. 예를 들어 `window` 객체는 전역 객체이므로 브라우저 어디에서나 사용할 수 있다. 어딘가 전역으로 선언되었기 때문에 사용할 수 있는 것이다.

### 전역 범위

어디에서나 사용할 수 있는 변수나 함수를 말한다. 예를 들어 어떤 자바스크립트 파일에 다음과 같은 변수와 함수가 있다고 가정하자.

```js
const globalObject = { name: 'global' }

function something() {
  const text = 'something'
  console.log(text, globalObject.name)
}

something()
// 'something global'
```

`something` 함수 범위 내에 `globalObject`를 선언하지 않았는데 사용이 가능하다. 이처럼 함수 바깥쪽에 선언되면 이 파일안에서 어떤 함수를 선언하더라도 그 함수 내에서 `globalObject`를 사용할 수 있다.

### 지역 범위

위 예제에서 `something` 함수 내부에 `text` 변수는 지역 범위 변수이다. 그렇기 때문에 외부에서 접근하는 것이 불가능하다. 어떤 블록 내에서 변수가 선언되면 그 변수의 범위는 지역 범위로 한정된다. 지역 범위 내에서 중첩된 함수에 의해 사용이 가능하지만 외부에서는 사용이 불가능하다.

```js
function something() {
  const someNumber = 1
  somethingInner()

  function somethingInner() {
    const someNumberInner = someNumber + 2 // 지역 범위 내이므로 사용이 가능하다
    somethingInnerDepth()

    function somethingInnerDepth() {
      const someNumberDeep = someNumber + someNumberInner // 마찬가지로 사용이 가능
    }
  }
}

something()
console.log(someNumberDeep) // ReferenceError: someNumberDeep is not defined
```

위의 예제에서 보듯 지역 범위 내에서만 사용 가능한 변수를 외부에서 참조하게 되면 에러가 발생한다. 지역 범위 내에서 사용되고 소멸되기 때문에 외부 변수에서는 접근할 수 없다.

### var, let, const

`let`과 `const` 키워드가 만들어지기 전까지는 `var`가 많이 쓰였다. (아직도 많이 쓰인다) `var`가 두 키워드에 비해 어떤 특징을 가지는지 정리한다.

```js
if (true) {
  var scope = 12345
} else {
  var scope = 67890
}

console.log(scope)
// 12345
```

예상 결과인 `undefined`를 뒤집어 엎고 12345가 출력이 됬다. 보통 스코프라고 하면 {로 시작해서 }로 끝나는 부분 까지를 지역 스코프라 생각하기 쉬운데, `var`는 조금 특별하다. 가장 가깝게 `function` 키워드로 선언된 함수에서는 사용이 가능하다. 그 함수의 스코프를 벗어나게 되면 더이상 사용이 불가능하다. 하지만 `function` 키워드 이외에 블록 단위 키워드(if, for, while, switch 등)에서 선언된 변수를 바깥에서 사용할 수 있다.

```js
var f = []

for (var i = 0; i < 5; i++) {
  f[i] = function () {
    return i
  }
}

console.log(f[0]()) // 기댓값: 0
console.log(f[1]()) // 기댓값: 1

// 실제로는 5, 5가 출력 된다.
```

배열에 함수를 담고 그 함수는 어떤 값을 반환하는데 그 값을 for문을 돌고있는 i값으로 지정한다. 0, 1, 2, 3, 4, 5 값이 반환되는 걸 기대했지만 모두 5만 출력된다. 이 함수는 배열에 담길 때 i의 값을 기억하고 있지 않고 실행될 시점에 i값을 반환한다. 5개의 익명함수 중 i를 참조할 때 i의 값은 전부 5를 가리키기 때문에 5를 반환한다.

```js
var f = []

for (let i = 0; i < 5; i++) {
  f[i] = function () {
    return i
  }
}

console.log(f[0]()) // 기댓값: 0
console.log(f[1]()) // 기댓값: 1
console.log(f[2]()) // 기댓값: 2
console.log(f[3]()) // 기댓값: 3
console.log(f[4]()) // 기댓값: 4

// 0, 1, 2, 3, 4
```

`var`에서 `let`으로 키워드만 바꿔도 기대했던 값들이 나온다. `let` 키워드는 반복문에서 새로운 값을 생성해 i에 대입하므로 기대했던 값이 나온다.

## 참고

- [https://ko.javascript.info/bubbling-and-capturing](https://ko.javascript.info/bubbling-and-capturing)
- [https://www.bangseongbeom.com/javascript-var-let.html](https://www.bangseongbeom.com/javascript-var-let.html)
