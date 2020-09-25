---
title: Vue 3 훑어보기
date: 2020-09-25 05:06:04
published: true
tags: ['vue']
cover_image:
description: Vue 3 릴리즈된 기념으로 새로 추가된 기능 일부를 훑어보기
---

## Vue 3 프로젝트 시작하기

Vue 3 프로젝트를 시작하는 방법은 기존에 웹팩과 결합된 기능으로 정해진 스카폴딩을 제공해주는 Vue CLI를 통해 생성할 수 있다. 다만 Vue 3가 최근에 릴리즈 되었기 때문에 **CLI의 버전이 4.5 이상이어야 Vue 3 프로젝트를 생성할 수 있다.**

기존 Vue 2 프로젝트를 생성하는 것 처럼, `vue create <project_name>`를 입력하게 되면 정해진 스카폴딩 내에서 여러 옵션을 골라 프로젝트를 생성할 수 있다. CLI 버전을 올렸다면 Vue 3 Preview라는 옵션이 보이게 되는데, 이 옵션을 선택하고 설치하면 Vue 3 프로젝트를 CLI를 통해 손쉽게 만들 수 있다.

### 프로젝트 구조 살펴보기

스카폴딩 해주는 프로젝트의 구조는 Vue 2 프로젝트와 다를 바가 거의 없다고 해도 무방할 정도로 바뀐게 없다. 그 말은, Vue 2 프로젝트에서 Vue 3로 마이그레이션할 때 큰 불편함이 없다는 소리이기도 할 것 같다.

CLI를 통해 프로젝트를 만들었다면 다음과 같은 구조를 가지고 있다.

```bash
.
├── README.md
├── babel.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   └── main.js
└── yarn.lock
```

Vue 2 프로젝트를 만들었을 때와 별반 다를게 없다.

### Composition API

기존 Vue에서 컴포넌트 데이터를 표현할 수 있는 방법으로 Option API가 있다. 이 API를 사용해 컴포넌트의 데이터를 표현한다던가, 컴포넌트의 데이터를 기반으로 계산된 속성 혹은 다양한 메소드를 구현할 수 있었으며, 컴포넌트 라이프 사이클 마다 어떠한 기능을 하도록 기능을 구현할 수 있었다.

하지만 시간이 흐르고 프로젝트의 규모가 커지게 되면 컴포넌트의 옵션들이 많아지고 관심사가 하나인 기능에 대해서도 여러 곳에 흩뿌려져있는 것 처럼 보여 가독성이 떨어지는 문제가 발생한다.

이러한 문제와 코드의 재사용성, 타입스크립트 추론 등의 문제를 해결하기 위해서 Composition API라는 것이 등장했다. 이 기능은 기존의 Vue 2 프로젝트에서는 외부 패키지를 추가해서 사용할 수 있고, Vue 3에서는 기본적으로 제공하는 기능으로 추가되었다.

```vue
<template>
  <div>
    <button @click="increase">추가</button>
    <p>{{ count }} : {{ isEven }}</p>
  </div>
</template>
```

위 예제는 버튼을 클릭할 때마다 `count`가 증가하여 보여주고, `count`가 짝수면 `isEven`에 알맞은 문자열을 넣어 사용자에게 보여주는 간단한 기능을 하는 템플릿이다. 이 컴포넌트를 각각 Option API와 Composition API로 구현한다.

```js
// Option API
export default {
  data() {
    return {
      count: 0
    }
  },

  computed: {
    isEven() {
      return this.count % 2 === 0 ? '짝수입니다.' : '홀수입니다.'
    }
  },

  methods: {
    increase() {
      this.count++
    }
  }
}
```

만약 이 컴포넌트가 점점 규모가 커지고 많은 기능이 추가가 된다면 버튼을 눌러 카운트를 증가하고 그 카운트 값을 기준으로 어떤 문자열을 출력하는 기능이 한 가지의 관심사를 가지고 있는 반면 여러 부분에 나누어져 구성되어 있기 때문에 가독성이 떨어질 수 있다. Composition API를 이용해서 구현하면 좀 더 가독성을 높일 수 있다.

```js
import { ref, computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    const isEven = computed(() =>
      count.value % 2 === 0 ? '짝수입니다.' : '홀수입니다.'
    )
    const increase = () => count.value++

    return {
      count,
      isEven,
      increase
    }
  }
})
```

`ref`는 매개변수로 받은 값에 대해 참조할 수 있는 값을 리턴한다. 숫자값이나 문자열은 자바스크립트에서 원시 타입이기 때문에 객체의 `value` 프로퍼티에 해당 값을 넣고 참조한다. (원시 타입은 매개변수로 함수에 건내주면 참조 값이 아닌 있는 그대로의 값을 전달)

Composition API를 사용하니 한결 더 깔끔해진 느낌이다. 다른 느낌으로는 React와 비슷해진 느낌이다. API에서 제공하는 다양한 기능들은 [Vue 3 공식 홈페이지](https://v3.vuejs.org/guide/composition-api-introduction.html)에 자세하게 나와있다.

### 컴포넌트 루트

Vue 3에서는 컴포넌트가 두 개의 루트를 가질 수 있다.

```vue
<template>
  <p>some text</p>
  <button>some button</button>
</template>
```

위 코드는 Vue 2에서는 에러가 나지만 Vue 3에서는 정상 작동한다. 하지만 컴포넌트 루트는 한개만 있는 것이 좋고 여러 개인 경우를 지양하라는 문구를 어디선가 본 것 같다.

(이 기능을 Fragments라고 한다)

### Teleport

이 부분은 이해가 되지 않아 공식 홈페이지를 여러 번 본 개념이다. 가령 버튼을 누르면 모달이 활성화 되는 그런 컴포넌트를 만들고 있다고 하고, 모달의 내용이 만들고 있는 컴포넌트의 데이터를 활용해야 한다고 가정한다면 그 모달은 전역적으로 사용되는 컴포넌트임에도 그 컴포넌트의 자식으로 렌더링된다. 이 기능이 없었을 때에는 Vuex를 통해 상태를 참조한다거나 다른 방법으로 모달을 구현했다면 Vue 3에서는 Teleport라는 기능으로 부모를 바꾸어(?) 버릴 수 있다.

```vue
<template>
  <button @click="showModal = !showModal">모달 보여줘</button>

  <teleport to="body">
    <div v-if="showModal" class="modal">
      <div>MODAL</div>
    </div>
  </teleport>
</template>
```

`teleport` 태그로 모달 내부 컨텐츠를 감싸고 그 안에 간단한 태그로 구성했다. `teleport`로 감싸져 있는 부분은 `body`의 자식으로 렌더링된다. 만약 텔레포트 태그가 컴포넌트를 갖고 있으면 다른 위치에서 렌더링되어도 텔레포트에 특정한 부모 밑에서 렌더링 된다.

### Emits

`emit` 기능으로 부모에게 어떤 이벤트를 발생시키고 부모에서 그 이벤트를 수신했었다. 자식에서 이 이벤트를 발생하기 전 유효성 검사를 할 수 있다. 자식 컴포넌트에서 `test-event` 이벤트를 발생시킨다고 가정한다.

```js
import { computed, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'HelloWorld',

  props: {
    msg: String
  },

  emits: {
    'test-event': str => {
      if (str) {
        console.log(str)
        return true
      } else {
        return false
      }
    }
  },

  setup(props, { emit }) {
    const reversedMessage = computed(() =>
      props.msg
        .split('')
        .reverse()
        .join('')
    )

    onMounted(() => {
      setTimeout(() => {
        emit('test-event', '')
      }, 1500)
    })

    return {
      reversedMessage
    }
  }
})
```

컴포넌트의 `emits` 옵션에 발생하는 이벤트 이름과 똑같은 프로퍼티를 만들고 전달하는 값과 똑같이 매개변수로 받는 함수를 구현한다. 이 함수는 `boolean` 값을 반환해야한다. (잘못하고 있는 것 같은데 `false`를 반환해도 부모에서 이벤트가 수신된다.)

## Vite App으로 시작하기

Vite란 모던 브라우저에서 지원하는 `<script module>`을 이용해 개발시 번들링하지 않고 필요한 모듈만을 HTTP 요청으로 불러와서 실행하게 해주고, 프로덕션 빌드시에는 Rollup으로 코드를 번들링해주는 기능을 가지고 있는 떠오르는 웹 개발 도구다. 웹팩으로 구성된 Vue 개발 서버를 여는데에는 10초쯤 걸리는 반면 Vite로 Vue 프로젝트를 구성하면 빠르면 1초 적어도 2초 내에는 개발 서버가 구동이 된다.

매력적인 점은 아무리 프로젝트가 커져도 웹팩은 핫 리로딩도 늦고 개발 서버 구동도 늦어지는 반면 Vite는 일관적인 속도를 가진다. 그리고 개발 시 실제 수정이 일어난 곳만 재컴파일해서 보여주므로 훨씬 빠른 핫 리로딩도 제공한다.

```bash
yarn create vite-app v-app
```

명령어를 입력하고 잠깐 눈 깜빡이면 프로젝트 구성이 완료되고, 프로젝트에 들어가 의존성 설치가 눈 세번 깜빡이면 완료된다. 아직 활발히 개발중인 단계인 것 같아 보여서 CLI에서 해주는 스카폴딩에 비해 부실한 점이 있다. ESLint, Prettier 등 다양한 설정을 직접 해야하는 불편함이 있다.
