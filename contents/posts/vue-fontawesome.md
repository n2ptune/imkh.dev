---
title: Vue 프로젝트에서 Font Awesome Icon 사용하기
date: 2020-02-27
published: true
tags: ['vue']
cover_image: /images/vue-fontawesome-thumbnail.png
description: CSS/LESS를 기반으로 하는 아이콘 툴킷 Font Awesome을 Vue Component 형식으로 래핑된 라이브러리를 쉽게 vue-cli 기반 프로젝트에 적용하는 방법
---

## 패키지 매니저를 사용하지 않고 Font Awesome을 사용

[https://fontawesome.com/start](https://fontawesome.com/start)을 참고해서 Font Awesome에서 제공하는 Kit을 만들고 스크립트 태그를 삽입해서 사용하는 방법이 있다. 이 방법은 CDN으로 제공되는 개인의 Kit파일을 외부에서 받아와 웹 폰트 혹은 SVG를 불러와서 사용하는 방식.

이 방식은 한번에 모든 아이콘을 불러오기 때문에 용량이 커질 수밖에 없음. 좀 더 가벼운 용량을 선호하고 퍼포먼스를 중요시 한다면 용량을 줄이는 것은 하나의 좋은 방법이다.

## 의존성 설치

Font Awesome에서 아이콘을 SVG형식으로 지원하기 시작함. (4버전↑) 그리고 그 SVG를 다루기 위해 SVG CORE 라이브러리가 있음. 그리고 이 아이콘들을 Vue Component로 만들어져 있는 라이브러리가 있음. 이 두 개의 라이브러리를 설치

```sh
yarn add @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome
```

네임스페이스가 쉽게 생각할 수 있는 **@fontawesome**이 아니라 **@fortawesome**임.

## 아이콘 종류

아이콘을 직접 사용하기 전 아이콘의 종류에 대해서 그리고 Font Awesome에서 제공하는 **무료**버전과 **유료**버전의 차이를 알면 사용하기 편하다. Font Awesome은 다음과 같은 종류의 아이콘을 제공함.

- Brand
- Solid
- Regular
- Light
- Duotone

현재 날짜(2020년 2월 27일) 기준으로 무료로 제공하는 아이콘의 갯수는 **1557**개, 유료로 제공하는 아이콘이 **7722**개다. 무료로 제공되는 아이콘은 **Brand**, **Solid**, **Regular**가 있다. **Light**와 **Duotone**은 사용 불가능하다.

모든 아이콘은 [https://fontawesome.com/icons](https://fontawesome.com/icons) 여기서 확인할 수 있다.

## 아이콘 종류 의존성 설치

Font Awesome에서 이런 종류마다 각각 다른 패키지로 배포하였다. 무료 버전은 앞에 **free** 접두사가 붙고 유료는 **pro** 접두사가 붙는다.

무료버전으로 제공되는 3가지 종류의 아이콘을 모두 설치한다.

```sh
yarn add @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons
```

각각 Solid, Brands, Regular 아이콘을 설치하였다.

## Vue Instance와 연결

메인 엔트리 파일, 여기서는 `main.js`를 수정한다.

```js
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGithub)

Vue.component('fa', FontAwesomeIcon)

...
```

SVG CORE 라이브러리에서 `library` 객체를 가져온다. 이 객체가 핵심적이며 모든 아이콘들은 이 객체의 `add` 메서드를 통해 추가되어야 한다.

## 컴포넌트에서 사용

```vue
<template>
  <div>
    <fa :icon="['fab', 'github']" />
  </div>
</template>
```

컴포넌트 이름을 `fa`로 지정해줬기 때문에 `fa`로 쓴다. 컴포넌트 이름은 수정 가능하며 중복이 되지 않으면 뭘 써도 무방하다.

기본적으로 `icon` 속성에 문자열을 주게 되면 자동으로 접두사가 붙어 `fas-github` 이런식으로 된다. 하지만 Solid Style에 Github이라는 아이콘이 없기 때문에 런타임에 에러가 발생한다.

위와 같이 배열을 주고 첫번째 원소에 아이콘 종류를 지정하고 그 다음 아이콘 이름을 보내주면 `fab-github`꼴로 해석해서 정상적으로 출력이 된다.

> Solid: fas, Regular: far, Light: fal, Duotone: fad, Brands: fab (font-awesome-solid, font-awesome-regular, ... 모두 앞글자를 딴 축약형으로 씀)

## 컴포넌트를 사용하지 않고 아이콘 사용

SVG CORE 라이브러리에는 아이콘을 받고 SVG를 처리하는 기능 외에 DOM을 감지해서 특정한 Element가 있으면 SVG로 변환해주는 기능이 있다. 메인 엔트리 파일에서 다음과 같이 수정

```js
import { dom } from '@fortawesome/fontawesome-svg-core'

dom.watch()
```

기본적으로 비활성화되어 있기 때문에 활성화 시켜줘야 한다.

이제 컴포넌트에서 `<i class="fab fa-github"></i>`를 `<svg>...</svg>`로 자동으로 변환한다. 더 자세한 내용은 [https://github.com/FortAwesome/vue-fontawesome#processing-i-tags-into-svg-using-font-awesome](https://github.com/FortAwesome/vue-fontawesome#processing-i-tags-into-svg-using-font-awesome)를 참고.

## 왜 이런 컨셉일까

먼저 아이콘 종류를 다른 라이브러리로 쪼갠 이유는 모든 아이콘 종류에 동일한 아이콘이 있기 때문이다.

![fontawesome](/images/fontawesome-circle.png)

예를 들어 **circle**이라는 아이콘이 4개씩이나 있다. 그런데 모두 분류가 다르다. 왼쪽부터 순서대로 Solid, Regular, Light, Duotone이다. 이렇게 아이콘이 4개 전부 다 다르지만 이름은 전부 똑같아서 라이브러리를 종류별로 나눴다. 라는 이야기 같다.

자세한 내용: [https://github.com/FortAwesome/vue-fontawesome#import-the-same-icon-from-different-styles](https://github.com/FortAwesome/vue-fontawesome#import-the-same-icon-from-different-styles)

다음으로 필요한 아이콘만 선택해서 넣는 이유. 다양한 번들러(웹팩, 롤업 등)들 중 Tree Shaking 기능을 제공하지 않는 번들러는 아이콘을 불러와서 사용했을 때 번들이 엄청 커지는 경우를 방지하기 위해

Tree Shaking이란 번들러가 자바스크립트 컨텍스트 안에서 모듈이 불러와지고 내보내지는지에 대한 감시를 해서 이 모듈이 사용되지 않으면 코드를 제거하는 기능이다. 만약 번들러가 이 기능을 지원하지 않고 Font Awesome에서 아이콘을 전부 쪼개지 않았더라면(하나를 사용해도 모듈 전체를 임포트해야 된다면) 번들링된 파일은 용량이 매우 커질 것이다.

이런 이유로 Font Awesome은 아이콘을 전부 하나의 파일로 나눴고 필요로 하는 아이콘만 임포트해서 쓸 수 있도록 만들었다. 웹팩에서는 Tree Shaking 기능을 지원한다.

## Nuxt.js

서버사이드 렌더링과 같이 사용하고 싶다면 [https://github.com/FortAwesome/vue-fontawesome#nuxtjs](https://github.com/FortAwesome/vue-fontawesome#nuxtjs) 참고.

위의 Vue에서 사용했던 것과 방법이 크게 다르지 않으며 `nuxt.config.js`의 파일만 일부 수정해주면 된다.

## 참고

- [https://github.com/FortAwesome/vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome)
- [https://fontawesome.com/icons?d=gallery&q=circle](https://fontawesome.com/icons?d=gallery&q=circle)
