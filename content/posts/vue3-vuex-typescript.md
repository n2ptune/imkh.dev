---
title: Vue 3에서 Vuex와 타입스크립트 같이 사용하기
date: 2021-05-04 12:10:17
published: true
tags: ['vue', 'typescript']
cover_image: ./images/vue3-vuex-typescript-thumbnail.jpg
description: Vue 3 환경에서 Vue 전용 상태 관리 에코 시스템 Vuex와 타입스크립트로 프로젝트 구축하기
---

## Vue

2020년 9월즈음 Vue 3 정식 버전이 나온 이래 여러 에코 시스템이 Vue 3를 지원하기 위해 버전 업을 여러번 했다. `@vue/cli` 패키지도 마찬가지로 Vue 3 프로젝트를 생성하기 위해 업데이트 되었다.

```sh
npm i -g @vue/cli
```

`@vue/cli` 패키지를 설치하고 낮은 버전에서 Vue 3 프로젝트를 만들 수 없으니 업그레이드 한다. 세갈래길에서 맨 아래길을 선택한다. Vuex와 Typescript를 선택하고 버전 3를 선택한다.

잠시 기다리면 Vue 3 프로젝트가 자동으로 구축된다. 이렇게 타입스크립트와 Vue 3는 `@vue/cli`가 알아서 설정해주었다. 이제 Vuex만 조금 건드리면 된다.

## Vuex

미리 생성된 스토어 파일을 조금 수정한다. 여기에서는 한 개의 모듈을 가진다고 가정한다.

```ts
// /store/index.ts
import { createLogger, createStore, Store } from 'vuex'

export default createStore({
  mutations: {},
  actions: {},
  modules: {},
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : undefined
})
```

### 로깅

Vue 2에서는 Dev tools를 통해 디버깅을 하기 용이했는데, Vue 3에서 Dev tools이 활성화 되지 않는 것 같아서 Vuex에서 공식적으로 제공하는 로깅 플러그인을 사용해서 디버깅할 수 있다.

Dev tools에서 처럼 변이/액션 등이 일어날 때 콘솔에 로그가 찍힌다.

### 모듈

간단한 유저 정보를 담는 Store를 모듈로 나누어 관리한다고 가정한다.

```ts
import { Module } from 'vuex'

export interface UserModuleState {
  name: string
  email: string
}

export const userModule: Module = {
  namespaced: true,
  state: () => ({
    name: '',
    email: ''
  }),
  getters: {
    getName(state) {
      return state.name
    }
  }
}
```

다른 내용은 Vue 2와 비슷하게 작성하면 된다. 하지만 위와 같이 작성하면 타입스크립트에서 오류를 뱉는다. `Module` 인터페이스에 제네릭을 넣어줘야 한다. 제네릭 인자는 2개인데 왼쪽은 모듈 상태의 타입이고 오른쪽은 루트 루트 모듈의 상태 타입이다. 루트 모듈의 상태 타입이 아직 없기 때문에 스토어 파일에 작성한다.

```ts
// /store/index.ts
import { createLogger, createStore, Store } from 'vuex'
import { UserModuleState, userModule as user } from './user'

export interface RootState {
  user: UserModuleState
}

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    user
  },
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : undefined
})
```

`RootState`를 지정하고 `export` 시킨다. 모듈들을 관리하는 전역 스토어에 모든 모듈의 타입을 담는다. 그리고 유저 모듈에서 해당 루트 상태 타입을 읽어들여 사용한다.

```ts
import { Module } from 'vuex'
import { RootState } from './index'

export interface UserModuleState {
  name: string
  email: string
}

export const userModule: Module<UserModuleState, RootState> = {
  ...
}
```

### 컴포넌트에서 스토어 사용하기

Vue 2에서는 인스턴스에 `$store`가 바인딩되어 `this.$store`로 스토어에 접근할 수 있지만 Composition API에서 `this`에 접근할 수 없으니 다른 방법을 제공한다. `useStore` 라는 메서드를 사용하면 된다.

```ts
<template>
  <div>{name}</div>
  <div>{email}</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    return {
      name: computed(() => '이름 : ' + store.state.user.name),
      email: computed(() => '이메일 : ' + store.state.user.email)
    }
  }
})
</script>
```

위와 같이 사용하면 된다. 필요에 따라 `mapGetters`를 `computed`에 걸어 사용하여도 된다. 하지만 한 가지 문제가 있다. 위처럼 사용하면 타입 추론이 안된다. 타입 추론이 가능하게 하려면 몇 가지 설정이 필요하다.

### 스토어 타입 추론

`InjectionKey`을 사용한다. 주입된 값을 동기화할 때 유용하다. 예를 들어 `provide`와 `inject`를 사용해서 상위 컴포넌트에서 하위 컴포넌트에 데이터를 제공할 때, 제공한 객체를 문자열로 찾는 것이 아니라 키로 찾을 수 있도록 해주는 메서드이다.

이를 이용해서 스토어 타입 유형을 동기화 시킨다.

```ts
// /store/index.ts
import {
  createLogger,
  createStore,
  Store,
  useStore as baseUseStore
} from 'vuex'
import { InjectionKey } from 'vue'
import { UserModuleState, userModule as user } from './user'

export interface RootState {
  user: UserModuleState
}

export const key: InjectionKey<Store<RootState>> = Symbol()

export const useStore: () => ReturnType<typeof baseUseStore> = () => {
  return useStore(key)
}

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    user
  },
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : undefined
})
```

`key`를 하나 만들고 동기화 시킨다. 그리고 Vuex에서 제공하는 `useStore` 메서드를 확장하는 메서드를 하나 만든다. 매번 키를 임포트해서 사용하기 불편하기 때문에 키를 인자로 받고 스토어를 반환하는 헬퍼 메서드를 하나 작성한다.

```ts
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    // 타이핑이 제대로 된다.
    const store = useStore()

    return {
      name: computed(() => '이름 : ' + store.state.user.name),
      email: computed(() => '이메일 : ' + store.state.user.email)
    }
  }
})
</script>
```

## 참고

Vuex 4 with Vue 3

- [공식 문서](https://next.vuex.vuejs.org/guide/typescript-support.html#typing-usestore-composition-function)
