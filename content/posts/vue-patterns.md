---
title: Vue 컴포넌트 디자인 패턴
date: 2021-12-13T13:51:51.568Z
published: false
tags: ['vue']
cover_image: 
description: Vue 컴포넌트를 작성할 때 사용할 수 있는 여러가지 디자인 패턴에 대해서 정리하고 학습하기
---

## Vue 컴포넌트 디자인 패턴

사실 [공식 홈페이지](https://kr.vuejs.org/v2/guide/single-file-components.html)에서 권장하는 디자인 패턴은 SFC(Single File Component)라는 것으로 한 파일에 HTML, CSS, 자바스크립트를 모두 작성하는 패턴을 말한다. 때로는 공식 홈페이지에서 권장하는 방법이 적합하지 않는 상황이 있지만 일반적인 상황에서 위와 같은 패턴을 사용하길 권장한다. 이번에는 SFC가 적합하지 않은 상황에 처했을 때 선택할 수 있는, Vue로 작성 가능한 컴포넌트 디자인 패턴에 대해서 정리한다.

## Single File Component

공식적으로 권장하는 디자인 패턴 방식이다. 위에서 정리했듯 `.vue` 확장자를 가진 파일 안에 HTML, CSS, 자바스크립트 이 3가지를 모두 집어넣는 방식이다. 각각의 영역을 나누는 방법은 HTML에서 잘 써왔던 태그를 통해 각자의 영역을 나눈다. HTML의 경우 `<template>`으로 시작하는 태그로 영역을 나누고, 자바스크립트는 `<script>` 그리고 CSS는 `<style>` 태그로 시작하여 영역을 나눈다.

왜 이런 방식을 권장할까? Vue가 이런 방식을 도입해서 해결하려는 문제가 여러가지 있다.

1. HTML의 구문 강조와 문자열로만 이루어진 HTML 구조 혹은 문자열 템플릿
2. HTML과 자바스크립트는 컴포넌트로 모듈화 되어있으나 CSS 등의 관리가 어려움 (앵귤러를 말하는듯)
3. HTML 전처리기 지원 안함 (Pug 등)

**1번**의 경우 HTML을 자바스크립트에서 문자열(따옴표나 백틱)로 작성할 경우 구문 강조가 제대로 되지 않고 복잡한 템플릿을 작성하는 경우 디버깅이 어려워진다는 문제를 갖고 있다. Vue에서 온전히 자바스크립트 파일만을 가지고 컴포넌트를 구성해야할 때에는 템플릿을 따옴표나 백틱으로 감싼 문자열로 작성해야 한다.

**2번**은 위와 마찬가지다. 자바스크립트 파일로 Vue 컴포넌트를 구성할 때에 CSS 파일을 관리하기 어렵다.

**3번**의 경우 잘 쓰이진 않지만 HTML에 대한 전처리기 지원이 미흡한 부분을 SFC 패턴을 통해 해결한다.

```html
<template>
  <div class="counter">
    {{ counter }}
  </div>
</template>

<script>
export default {
  data: () => ({
    counter: 0
  })
}
</script>

<style scoped>
.counter {
  color: red;
}
</style>
```

위와 같이 3단 영역으로 HTML, 자바스크립트, CSS를 한 파일에서 작성할 수 있고 한 파일은 한 컴포넌트를 뜻하므로 HTML과 자바스크립트, CSS를 하나의 모듈처럼 관리할 수 있게 된다.

### 문자열 템플릿

```js
Vue.component('counter', {
    template: `
      <div class="counter">
        {{ counter }}
      <div>
    `,
    data: () => ({
      counter: 0
    })
  }
})
```

온전히 자바스크립트 파일로 컴포넌트를 구성할 때 아까 정리했던 단점들이 나온다. 템플릿은 단순히 문자열로 `vue-loader` 및 `vue-template-compiler` 등으로 처리되기 때문에 문자열 안에 HTML의 구문 강조나 디버깅이 지원되지 않는다.

스타일 파일의 경우도 마찬가지다. 이 경우 CSS 파일을 자바스크립트에서 `import`할 수 있도록 번들러 옵션을 구성하거나 전역적으로 `import`하도록 구성해야 한다. 이런 경우 `counter` 클래스를 가진 모든 엘리먼트가 `import` 된 스타일 파일에 의해 스타일이 입혀진다.

### vue-class-component

타입스크립트 지원이 제대로 되지 않는 Vue 2 기반 프로젝트에서 조금 더 나은 타입스크립트 개발 경험을 제공하기 위해 나온 [오픈소스](https://class-component.vuejs.org/)이다. SFC 패턴을 사용하는 것은 일치하지만 타입스크립트의 데코레이터를 적극 사용해 더 나은 타입스크립트 경험을 제공한다.

```tsx
<template>
  <div>
    <button v-on:click="decrement">-</button>
    {{ count }}
    <button v-on:click="increment">+</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the component in class-style
@Component
export default class Counter extends Vue {
  // Class properties will be component data
  count = 0

  // Methods will be component methods
  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }
}
</script>
```

이 외에 `@Prop` 데코레이터 및 제공하는 많은 데코레이터를 통해 `props`를 타이핑하게 하거나 함수의 리턴 타입을 추론하는 등의 자바스크립트 기반 Vue 2 프로젝트에선 어려운 일을 도와준다.

## 컴포넌트 의사소통