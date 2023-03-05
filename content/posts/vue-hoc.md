---
title: Vue Higher Order Component(HOC) 정리
date: 2022-09-06T02:35:30.241Z
published: true
tags: ['vue']
cover_image:
description: Vue 고차 컴포넌트(Higher Order Component)에 대해 정리하고 학습
---

## Vue 고차 컴포넌트 패턴

Vue Higher Order Components 패턴에 대해서 정리하고 기록한다.

### 개념

[리액트](https://reactjs.org/docs/higher-order-components.html)에서 먼저 나온 개념이며 컴포넌트를 인자로 받아 컴포넌트를 반환하는 컴포넌트라고 한 문장으로 정리가 가능한데, 처음 접하면 개념이 잘 와닿지 않지만 직접 예제를 보면 바로 이해가 될 수 있듯이 개념 자체는 쉬운 편이다.

```jsx
const withHOC = Components => {
  return (
    <div className="hoc">
      <Components />
    </div>
  )
}
```

위 예제는 `Components` 인자를 하나 받아 그 컴포넌트를 `div` 태그로 감싸 반환하는 함수를 표현한다. 리액트에서는 위 예제와 비슷한 방법으로 쉽게 고차 컴포넌트를 구성할 수 있으며 이는 기존 컴포넌트를 수정하지 않고 기존 컴포넌트의 기능 혹은 다른 무언가를 확장할 수 있는 안전한 방법(사이드 이펙트가 적은)이라고 생각된다.

### JSX 환경 바깥

Vue에서는 HTML 엘리먼트를 '템플릿'이라는 개념을 가지고 표현하기 때문에 JSX를 주로 사용하지 않는다. 고차 컴포넌트라는 개념은 함수 그 자체를 반환(JSX를 반환)하는 컴포넌트를 작성하는 리액트에서 고안된 개념이라, JSX를 기준으로 그 개념을 설명한다.

다행히 Vue에서도 JSX를 이용해서 컴포넌트를 표현할 수 있으며 고차 컴포넌트를 리액트처럼 사용하려면 고차 컴포넌트를 JSX로 작성할 필요성이 있다.

```jsx
const withHOC = components => {
  return Vue.extend({
    render(h) {
      return <div class="some-comp">{h(components)}</div>
    }
  })
}
```

Vue에서 JSX로 컴포넌트를 렌더링 하는 방법은 `render` 옵션 API에 있으니 JSX를 반환하는 함수를 작성하면 된다.

### mixin과 비교하기

mixin의 기능 중 하나는 서로 다른 컴포넌트에 공통적인 동작 및 기능(함수)을 제공할수 있다는 것이다. 예를들어, 5개의 컴포넌트가 존재하고 똑같은 함수 2개를 코드 중복으로 공유하고 있다고 가정하자. 만약 스펙 중 일부가 변경되어 함수를 수정해야할 경우 컴포넌트 파일 5개를 찾아 모든 함수에 대해서 코드 수정이 불가피하다. 이럴 경우 하나의 mixin을 작성해 5개의 컴포넌트에서 똑같은 함수를 공유할 수 있도록 제공할 수 있다. 함수의 원천은 mixin이므로 함수 코드 수정이 필요할 경우 mixin 파일 하나에서만 수정하면 제공되는 모든 곳의 코드를 수정하지 않아도 된다.

마법같은 기능이지만 지나친 욕심은 화를 부르는 법, 많은 mixin 그리고 더 복잡한 mixin을 작성할 때마다 컴포넌트의 복잡도는 같이 올라가게 된다. mixin 을 사용하는 컴포넌트 측에서는 완벽한 타입 제공이 이루어지지 않는 한 유지보수가 어려워질 것이며 타입 안정성에 대해 심각하게 고려할 상황이 닥칠 수도 있다.

이런 mixin과 비교해서 HOC 패턴은 기존 컴포넌트에 주는 영향도가 비교적 적다고 말할 수 있다. mixin은 mixin을 적용하려는 컴포넌트와 합성시켜 2개의 컴포넌트 옵션을 하나의 컴포넌트 옵션으로 만들어버리는데에 반해 HOC는 부모-자식으로 이루어진 컴포넌트 관계를 유지하며 합성하는 형태가 아닌 컴포넌트를 한번 감싸는 형태로 사용된다.

HOC 패턴을 이용해서 구현하는 컴포넌트도 일반적인 컴포넌트와 같은 컴포넌트이므로 `props` 및 이벤트 등 일반적인 컴포넌트가 가질 수 있는 속성을 가질 수 있다. 따라서 `props`에 의해 다른 기능을 처리하거나, 어떤 옵션이 비활성화된다거나 하는 mixin에서 하지 못했던 유연한 처리를 HOC 패턴을 이용하면 좀 더 간편하게 구현할 수 있다는 장점이 있다.

HOC는 mixin과 달리 중복되는 코드의 원천을 한 곳으로 이동시키는, 그러니까 합성하여 제공하는 형태는 다소 부적절할 수 있다. HOC는 감싸져있는 컴포넌트에 대해 일괄적인 처리가 필요하거나 통합된 기능을 제공해야 하는 상황에 mixin 보다 적절한 방법으로 사용될 수 있다.

```js
const someMixin = Vue.extend({
  created() {
    // 합쳐지는 대상의 created 훅과 합성된다.
    console.log('mixin created hook')
  },
  data() {
    return {
      // 데이터도 마찬가지로 적용한 컴포넌트에 합성된다.
      // 중복된 이름의 데이터가 있을 경우 내부 전략 혹은 커스텀 전략에 의해 mixin 것이 덮어씌워지거나, 적용 대상의 것이 유지될 수도 있다.
      someData: null
    }
  }
})
```

### Composition API

위에서 언급했던 mixin 기능을 더이상 사용할 이유가 없어졌는데, 그 이유는 Vue 3로 버전업이 되면서, Composition API가 공식적으로 제공되었기 때문이다. 공통되는 함수는 hook 형태로 작성하여 제공하면 mixin 기능을 사용할 필요가 전혀 없는 것이다. 자바스크립트(혹은 타입스크립트) 파일에서 함수를 제공하는 것이기 때문에 타입 지원 효과를 볼 수 있으며 비슷한 관심사의 로직을 한 곳에 몰아 관리 용이성도 챙길 수 있다.

```ts
import { ref, reactive } from 'vue'

const defaultUser: User = {
  name: '',
  age: 0
}

export function useCurrentUser() {
  const isLoggedIn = ref(false)
  const user = reactive(defaultUser)

  // ....Some logics....

  return { isLoggedIn, user }
}
```

위 형태로 파일 단위 hook을 작성한다.

```vue
<template>
  <div v-if="isLoggedIn">{{ user.name }}</div>
</template>

<script lang="ts">
import { useCurrentUser } from '../hooks/user'

export default {
  setup() {
    const { isLoggedIn, user } = useCurrentUser()

    return { isLoggedIn, user }
  }
}
</script>
```

컴포넌트에서는 해당 hook을 가져와 이런 형태로 사용할 수 있다.

### Troubleshooting

1. 부모와 자식 컴포넌트 사이 한 가지 컴포넌트가 추가되었는데(고차 컴포넌트) 이런 경우 props 및 자식이 발생시키는 이벤트는 어떻게 처리해야할까?
2. HOC로 감싼 컴포넌트가 일부 슬롯을 표현해야 하는 경우 혹은 사용해야 하는 경우는 어떻게 처리할까?

### HOC 부모 자식간 props, 이벤트 전달

기존 컴포넌트를 사용하는 것처럼 감싼 HOC 컴포넌트에 props, 이벤트를 모두 전달한다.

```js
import Vue from 'vue'

export function withComponent(components) {
  return Vue.extend({
    name: 'withComponent',
    render(h) {
      return h(components, {
        attrs: this.$attrs || {},
        props: this.$props || {},
        on: this.$listeners
      })
    }
  })
}
```

HOC에 전달된 HTML 속성 값인 `$attrs`, props, 이벤트를 모두 전달하여 하위 컴포넌트에게 그대로 전달한다.

### HOC 하위 컴포넌트 슬롯 표현

HOC로 감싼 컴포넌트가 슬롯을 표현해야 하는 경우 렌더링시 하위 컴포넌트에 HOC가 받은 슬롯 정보도 넘겨줘야 한다.

[Discussion](https://github.com/vuejs/vue/issues/6201)을 참고하는 도중에 알아낸 사실은 2.6.0 이전 버전을 사용하는 환경에서는 HOC에서 받은 슬롯을 normalize 처리하는 과정이 필요한데, 여기서는 2.6.0 이전 버전을 사용한다는 고려를 하지 않기 때문에 가장 쉬운 방법을 정리한다.

```vue
<template>
  <div>
    <slot name="header">
      <h1>asdf</h1>
    </slot>
    <slot name="default">
      <h1>default</h1>
    </slot>
    <slot name="footer">
      <h1>footer</h1>
    </slot>
  </div>
</template>
```

`header`, `default`, `footer` 세 개의 슬롯을 받는 컴포넌트가 하나 있다. 해당 컴포넌트를 HOC로 감싼다.

```vue
<template>
  <div>
    <Example>
      <template #header>
        <p>no Header</p>
      </template>
      <template> asjfquiwfu </template>
      <template #footer>
        <p>qiwfjqwif</p>
      </template>
    </Example>
  </div>
</template>

<script>
import Example from './Example'
import { withComponent } from '../hoc'

export default {
  components: {
    Example: withComponent(Example)
  }
}
</script>
```

HOC로 감싼 컴포넌트라도 하위 컴포넌트에 슬롯이 잘 전달되는 걸 볼 수 있다.

```js
import Vue from 'vue'

export function withComponent(components) {
  return Vue.extend({
    name: 'withComponent',
    render(h) {
      return h(components, {
        attrs: this.$attrs,
        props: this.$props,
        on: this.$listeners,
        scopedSlots: this.$scopedSlots
      })
    }
  })
}
```

HOC에서 받은 `$scopedSlots`을 하위 컴포넌트에 전달한다.
