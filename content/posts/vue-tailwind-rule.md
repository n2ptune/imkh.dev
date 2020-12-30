---
title: Unknown at rule @tailwind 경고 회피하기
date: 2020-12-30 13:18:26
published: true
tags: ['vue']
cover_image: ./images/vscode-custom-data-thumbnail.png
description: tailwind 구문을 CSS 파일에서 사용했을 때 나타나는 경고 문구 회피하기
---

## Unknown at rule ...

`tailwind`를 사용할 때면 아래와 같은 CSS파일을 작성하고 메인에서 임포트 시키는 경우가 많다.

```css
/*! @import */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

CSS파일을 작성하고 `main.js` 혹은 엔트리 포인트에서 위 CSS파일을 임포트한다.

```js
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/index.css' // import tailwindcss

createApp(App).mount('#app')
```

물론, 빌드 혹은 개발 서버를 시작할 때에는 웹팩에서 해당 CSS파일을 `postcss-loader`와 다른 로더를 사용해 처리하므로 `@tailwind` 라는 키워드는 CSS에 없는 구문이지만 정상적으로 처리가 된다.

![vscode warning for unknown rule](./images/vscode-custom-data-thumbnail.png)

VSCode 기준으로는 위와 같은 경고 문구가 뜨게된다. `@tailwind` 키워드를 알 수 없는 키워드로 분류한다. 정상적인 흐름이고 로더를 사용하지 않는다면 이 파일은 반드시 오류를 뱉게된다. 우리는 로더를 사용해서 해당 CSS파일을 처리하므로 경고 문구에 대해 신경 쓸 필요가 없다. 이 문구를 지울 수 있는 방법이 여러가지가 있다.

### postcss 확장자 사용

`index.css` 파일을 `index.pcss`로 바꿔주면 해당 파일은 PostCSS파일로 간주되므로 경고 문구가 없어지게 된다.

### VSCode Custom Data 사용

VSCode 기준으로 CSS파일에 적당한 룰을 끼워넣을 수 있다. 먼저 프로젝트 루트에 `.vscode` 폴더를 만들고 그 안에 `css_custom_data.json` 파일을 하나 만들어준다. (파일 명은 상관 없음)

그리고 VSCode 설정을 바꿔주기 위해 `settings.json`을 연다.

```json
{
  "css.customData": [".vscode/css_custom_data.json"]
  ...
}
```

`css.customData` 속성을 추가해주고 아까 만들었던 파일의 경로를 배열 안에 넣어준다.

```json
{
  "atDirectives": [
    {
      "name": "@tailwind",
      "description": "Use the @tailwind directive to insert Tailwind’s `base`, `components`, `utilities`, and `screens` styles into your CSS.",
      "references": [
        {
          "name": "Tailwind’s “Functions & Directives” documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives/#tailwind"
        }
      ]
    }
  ]
}
```

CSS에서 사용했던 `@screen` 디렉티브 처럼 사용할 수 있게 하기 위해 `atDirectives` 속성에 위와 같은 객체를 넣어준다. 참고 할만한 사이트의 URL도 집어넣을 수 있다. 그 외 가상 클래스, 가상 엘리먼트를 추가해서 넣을 수도 있다. 각각 `pseudoClasses` 속성과 `pseudoElements` 속성에 위와 같은 객체를 넣어주면 된다.

또, 엘리먼트의 속성을 확장할 수도 있다. `properties`라는 속성에 객체를 넣어주면 된다.

그 외, `tailwind`에서 사용하는 `@apply` 디렉티브나 다양한 기능들을 확장해서 경고 문구를 안뜨게 할 수 있다.

## 참고

- [vscode custom data (https://github.com/microsoft/vscode-css-languageservice/blob/master/docs/customData.md)](https://github.com/microsoft/vscode-css-languageservice/blob/master/docs/customData.md)
