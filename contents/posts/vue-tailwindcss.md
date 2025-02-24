---
title: 다 된 Vue에 Tailwindcss 뿌리기
date: 2020-03-03
published: true
tags: ['vue', 'postcss']
cover_image: /images/vue-tailwindcss.png
description: Vue 프로젝트에 tailwindcss 초기 환경설정 하기
---

## tailwindcss

**tailwindcss**는 여타 다른 UI 프레임워크랑은 느낌이 다르다. (Vuetify, Bulma, Buefy, Bootstrap-vue, Material Kit 등) 부트스트랩과 비슷하다고 하면 비슷할 수도 있겠다.

프론트엔드 프레임워크에서 사용되는 UI 라이브러리 혹은 프레임워크들은 많은 일들을 대신 해준다. 예를 들어 미리 만들어져 있는 버튼 컴포넌트 혹은 많은 트랜지션, 리스트, 테이블 등등의 사전 구성된 컴포넌트들이 많이 있어 내가 원하는 것만 가져가서 쓰면 된다.

**tailwindcss**는 사전 구성되어 있는 점은 유사하나, 컴포넌트 형식의 프레임워크들과는 사뭇 다른 점이 있다. 모든 것들이 클래스 형태로 만들어져 있고, **PostCSS**와 자바스크립트로 동작한다. 클래스 형태로 만들어져 있다고 하니 부트스트랩과 똑같을 것 같지만 전혀 다르다.

부트스트랩은 딱 부트스트랩이 제공하는 그만큼의 클래스들만 사용할 수 있지만(테마를 사용하면 다를 수도 있겠지만) **tailwindcss**는 내가 원하는 클래스들을 만들어낼 수 있다. 그것도 매우 빠르게 만들 수 있다.

```js
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      primary: {
        100: '#ebf8ff',
        300: '#90cdf4',
        500: '#4299e1',
        700: '#2b6cb0',
        900: '#2a4365'
      },
      secondary: {
        100: '#fffff0',
        300: '#faf089',
        500: '#ecc94b',
        700: '#b7791f',
        900: '#744210'
      }
    }
  }
}
```

위의 코드는 **tailwindcss**의 설정 파일인데 다음과 같이 컬러를 지정했다. 이 컬러들은 `text-primary-100`으로 쓰거나 `bg-primary-100`으로 쓸 수 있다. 이뿐만 아니라 색이 필요한 어떠한 곳에 이 색깔을 가져다 쓸 수 있다. 한번 지정하면 어디에서나 쓸 수 있다.

간단하게는 색 설정을 받아들여 자바스크립트와 **PostCSS**가 이러한 클래스들을 만들어서 집어넣는 행위를 한다.

```vue
<div
  class="text-red-500 sm:text-orange-500 md:text-gray-500 lg:text-purple-500"
>
  Hello World
</div>
```

Hello World라는 글씨는 기본적으로 `text-red-500`이라는 클래스를 가진다. 그 외에 여러 개의 클래스를 가지는데, 기본적으로 빨강 글씨를 갖고, viewport가 sm보다 크다면 오렌지색깔, md보다 크다면 회색, lg보다 크면 보라색을 가지는 클래스다.

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  }
}
```

물론 viewport 크기는 마음대로 지정할 수 있다. viewport를 뜻하는 sm, md, lg, xl는 뒤에 무엇이 오든지 상관없다. 가령 배경색을 바꾸는 `sm:bg-gray-500`, 텍스트 정렬을 뜻하는 `md:text-right` 등등을 사용할 수 있다.

그 외에 CSS에서 가상 선택자인 `:hover`, `:focus` 등 **tailwindcss**는 클래스를 조작하는 것만으로 쉽게 사용할 수 있다.

## 다 된 Vue에 tailwindcss 뿌리기

Vue에 **tailwindcss**를 얹히는 건 매우 간단하다. 기본적으로 @vue/cli를 통해 프로젝트를 생성했다면 준비해야 될 것들이 별로 없다. 먼저 설치를 한다.

```bash
yarn add tailwindcss
```

설치를 한 뒤에 `npx`로 tailwindcss 설정 파일을 생성하는 스크립트를 실행한다.

```bash
npx tailwind init --full
```

끝에 `--full` 옵션을 주게되면 기본 설정 값을 가지는 파일을 만들어서 준다. 줘도 되고 안줘도 된다. 그런 다음, 스타일 파일 하나를 생성한다.

```css
/* assets/tailwind.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

css를 안다면 이 문법이 틀렸다는 걸 안다. 나중에 `postcss-loader`에 의해 이 파일은 알맞게 처리된다. 프로젝트 루트에 `postcss.config.js`를 생성한다.

```js
// postcss.config.js

const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [autoprefixer, tailwindcss]
}
```

위와 같이 작성한다. `autoprefixer`는 다양한 브라우저를 위한 접두사를 알아서 붙여주는 역할을 하는데, @vue/cli로 생성된 프로젝트는 이미 설치되어 있으니 따로 설치할 필요가 없다.

위에서도 언급했듯이 **PostCSS** 위에서 **tailwindcss**가 동작하니 플러그인에 **tailwindcss**를 넣어준다.

`vue.config.js` 파일도 수정해준다. (없으면 생성)

```js
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['postcss-loader']
        }
      ]
    }
  }
}
```

웹팩 설정을 추가해주면 모든 css 파일은 `postcss-loader`에 의해 처리됨. scss를 사용할거면 정규식 부분을 `/\.(s*)css$/`로 바꿔주면됨.

이제 **tailwindcss**가 제공하는 클래스를 어떤 컴포넌트든지 어떤 태그든지 가져다가 때려박으면 된다.

## 용량 줄이기

이렇게 만들고나니 용량이 너무 크다. css 하나가 783.5kb다. 옆 동네 부트스트랩은 187.8kb, 벌마는 224.2kb, 무겁다고 소문난 Semantic UI도 809.4kb로 **tailwindcss**랑 비슷하다.

783.5kb라고 하면 gzip해도 78.0kb다. 별로 안크다고 생각할 수도 있겠지만 맞다. 별로 안크다. 근데 **tailwindcss**는 커스터마이징 하는 맛이지. 뭔가 추가하고 만들다보면 어느새 용량이 1시간 지난 라면처럼 뿐다.

**tailwindcss**의 공식 홈페이지를 보면 Mozilla의 Firefox Send라는 서비스는 Tailwind로 빌드되었지만 CSS의 크기가 13.1kb고 gzip한 용량이 4.7kb라고 하더라. 이게 어찌된 일인지 보니 사용하는 클래스를 제외하고 전부 지웠다고 한다.

이게 맞다. 사용할 것 같은 모든 클래스를 제공하는 것은 다르게 말하면 사용하지 않을 수도 있는 클래스를 모두 제공하는 것이라, 어떻게 보면 불필요하다. 필요없다. 사용하지 않는 클래스 혹은 css를 검사해서 지워주는 도구가 바로 `purgecss`다.

## PurgeCSS

이 역시 `PostCSS`의 자식이다. 일단 설치하자.

```bash
yarn add --dev @fullhuman/postcss-purgecss
```

설치한 뒤 `postcss.config.js`로 돌아간다.

```js
// postcss.config.js

const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')
+const postcssPurgecss = require(`@fullhuman/postcss-purgecss`)

+const purgecss = postcssPurgecss({
+  content: ['./public/**/*.html', './src/**/*.vue', './src/**/*.js'],
+  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
+  whitelistPatterns: [
+   /-(leave|enter|appear)(|-(to|from|active))$/,
+   /^(?!(|.*?:)cursor-move).-move$/,
+   /^router-link(|-exact)-active$/
+ ]
+})

module.exports = {
  plugins: [
    autoprefixer,
    tailwindcss,
+   process.env.NODE_ENV !== 'development' ? purgecss : ''
  ]
}
```

purgecss는 생성자로 여러 옵션을 주게 되어있는데, `defaultExtractor`는 정규식에 맞지 않으면 그냥 삭제해버린다. 가차없이, 대신 whitelist 혹은 whitelistPatterns에 있는 애들은 제외하고 삭제시킨다. content는 purgecss가 다녀갈 곳을 지정해준다. `glob` 패턴을 사용한다.

이정도로만 생각하고, 개발 환경에서는 어떤 클래스가 쓰여지고 어떤 클래스가 안 쓸지 매번 바뀌니까 꺼두는게 좋다.

## 참고

- [https://tailwindcss.com/docs/controlling-file-size](https://tailwindcss.com/docs/controlling-file-size)
- [https://purgecss.com/](https://purgecss.com/)
- [https://markus.oberlehner.net/blog/setting-up-tailwind-css-with-vue/](https://markus.oberlehner.net/blog/setting-up-tailwind-css-with-vue/)
