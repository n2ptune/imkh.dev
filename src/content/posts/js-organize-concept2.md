---
description: 자바스크립트 기본 개념인 프로토타입, Shadow DOM 등을 이해하고 정리하기
cover_image:
tags: ['javascript']
published: true
date: 2020-04-03
title: 자바스크립트 기본 개념(프로토타입, Shadow DOM) 이해하고 정리하기 (js-organize-concept)
---

자바스크립트 기본 개념(프로토타입, Shadow DOM)에 대해 설명한다. 호이스팅과 이벤트 버블링, 스코프를 참고하려면 [여기](https://imkh.dev/js-organize-concept)에서 참고한다.

## 프로토타입

### 자바스크립트 객체 생성 방법

일반적으로 객체를 생성하는 방법에 **리터럴**방식이 있다. 변수에 중괄호로 감싼 객체를 대입하면 객체가 생성된다.

```js
const animal = {
  name: 'Jerry'
}

console.log(animal.name)
// Jerry
```

매우 많이 사용하는 방법이며 거의 객체가 이런 식으로 생성된다. 중괄호에 아무 것도 넣지 않으면 **Empty Object(빈 객체)**가 생성된다. 하지만 자바스크립트 엔진은 객체 리터럴 구문을 만나면 내부적으로 생성자 함수를 사용해서 객체를 생성시킨다.

```js
const animal = {
  name: 'Jerry'
}

const animal2 = new Object()
animal2.name = 'Tom'

console.log(animal.name, animal2.name)
// Jerry Tom
```

`new Object`를 사용하여 객체를 생성하는 법이 있고, 객체 리터럴을 이용해서 사용하는 방법이 있는데 리터럴을 사용하는 방법이 훨씬 많이 쓰인다라고 알고 있으면 된다.

### 생성자 함수 만들기

서로 똑같은 속성을 가지는 객체를 리터럴이나 Object 생성자 함수를 이용해서 매번 객체를 만들어내는 건 매우 불편하다. 그래서 어떤 일정한 속성을 가지는 객체를 만들어내는 함수를 만들 수 있다.

```js
function Animal(name, age) {
  this.name = name
  this.age = age
  this.info = () => console.log(name, age)
}

const jerry = new Animal('Jerry', 1)
const tom = new Animal('Tom', 2)

jerry.info()
tom.info()

// Jerry 1
// Tom 2
```

`Animal`은 생성자 함수다. 2개의 매개변수를 받아 `name`, `age`, `info` 속성을 지정한다. `new` 연산자를 통해 함수를 호출하면 자바스크립트는 이 함수를 생성자 함수로 이해하고 동작시킨다. 이 함수는 매개변수로 주어진 데이터에 의해 인스턴스가 만들어지고 그 인스턴스가 반환되어 변수에 저장된다.

이 생성자 함수에서 사용된 속성들은 외부에서 참조가 불가능하다.

### 프로토타입과 객체 생성

클래스 기반의 객체 지향 프로그래밍에서는 클래스나 인터페이스를 만들어 상속받는 클래스 혹은 구현한 클래스를 만들어 사용할 수 있다. 자바스크립트에서도 클래스를 ES6부터 사용할 수 있게 되었지만 이는 타 언어의 클래스와 똑같지 않다.

프로토타입은 나는 클래스로 이해하려고 한다. 서로 다르겠지만 프로토타입을 모르고 클래스를 조금 아는 입장에서는 프로토타입을 클래스로 이해하면 조금 이해하기 쉬울 것 같다.

```js
const sample = {
  sp: '1'
}
```

간단하게 생성된 하나의 객체가 있다. 이 객체는 속성이 단 한가지만 지정했다. 하지만 다음과 같은 명령이 가능하다.

```js
// hasOwnProperty 함수는 매개변수로 전달된 속성이 있는지 확인하고 true/false를 반환한다.
console.log(sample.hasOwnProperty('sp'))
// true
```

객체에서 만든 적 없던 `hasOwnProperty`을 사용할 수 있다. 이유는 리터럴로 생성된 `sample` 객체의 프로토타입이 `Object`이기 때문이다. 이 객체에 `hasOwnProperty` 라는 속성이 정의되어 있다. `sample`은 이 `Object`의 기능들을 상속받기 때문에 이러한 기능을 사용할 수 있게 된다.

모든 객체는 자신의 프로토타입을 가리키는 `[[Prototype]]` 내부 속성이 있으며 `prototype` 속성은 함수 객체만 가진다.

객체 리터럴로 생성된 모든 객체는 프로토타입이 `Object`다. 하지만 생성자 함수를 이용해서 만든 인스턴스의 프로토타입은 어떻게 될까? 그리고 그 생성자 함수의 프로토타입은 누굴까?

```js
function Animal(name, age) {
  this.name = name
  this.age = age
}

const a = new Animal('Cat', 2)
const b = {}
const c = {}

console.log(a.__proto__ === b.__proto__)
// false
console.log(b.__proto__ === c.__proto__)
// true
```

객체 리터럴로 생성한 변수 b와 생성자 함수로 생성된 변수 a의 프로토타입은 갖지 않다. a의 프로토타입은 Animal이다. Animal의 프로토타입은 함수 객체이고 Animal의 `prototype` 속성을 확인해본다.

```js
console.log(Animal.prototype)
// {constructor: ƒ}
// constructor: ƒ Animal(name, age)
// arguments: (...)
// caller: (...)
// length: 2
// name: "Animal"
// prototype: {constructor: ƒ}
// __proto__: ƒ ()
// [[FunctionLocation]]: VM75:8
// [[Scopes]]: Scopes[4]
// __proto__:
// constructor: ƒ Object()
// __defineGetter__: ƒ __defineGetter__()
// __defineSetter__: ƒ __defineSetter__()
// hasOwnProperty: ƒ hasOwnProperty()
// __lookupGetter__: ƒ __lookupGetter__()
// __lookupSetter__: ƒ __lookupSetter__()
// isPrototypeOf: ƒ isPrototypeOf()
// propertyIsEnumerable: ƒ propertyIsEnumerable()
// toString: ƒ toString()
// valueOf: ƒ valueOf()
// toLocaleString: ƒ toLocaleString()
// get __proto__: ƒ __proto__()
// set __proto__: ƒ __proto__()
```

이 함수의 프로토타입은 이 함수를 통해 생성되는 객체의 프로토타입을 가리킨다.

### 정리

- 모든 객체는 자신의 부모 역할을 하는 프로토타입을 가진다.
- 객체의 프로토타입을 확인하는 방법은 `__proto__` 속성을 확인한다.
- 함수가 생성자로 사용될 때 `prototype` 속성은 이 함수를 통해 생성될 프로토타입을 가리킨다.
- 생성자 함수로 생성된 인스턴스는 일반 객체를 생성해서 만든 객체의 프로토타입과 같지않다.

## Shadow DOM

많은 페이지들을 보다보면 어떤 기업의 페이스북 페이지 좋아요 수나 이 글을 페이스북에 공유하기 이런 버튼을 많이 보았다. 이런 버튼들은 자칫 잘못하면 다른 스타일과 겹쳐 의도치않은 스타일이 입혀질 수 있는데 어떤 방법으로 모두 동일하게 보이게 될까 궁금했던 적이 있었다.

![facebook-share-example](/images/example-shadow-dom.png)

이런 버튼들이 `iframe` 요소를 이용해 만들어졌다는 걸 안게 비교적 최근이다. 실제로 이런 `iframe` 요소가 삽입되면 이 요소 안에 HTML 문서로 보이는 문서가 삽입된다.

![facebook-share-example2](/images/example-shadow-dom2.png)

이런 방법이 HTML 문서 내 글로벌로 적용된 스타일에 영향받지 않고 따로 스타일을 구현할 수 있는 방법이라고 한다. 하지만 이런 방법에는 [사용하면 안되는 여러가지 이유](https://syudal.tistory.com/entry/html-iframe%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80-%EB%A7%90%EC%95%84%EC%95%BC-%ED%95%A0-%EC%9D%B4%EC%9C%A0-%EB%8B%A8%EC%A0%90)가 존재한다.

**Shadow DOM**은 이런 `iframe` 요소에 의존할 필요 없이 위의 페이스북 버튼같은 캡슐화가 필요한 요소를 위해 만들어졌다고 한다.

### iframe 대체하기

`iframe`을 **Shadow DOM**으로 대체하면서 실행하는 예제, 먼저 간단한 태그들을 몇개 만든다.

```vue
<div class="shadow-container">
  <button class="primary">Primary</button>
</div>
```

컨테이너 안에 버튼이 한개 있고 그 버튼에 Primary라는 텍스트를 넣는다. 아주 간단한 버튼 한개가 생성되었다. 여기서 자바스크립트를 몇개 추가하여 **Shadow Tree**로 만든다. (버튼은 Shadow Root로 바뀌게 되면 보이지 않는다는 걸 보여주기 위해서 삽입한 것이므로 없어도 됨)

```js
const shadowContainer = document.querySelector('.shadow-container')
const shadowDOM = shadowContainer.attachShadow({ mode: 'open' })
```

컨테이너 요소를 선택하고 이 요소의 `attchShadow` 메서드를 사용하면 컨테이너 안에 빈 **Shadow Root**를 생성한다.

![example-shadow-dom](/images/example-shadow-dom3.png)

보는 바와 같이 더이상 HTML 문서에서 버튼이 보이지 않게 변했고, 개발자 도구로 열어보니 컨테이너 안에 새로운 **Shadow Root**가 생겼다. 이 공간은 **Shadow DOM**의 시작점이다. 기본 HTML 문서가 `<html>`로 시작해서 `</html>`로 끝난다면 이 **Shadow Root**는 시작점을 의미한다.

이 Shadow Root에 여러가지 DOM 요소들을 만들어서 넣는다.

```js
const button = document.createElement('button')

button.classList.add('primary')
button.innerText = '페이스북에 공유하기'
shadowDOM.appendChild(button)
```

간단하게 버튼을 하나 만들고 클래스를 `primary`로 하나 추가한 뒤에 텍스트를 '페이스북에 공유하기'로 넣고 **Shadow Root**에 일반적인 DOM 요소를 이어 붙이는 것 처럼 `appendChild` 메소드를 이용해서 이어붙인다. 이렇게 되면 기존의 HTML 문서에 영향받지 않은 버튼이 한개 튀어나온다. 이제 여기에 스타일을 입힌다.

```js
const styles = document.createElement('style')

styles.textContent = `
.primary {
  border: none;
  border-radius: 5px;
  padding: 4px 6px;
  color: white;
  background-color: blue;
  font-size: 11px;
}
`

shadowDOM.appendChild(styles)
```

스타일을 조금 입히고 마찬가지로 `appendChild` 메소드를 이용해서 **Shadow Root**에 이어붙인다.

![example-shadow-dom4](/images/example-shadow-dom4.png)

버튼이 한개 튀어나왔다. 이제 원래 HTML 문서에서 이와 똑같은 클래스 선택자로 스타일을 입혀본다.

```css
.primary {
  background-color: red !important;
}
```

요지부동이다. 완벽히 일반 HTML 문서와 분리된 것 처럼 적용된다. `iframe`의 많은 단점이 보완된 것 같다.

### Shadow DOM 정리

`iframe`을 대체해서 **Shadow DOM**으로 만들어 단점을 보완했고 이게 일반적인 DOM과 다르지 않다는 걸 알게 됬다. 페이스북에 공유하기 등 전역적으로 등록된 스타일에 영향을 받지 않고 배포를 해야 된다면 어떤 태그를 하나 삽입하는 자바스크립트를 실행해서 그 태그를 **Shadow DOM**으로 만들고 위의 방법을 사용하면 되겠다.

## 참고

- [https://poiemaweb.com/js-prototype](https://poiemaweb.com/js-prototype)
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [https://wit.nts-corp.com/2019/03/27/5552](https://wit.nts-corp.com/2019/03/27/5552)
- [https://c10106.tistory.com/2676](https://c10106.tistory.com/2676)
- [https://developers.facebook.com/docs/plugins/share-button?locale=ko_KR](https://developers.facebook.com/docs/plugins/share-button?locale=ko_KR)
