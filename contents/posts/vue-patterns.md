---
title: Vue 컴포넌트 디자인 패턴
date: 2021-12-13T13:51:51.568Z
published: true
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

```vue
<template>
  <div class="counter">{{ counter }}</div>
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

```js
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

부모가 자식에게 `props`를 내려주어 자식은 부모의 `state`에 접근할 수 있게된다. 자식 컴포넌트에서 직접 `props`를 변경할 수 없으므로 자식 컴포넌트의 어떤 이벤트때문에 부모 컴포넌트의 `state`가 변경되어야 한다면 `emit`을 이용해 자식 컴포넌트에서 부모에게 이벤트를 전달할 수 있다.

부모 컴포넌트에서 `ref` 객체를 이용해 자식 컴포넌트의 `state`에 접근하거나 자식 컴포넌트의 함수를 실행시키거나 핸들링할 수 있게 된다.

### props

#### 자식 컴포넌트에서 props 사용

부모에게 받은 `props`를 자식 컴포넌트에서 표현한다. 부모가 넘겨주는 `props`의 형태와 자식 컴포넌트에서 받을 수 있는 `props`의 형태에 여러가지 방식이 존재한다. 여기서는 그 방식들을 정리한다.

```js
// 자식 컴포넌트에서
props: ['a', 'b', 'c']
```

자식 컴포넌트에서 받을 `props`를 정의한다. 자식 컴포넌트에서는 `a`, `b`, `c` 세 `props`를 전달받는다.

```js
// 자식 컴포넌트에서
props: {
  a: {
    type: String,
    required: true
  },
  b: {
    type: Number
    required: false,
    default: 1
  },
  c: {
    type: String
    required: true,
    validator (value) {
      return ['c', 'd', 'e'].includes(value)
    }
  }
}
```

받는 `props`는 객체 형태로 작성해서 `props`의 옵션에 대해 구체화할 수 있다. 여기서 `type`이라는 옵션은 `props`가 받을 수 있는 타입을 정의하는데, 원시 타입의 생성자 함수를 넘겨주면 된다. `Number`, `String`, `Object` 꼴로 말이다.

`validator` 옵션은 `props`의 값이 검증이 필요할 때 자주 쓰인다. 여기서 `c`라는 `props`는 문자열 `'c', 'd', 'e'` 중 하나의 값을 가져야 하며 `'f'`라는 값이 오면 콘솔에 에러 메세지가 나온다.

`validator` 옵션에서 컴포넌트 인스턴스인 `this`에 접근하지 못하기 때문에 컴포넌트의 어떤 값에 의존해서 유효성 검증은 불가능하다. 이 경우 `props` 옵션 외 다른 곳에서 유효성 검증을 진행해야 한다.

아래는 `props`가 가질 수 있는 타입 리스트다.

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

```js
// 자식 컴포넌트에서
props: {
  c: {
    type: [Array, Object, String]
  }
}
```

`type` 속성에는 배열을 넣을 수도 있는데, 이는 **여러 타입을 가질 수 있는 `props`**를 뜻한다. 여기서 `c`라는 `props`는 배열이 될 수도 있고, 순수 객체가 될 수도 있고 문자열도 될 수 있다.

```js
// 자식 컴포넌트에서
props: {
  c: {
    type: Array,
    required: false,
    default: [] // 올바르지 않은 방법
  }
}
```

위는 잘못된 예시인데, `default`로 주는 값은 내부적으로 참조하므로 객체(배열이나 말 그대로 객체)의 타입을 가질 때에는 그 객체를 반환하는 함수를 작성해야 한다.

```js
// 자식 컴포넌트에서
props: {
  c: {
    type: Array,
    required: false,
    default: [] // 올바르지 않은 방법
  },
  d: {
    type: Array,
    required: false,
    default: [] // c에서 가지는 default 값과 똑같은 참조
  }
}
```

이런 경우는 컴파일이 아예 안되거나 된다해도 잘 작동되지 않을 텐데, 이 방식이 왜 작동하지 않는지에 대한 [이슈](https://github.com/vuejs/vue/issues/1032)에 대한 토론이 오고갔다. 이 부분은 시키는대로, 아래와 같이 재작성하면 된다.

```js
// 자식 컴포넌트에서
props: {
  c: {
    type: Array,
    required: false,
    default: () => [] // 올바른 방법
  }
}
```

빈 배열을 반환하는 함수를 작성한다. 마찬가지로 `default` 옵션에서는 컴포넌트 인스턴스에 접근할 수 없는데, 때로는 `default` 값에 컴포넌트의 상태 값을 병합시켜 새로운 객체를 만들고 싶을 때가 있다.

```js
// 자식 컴포넌트에서
export default {
  props: {
    optionFromParent: {
      type: Object,
      required: false,
      default: () => ({
        ...this.options, // this에 접근할 수 없음
        someOption: { ... }
      })
    }
  },
  data: () => ({
    options: { ... } // 컴포넌트 인스턴스에 옵션 상태 존재
  })
}
```

위처럼 `default` 옵션에서 `this`에 접근해 컴포넌트의 상태와 `props`가 전달되지 않았을 때 `default` 값을 merge하고 싶을 때가 있는데, 이런 경우는 `this`에 접근하지 못하므로 `computed` 혹은 다른 대안을 찾아야 한다.

```js
// 자식 컴포넌트에서
export default {
  props: {
    optionFromParent: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  computed: {
    mergedOptions () {
      // props와 컴포넌트의 state를 합친 옵션 데이터 반환
      return { ...this.optionFromParent, ...this.options }
    }
  },
  data: () => ({
    options: { ... } // 컴포넌트 인스턴스에 옵션 상태 존재
  })
}
```

원하는 대로 `props`와 `state`의 옵션 모두 합쳐서 반환시킬 수 있다.

#### 부모 컴포넌트에서 props 전달

자식 컴포넌트에서 `props`를 다양하게 사용할 수 있는 것과 비슷하게 부모 컴포넌트에서 자식 컴포넌트로 `props`를 전달하는 방법도 여러가지 존재한다.

```vue
<!-- isOption 이라는 props를 전달 -->
<child-component is-option />
<!-- 카멜케이스로도 가능 -->
<child-component isOption />
```

타입이 `Boolean` 형태이면 위와 같이 작성할 수 있다. Vue 3에서는 카멜 케이스로 `props` 이름을 정의하는 것이 권장되는 것 같은데, 하기 나름이며 한 가지 방식을 정해서 사용하는 것이 깔끔하다. 혼재해서 사용하지 말자

```vue
<child-component :value="parentValue" />

<script>
export default {
  data: () => ({
    parentValue: 2
  })
}
</script>
```

`props` 이름 앞에 콜론을 붙여서 부모 컴포넌트 `state`에 접근할 수 있다.

```vue
<child-component v-bind:value="parentValue" />
```

원래의 형태는 위와 같이 `v-bind` 라는 디렉티브 오른쪽에 콜론으로 구분해서 `props` 이름을 붙여주는 형태이다. shorthand 방식으로 `v-bind`를 생략하고 `props` 이름만 적어서 전달할 수 있다.

```vue
<child-component v-bind="parentObj" />

<script>
export default {
  data: () => ({
    parentObj: {
      a: 1,
      b: '2',
      c: {
        d: 1,
        e: '2'
      }
    }
  })
}
</script>
```

`props` 이름을 생략하고 `v-bind` 디렉티브에 객체를 던지면 `parentObj` 내 모든 데이터가 자식 컴포넌트의 `props`로 들어가게 된다. 여러가지 `props`를 보낼 때 유용하게 사용할 수 있다.

```vue
<child-input placeholder="Some Placeholder" />

<!-- 이렇게 렌더링 된다 -->
<input placeholder="Some Placeholder" />
```

때로는 위와 같은 HTML Attribute 그대로 넘길 때가 있는데, 위 예시의 `input` 태그 처럼 attribute가 붙어서 렌더링된다. 이것은 사실 자식 컴포넌트의 루트에 자동으로 붙여지는 내부 동작때문인데, 해당 동작을 `inheritAttrs` 옵션으로 제어할 수 있다.

```vue
<!-- 자식 컴포넌트 -->
<!-- attribute가 붙는다면 여기에 붙는다. -->
<div>
  <!-- 여기에 attribute를 붙인다. -->
  <input v-bind="$attrs" />
</div>

<script>
export default {
  inheritAttrs: false // 루트 컴포넌트에 attribute가 자동으로 붙는 것을 방지한다.
}
</script>
```

`inheritAttrs` 옵션을 `false`로 놓으면 루트 컴포넌트에 자동으로 attribute가 붙지 않는다. 다만 `class`는 예외적으로 붙는 것 같다. `input`에 attribute를 붙이고 싶은 경우 위 처럼 `$attrs` 컴포넌트의 옵션을 통해 태그에 달아줄 수 있다.

## 디렉티브를 통한 조건부 렌더링

내장 디렉티브 중에는 상태 값에 의존, 혹은 외부 데이터에 의존해서 조건부로 렌더링 시킬 수 있는 디렉티브가 존재한다. `v-if`와 `v-else` 그리고 `v-else-if`가 있다. 자바스크립트에서 조건부를 사용했던 것 처럼 비슷하게 사용하면 된다.

```vue
<div>
  <h1 v-if="bigSize">Big Size Text</h1>
  <h3 v-else>Medium Size Text</h3>
</div>
```

`bigSize` 라는 컴포넌트 내부 상태 값에 의해 `h1` 태그가 렌더링되거나 `h3` 태그가 렌더링된다.

```jsx
export default {
  render(h) {
    return bigSize ? <h1>Big Size Text</h1> : <h3>Medium Size Text</h3>
  }
}
```

`jsx`로는 위와 같이 사용하는데, 조건에 따라 렌더링해야 되는 태그의 종류가 많으면 `jsx`로 작성하는 것이 더 깔끔하다.

```vue
<div v-if="renderType === 'div'">Hello Div</div>
<span v-else-if="renderType === 'span'">Hello Span</span>
<ul v-else-if="renderType === 'ul'">
  Hello Ul
</ul>
<footer v-else>Hello Footer</footer>
```

조건부가 모두 컴포넌트 내부의 `renderType` 값에 의존하는데, 문자열 `'div'`를 가지면 `div` 태그로 렌더링 시킬 수 있고 각 조건에 맞게 렌더링되는 태그를 바꿀 수 있다.

```vue
<template v-if="someConditionValue">
  <div>Div</div>
  <span>Span</span>
  <main>Main</main>
</template>
```

때로는 내부 엘리먼트를 감싸는 외부 엘리먼트를 렌더링하고 싶지 않을 때 위와 같이 `<template>...</template>`으로 감싸면 외부 엘리먼트가 없는 상태로 내부 엘리먼트들만 렌더링된다. `template` 역시 `v-else-if`, `v-else` 디렉티브를 사용할 수 있다.

### 번외 v-show 디렉티브

렌더링은 하지만 보여주고 싶지 않을 때가 있다. `v-show` 디렉티브가 그런 상황에 적합하게 사용될 수 있는데, 이 디렉티브는 `display` css 프로퍼티를 `none` 상태로 만들어준다. 해당 엘리먼트는 렌더링되지만 스타일 값에 의해 화면에 표시되진 않는다. 렌더링이 되므로 컴포넌트 내부의 라이프사이클 훅 메소드들을 거친다.

### jsx 심화

리액트에서도 쓸 수 있는 방법으로, 여러 연산자, 반복문을 통해 조건부 렌더링이 가능하다.

```jsx
export default {
  render(h) {
    switch (someValue) {
      case 'div':
        return <div>Hello Div</div>
      case 'span':
        return <span>Hello Span</span>
      default:
        return <main>Hello main(default)</main>
    }
  }
}
```

`switch ... case`문도 사용 가능하다.

```jsx
import Span from './Span.vue' // <span></span>
import Div from './Div.vue' // <div></div>
import Main from './Main.vue' // <main></main>
import Fallback from './Fallback.vue' // <h1></h1>

const MAP = {
  SPAN: Span,
  DIV: Div,
  MAIN: Main,
  FALLBACK: Fallback
}

export default {
  data: () => ({
    componentState: 'SPAN'
  }),
  render(h) {
    const Rendered = MAP[this.componentState || 'FALLBACK']

    return <Rendered />
  }
}
```

위처럼 사용도 가능하다.

```jsx
export default {
  render(h) {
    return this.isLoading ? <Loading /> : <div>Loaded All Data</div>
  }
}
```

삼항 연산자를 통한 조건부 렌더링도 가능하다.

```jsx
export default {
  render(h) {
    return isLoading && <Loading />
  }
}
```

`isLoading`이 truthy한 값이면 `Loading` 컴포넌트가 렌더링된다.

## 동적 컴포넌트

값에 의해 서로 다른 컴포넌트를 보여줘야 되는 상황이면 내장 컴포넌트인 `<component />`를 사용하면 된다.

```vue
<component :is="switchComponent"></component>

<script>
import Span from './Span.vue' // <span></span>
import Div from './Div.vue' // <div></div>
import Main from './Main.vue' // <main></main>
import Fallback from './Fallback.vue' // <h1></h1>

export default {
  computed: {
    switchComponent() {
      switch (this.someSwitch) {
        case 'span':
          return Span
        case 'div':
          return Div
        case 'main':
          return Main
        default:
          return Fallback
      }
    }
  }
}
</script>
```

위처럼 `computed`에서 적절한 컴포넌트를 반환해 조건에 따라 여러 컴포넌트를 렌더링할 수 있게 된다.

### 컴포넌트 유지

`<component>`로 동적 컴포넌트를 구성할 때 `is` 속성에 의해 컴포넌트가 변경되어도 컴포넌트가 유지되어야 하는 상황이 있다.

```vue
<keep-alive>
  <component :is="switchComponent"></component>
</keep-alive>
```

`<keep-alive>`라는 built-in 컴포넌트를 사용해서 동적 컴포넌트를 감싸면 데이터를 유지할 수 있다.

## 함수형 컴포넌트

Vue에서 함수형 컴포넌트는 상태를 가지지 않는 컴포넌트로 정의한다. 버전 2와 3에서 함수형 컴포넌트를 만드는 방법이 서로 다른데, 이는 2에서 함수형 컴포넌트를 만들어 성능상 이점을 얻기 위해 사용한 반면 3에서는 함수형 컴포넌트를 사용해서 컴포넌트를 작성했을 때와 일반적인 방법으로 컴포넌트를 작성했을 때의 성능 차이가 거의 없기 때문에 2에서 함수형 컴포넌트를 만드는 방법이 3에서는 사라졌다.

여기에서는 버전 2로 예시를 작성하고 있으니 버전 2에서의 함수형 컴포넌트를 만드는 방법을 정리한다.

```vue
<template functional>
  <div>...</div>
</template>
```

컴포넌트를 감싸는 `template` 태그에 `functional`이라는 속성을 추가하면 이 컴포넌트는 함수형 컴포넌트가 된다.

```js
export default {
  functional: true
}
```

`functional` 키를 `true`로 줘도 함수형 컴포넌트가 된다. 해당 컴포넌트는 상태를 가질 수 없으며 단순히 `props`로 받은 데이터를 보여줄 때에 사용할 때 성능상 이점을 얻고 사용할 수 있다. 부모로부터 받은 해당 컴포넌트의 컨텍스트도 사용할 수 있는데, 엘리먼트 속성으로 붇는 `attrs` 혹은 이벤트 리스너가 전달되는 `listeners`를 받을 수 있다.

```vue
<template functional>
  <button v-bind="{ ...attrs }" :disabled="props.disabled" @click="listerns.click">
    <slot />
  <button>
</template>
```

위처럼 `props`, `attrs`, `listeners`를 전달받을 수 있다.

## 컴포넌트 믹스인

믹스인이라는 용어는 스타일 관련 라이브러리들에서 많이 들어봤는데, Vue에서 간단히 정의하면 믹스인으로 정의한 어떤 옵션들을 그 믹스인을 사용하는 컴포넌트에 섞을 수 있다고 정리할 수 있다.

```js
// mixins.js
import Vue from 'vue'

export default Vue.extend({
  created() {
    console.log('i am mixins!')
  },
  methods: {
    mixinMethod() {
      console.log('mixinMethod')
    }
  }
}) // 컴포넌트 옵션

// component
import mixins from './mixins'

export default {
  mixins: [mixins],
  created() {
    console.log('i am component that use mixins!')
  }
}
```

믹스인에서 작성한 옵션이 컴포넌트에 병합된다. 라이프사이클 훅 메서드들은 믹스인에서 작성한 것이 먼저 호출되고, `data`에서 반환한 상태 값은 동일한게 있다면 컴포넌트에서 작성한 `data`가 덮어씌워지고 믹스인에서 작성한 것은 무시된다.

이런식으로 병합되는 기능을 커스터마이징할 수 있다.
