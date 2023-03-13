---
description: CSS의 사용자 지정 속성을 변경하여 CSS에서 사용할 수 있는 변수를 만드는 법
cover_image: /images/css-variables-thumbnail.png
tags: ['javascript', 'css']
published: true
date: 2020-03-17
title: CSS에서 변수 사용하기 (use-variables-in-css)
---

## CSS에서 변수

자바스크립트나 타 프로그래밍 언어에서 변수란 언제든 변할 수 있는 수를 말한다. 그 변수에 의해 어떤 동작이 바뀔 수 있고 표현식이 바뀔 수 있고 변수에 의해 다른 변수가 바뀔 수도 있다.

그렇다면 CSS에서 변수는 뭘 의미할까. 가령 `width` 속성이 여러 HTML 원소에서 똑같은 값으로 반복이 된다면 그 값은 변수로 대체될 수 있다.

여기에서 오는 이점은 변수 하나로 HTML 원소가 100개라면 100개의 원소 스타일을 직접 변경하지 않고 변경할 수 있다. 만약 100개의 원소가 모두 공통된 클래스나 아이디로 묶여있다면 선택자로 간단하게 바꿀 수 있지만 그렇지 않을 때도 있다.

CSS에서 변수는 픽셀을 지정하거나 색을 지정하거나 그 외에 모든 것을 지정할 수 있다.

## 변수를 지정하고 사용해보기

```vue
<div class="container">
  <div class="one"></div>
  <div class="two"></div>
  <div class="three">
    <div class="three-one"></div>
  </div>
</div>
```

컨테이너 안에 여러개의 원소가 들어가있고 중첩된 원소도 존재한다. 이 원소들의 스타일을 지정한다.

```css
.container {
  display: flex;
  justify-content: center;
}
.one {
  width: 60px;
  height: 70px;
  border-radius: 50%;
  background-color: red;
}
.two {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: red;
}
.three {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: red;
}
.three .three-one {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: red;
  display: block;
}
```

각각 너비와 높이가 다르게 설정했고 컨테이너는 플렉스로 지정했다. 실제로는 이렇게 스타일을 하지 않으니 참고할 것.

컨테이너 안의 모든 원소는 분명 공통된 부분이 존재한다. `border-radius` 속성과 `background-color` 속성이 4개의 원소 모두에 중복된다.

만약 이렇게 중복된 부분을 모두 수정해야 한다면? 그리고 이 중복된 부분이 4개가 아니라 500개라면? 애초에 그런 구조를 만들지 않는게 중요하겠지만 만들다보면 이렇게 늪에 빠질 때가 종종 있다.

이럴 때, **변수**를 사용해서 4개의 원소에 중복된 부분을 한번에 변경할 수 있도록 만들어본다.

```css
:root {
  --element-radius: 50%;
  --element-back-color: red;
}
.container {
  display: flex;
  justify-content: center;
}
.one {
  width: 60px;
  height: 70px;
  border-radius: var(--element-radius);
  background-color: var(--element-back-color);
}
.two {
  width: 100px;
  height: 100px;
  border-radius: var(--element-radius);
  background-color: var(--element-back-color);
}
.three {
  width: 200px;
  height: 200px;
  border-radius: var(--element-radius);
  background-color: var(--element-back-color);
}
.three .three-one {
  width: 150px;
  height: 150px;
  border-radius: var(--element-radius);
  background-color: var(--element-back-color);
  display: block;
}
```

주의 깊게 봐야할 부분은 `:root` 부분과 `var` 키워드를 사용한 점.

`:root` 가상 클래스는 문서의 최상단을 가리킨다. 일반적인 HTML 문서에서는 `html` 선택자와 같다. 이 부분에 사용자 지정 변수를 선언하는 것이 매우 유용하게 쓰인다. 위의 예제에서는 사용자 지정 변수를 전역으로 선언하는 것과 같다.

`var` 키워드는 이러한 변수들을 사용하기 위한 키워드다. 지정된 이름으로 괄호 안에 써주면 그 변수의 값으로 치환된다.

위의 예제를 적용하고 실행하면 이전에 리터럴 값을 사용한 것과 같이 동일하게 보여진다. 중요한 점은 변수를 사용해서 스타일 속성에 변수를 대입했다는 점이고 이 변수를 이용해서 다양한 스타일 속성을 조작할 수 있다는 점이다.

- [:root 가상 클래스 브라우저 호환성](https://developer.mozilla.org/ko/docs/Web/CSS/:root#%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%ED%98%B8%ED%99%98%EC%84%B1)

## 상속 관계

`:root` 가상 클래스를 이용해서 선언한 사용자 지정 변수는 어디서나 사용할 수 있다. 변수가 전역적으로 선언됬기 때문이다. 하지만 특정 선택자에서 사용할 변수를 선언할 수도 있다.

```css
.three {
  --element-radius: 20%;
  --element-back-color: green;

  width: 200px;
  height: 200px;
  border-radius: var(--element-radius);
  background-color: var(--element-back-color);
}
.three .three-one {
  width: 150px;
  height: 150px;
  border-radius: var(--element-radius);
  background-color: var(--element-back-color);
  display: block;
}
```

`three` 클래스에 `:root`에 선언된 변수를 오버라이딩했다. 이렇게 미리 선언된 변수를 다시 쓰게되면 해당 변수는 새로 선언된 변수로 덮어씌워진다.

그리고 `three-one` 클래스는 `three`의 자식이다. 서로 상속 관계에 있다. 그렇기 때문에 부모 선택자에서 선언된 변수는 자식 선택자까지 영향을 미친다. `three-one`은 부모와 마찬가지로 모서리가 둥근 도형이고 배경색은 초록색이 되었다.

서로 상속 관계에 있지 않은 `one` 클래스 혹은 `two` 클래스는 `three` 클래스에 선언된 변수에 영향을 받지 않는다. `three` 클래스에서 선언된 변수는 오직 `three` 클래스 자신 혹은 자식들만 사용할 수 있다.

## 대체값

사용자 지정 변수들이 많아지면 그리고 상속 관계가 복잡해지면 좋지 않은 상황이 발생할 수 있다. 유효하지 않은 변수를 사용한다거나 상속 관계에 얽힌 다른 변수를 사용하는 상황이다.

유효하지 않은 변수를 사용할 때, 해당 변수가 유효하지 않은 변수면 그 변수를 대체할 수 있는 대체값을 사용할 수 있다.

```css
.three .three-one {
  width: 150px;
  height: 150px;
  border-radius: var(--element-radius);
  background-color: var(--element-pink-color, pink);
  display: block;
}
```

`background-color` 속성은 `--element-pink-color` 변수로 적용되지만 이 변수는 유효하지 않은 변수다. (존재하지 않는 변수) 이럴 경우 이 속성은 부모에게 상속받은 값으로 바뀐다. `var` 함수의 두번째 매개변수로 대체값을 지정할 수 있다.

`--element-pink-color` 라는 변수는 없는 변수이기 때문에 `pink`색으로 대체된다.

## 자바스크립트로 변수 조작

자바스크립트로 사용자 지정 변수를 가져오거나 새로 쓰는 것이 가능하다.

```js
const three = document.querySelector('.three')

const radius = getComputedStyle(three).getPropertyValue('--element-radius')
const backColor = getComputedStyle(three).getPropertyValue(
  '--element-back-color'
)
console.log(radius, backColor)

// output: " 20%" " green"
```

`getComputedStyle` 전역 함수를 사용하거나 DOM `style` 속성의 `getPropertyValue` 함수를 사용해도 된다.

사용자 지정 변수를 새로 작성하는 것은 `style` 속성의 `setProperty` 함수를 사용한다.

```js
const three = document.querySelector('.three')

three.style.setProperty('--js-new-color', 'pink')
console.log(three.style.getPropertyValue('--js-new-color'))

// output: "pink"
```

새로이 쓰여진 변수는 당연히 CSS에서도 사용이 가능하다. 이렇게 동적으로 변수들을 자바스크립트로 만들어내는 것 또한 가능하다.

## Codepen 예제

<https://codepen.io/n2ptune/pen/zYGjbNj>

위의 Codepen 예제를 확인할 수 있다.

## 참고

- [https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
- [https://www.codingfactory.net/11017](https://www.codingfactory.net/11017)
- [https://developer.mozilla.org/ko/docs/Web/CSS/:root](https://developer.mozilla.org/ko/docs/Web/CSS/:root)
