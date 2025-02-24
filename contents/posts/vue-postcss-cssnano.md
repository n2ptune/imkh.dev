---
title: Vue PostCSS 플러그인으로 CSS 크기를 압축시키기
date: 2020-01-15
published: true
tags: ['vue', 'postcss']
cover_image: /images/postcss-logo.png
description: PostCSS는 일상적인 CSS 동작을 자동화하기 위해 자바스크립트 기반 플러그인을 사용하는 소프트웨어 개발 도구이다. 이 도구는 위키백과, 페이스북, 깃허브의 코드를 개발하기 위해 사용되어 왔다. PostCSS는 npm 사용자들 간에 가장 선호되는 CSS 도구이다.
---

## PostCSS

PostCSS는 다른 CSS 전처리기 이를테면, **SASS(SCSS)**, **Stylus**, **Less** 등이 있다. 종류야 훨씬 많겠지만 대표적으로 이 세가지가 가장 많이 쓰이고 가장 많이 알려져있다.

그렇다면 PostCSS는 전처리기가 아닐까? 관련 내용을 국내, 해외 기술 블로그들을 많이 참고해본 결과 PostCSS를 전처리기라고 생각하는 개발자도 있고, 그렇지 않은 개발자들도 있다. 이러한 이유가 바로 PostCSS가 전처리기처럼 작동하는 부분에 있다고 생각한다. PostCSS는 전처리기가 아니라 전처리기처럼 작동할 수 있는 개발 도구라고 생각한다.

## PostCSS 동작 원리

PostCSS와 함께 동작하는 자바스크립트 플러그인들이 있다. 이 플러그인들은 PostCSS를 거쳐 실행되고 플러그인 마다 다양한 기능을 제공할 수 있다. 예를 들면 스타일을 해석하는 방식이 서로 다른 브라우저에서 적절하게 접두사(-ms-, -webkit-, -moz-, -o-)를 붙여주는 플러그인이나 이 포스트에서 다룰 **CSS의 크기를 압축해주는 플러그인** 등 몇 백개가 넘는 플러그인이 존재한다. [PostCSS 플러그인](https://www.postcss.parts/) 링크에서 다양한 카테고리로 확인해볼 수 있다.

**Vue**같은 프론트엔드 프레임워크에서는 이런 PostCSS를 **Webpack**과 같이 사용하기 위해 **postcss-loader**를 제공한다. **@vue/cli 4.1.1** 버전 기준으로 기본적으로 **postcss-loader**를 제공한다. 이 로더를 거쳐 많은 플러그인이 해석되고, 최종적으로 만들어진 CSS파일에 명시된 스타일이 사용자에게 보여지게 된다.

## Vue에서 PostCSS 설정하기

먼저, **Webpack** 관련 설정을 해주어야 한다.

```js
# vue.config.js

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

위와 같이 작성하게 되면, 프로젝트 내 모든 CSS파일이 **postcss-loader**를 거쳐 플러그인이 실행되게 된다.

```sh
yarn add --dev cssnano
```

CSS 파일의 크기를 압축시켜주기 위한 PostCSS 플러그인인 **cssnano**를 설치한다.

```js
# postcss.config.js

module.exports = {
  plugins: [
    require('cssnano')({
      preset: 'default'
    })
  ]
}
```

`postcss.config.js`에서 위와 같이 플러그인과 연결시켜준다. **cssnano**는 기본적으로 제공하는 프리셋 외에 다른 프리셋을 사용할 수 있는데, 주석도 한번에 다 없애주는 기능도 있고 다양한 기능들이 있다. 자세한 내용은 [cssnano plugins](https://cssnano.co/guides/presets/)에서 확인하면 된다.

## 결과

![before-cssnano](/images/before-cssnano.png)

(cssnano 적용 전)

![after-cssnano](/images/after-cssnano.png)

(cssnano 적용 후)

지금은 스타일 양이 적어서 변화가 미미할 수도 있겠지만 후에 작성해야 될 스타일이 많아지고 코드의 양이 복잡해지면 훨씬 적은 용량으로 배포할 수 있다.
