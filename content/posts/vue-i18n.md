---
title: Vue i18n 간단하게 사용하기
date: 2021-03-11 10:50:56
published: true
tags: ['vue']
cover_image:
description: Vue에서 국제화를 지원하기 위한 오픈 소스 vue-i18n을 간단하게 사용해보기
---

## i18n

i18n의 사전적 정의는 **국제화**라고 한다. (i와 n 사이 18개의 알파벳이 있다는 의미) 소프트웨어 맥락 안에서 국제화란 어떤 것이 있느냐하면 제일 먼저 국가 마다 다른 언어를 지원하는 것이 있다. 예를 들어, 우리는 지금 한국어를 사용하고 있지만 영어를 사용하는 사람들에게 어떤 서비스를 제공하고자 하면 영어를 사용하는 사람들은 한국어를 모를 수도 있기 때문에, 한국어로 된 부분을 영어로 번역해서 서비스해야한다.

언어뿐만이 아니라, 국제화라는 것에는 많은 의미가 담겨져있다. 어떤 국가에서는 왼쪽에서 오른쪽으로 글을 읽지 않을 수도 있고, 숫자, 화폐의 표기법도 다를 수 있다. 물론 시간도 당연히 제각각이다.

국제화를 위한 많은 부분을 지원하기에 신경써야 하는 부분이 많고 애매모호한 부분도 많다. 프론트엔드 분야에서는 사용하는 프레임워크/라이브러리마다 이런 부분을 손쉽게 관리할 수 있게 개발된 i18n 솔루션이 있다. 여기에서는 `vue`를 사용하여 i18n을 어떻게 지원하는지, 공식적으로 지원하는 `vue-i18n`을 이용한 국제화를 간단하게 사용해보고 정리한다.

## 설치

vue-cli로 설치된 프로젝트 환경이면 공식 플러그인을 제공하는 것 같은데, 여기에서는 공식 문서에 따라 cli에서 제공하는 라이브러리가 아닌 원 라이브러리를 설치해서 사용한다.

```sh
npm install vue-i18n
# or
yarn add vue-i18n
```

설치를 완료했다면 절반은 완성된거나 다름 없다.

## 기본 설정

지원하고자 하는 언어들과 그 언어의 번역된 텍스트를 키/값 쌍으로 JSON 파일을 만든다. 여기에서는 영어와 한국어를 지원하기 위해 `en.json`, `ko.json`을 작성한다.

```json
{
  "button": {
    "add": "Add",
    "delete": "Delete"
  }
}

{
  "button": {
    "add": "추가",
    "delete": "삭제"
  }
}
```

이제 `button.add`을 사용자에게 보여준다고 하면, 현재 `locale`값에 의해 그 텍스트가 결정이 된다. 가령 현재 `locale`이 `ko`라면, 한국어 '추가'를 보여주게 된다.

JSON들을 i18n과 연결시키기 위해 파일을 하나 만든다.

```js
// i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './locales/en.json'
import ko from './locales/ko.json'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'ko',
  fallbackLocale: 'ko',
  messages: { en, ko }
})
```

`VueI18n` 생성자의 첫번째 인자로 많은 설정 값을 넣을 수 있다. 여기서 기본적으로 i18n에 대한 설정을 할 수 있으니 공식 문서를 참고해서 설정을 커스텀한다.

```js
// main.js
import Vue from 'vue'
import i18n from './i18n'

new Vue({
  render: h => h(App),
  i18n
}).$mount('#app')
```

i18n은 공식적으로 지원하는 라이브러리이기 때문에 Vue 생성자 첫번째 인자로 줄 수 있다.

## 사용

템플릿에서 아래와 같이 사용하면 된다.

```vue
<template>
  <div>
    <button>
      {{ $t('button.add') }}
    </button>
  </div>
</template>
```

위 부분은 `locale` 값에 따라 텍스트로 '추가'가 표시되거나 'add'가 표시된다. `locale` 값을 변경하려면 i18n에서 제공하는 API를 사용하여 변경할 수 있다.

```vue
<template>
  <button @click="changeLocale">
    {{ $t('button.change') }}
  </button>
</template>

<script>
export default {
  methods: {
    changeLocale() {
      if (this.$i18n.locale === 'en') return (this.$i18n.locale = 'ko')
      this.$i18n.locale = 'en'
    }
  }
}
</script>
```

`locale` 값에 따라 텍스트가 바뀌는 걸 확인해볼 수 있다. 이외에 국제화 지원에 다양한 API를 제공하는 부분은 따로 내용을 정리하도록 한다.