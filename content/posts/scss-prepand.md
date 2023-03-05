---
title: SCSS Loader prepandData와 additionalData 정리
date: 2021-11-10T04:53:44.727Z
published: true
tags: ['scss']
cover_image: ./images/scss-prepand-thumbnail.jpg
description: 웹팩 SASS(SCSS) Loader의 prepandData와 additionalData 옵션에 대해서 정리
---

## Loader

`scss` 확장명은 브라우저가 읽을 수 있는 형태가 아니니 프론트엔드 코드 빌드 과정에서 `css` 파일로 변환하는 작업이 필요하다. `scss` 및 `sass` 파일을 웹팩으로 빌드할 때 사용되는 로더가 `scss-loader`다. `scss` 파일에서 작성했던 변수나 믹스인 등은 실제 스타일 코드가 아니므로 빌드시 삭제된다. 대신 해당 변수를 사용한 곳은 변수의 값으로 치환되어 스타일 코드가 생성된다.

스타일 코드에 자주 작성되는 색상 값이나 픽셀 값을 변수용 파일에 작성해서 다른 `scss` 파일에서 변수 파일을 `import` 한 후에 해당 변수를 사용하는 방법이 일반적이다. 하지만 변수 파일을 매번 `import` 해줘야하는 번거로움이 있고 믹스인 등 다른 기능들을 모아놓은 파일을 또 불러와야 한다면 매번 `import` 문과 파일의 경로까지 써줘야하는 불편함이 있다.

이런 불편함을 해소해주는 옵션인 `prepandData`와 `additionalData` 옵션에 대해서 정리한다.

## 차이점

`prepandData`와 `additionalData`의 기능은 동일하다. 다만 `sass-loader`의 버전이 올라감으로써 `prepandData`라는 이름이 `additionalData`로 변경되었다. 9버전 미만 에서는 `prepandData`를 사용하고 그 위 버전은 `additionalData` 옵션명을 사용하는 듯하다.

## 사용

`vue`에서 싱글 파일 컴포넌트 형태로 컴포넌트 코드를 작성할 때, 우리가 전역적으로 사용할 변수를 한 스타일 파일에 작성해놓았다면 그 파일을 `import`해서 변수를 사용할 수 있다. 이렇게 매번 사용하면 불편하므로 해당 변수 파일을 불러오는 구문을 모든 부분에서 사용할 수 있도록 `vue.config.js`를 수정한다.

```js
module.exports = {
  // ...
  css: {
    loaderOptions: {
      sass: {
        prepandData: "@import '@/style/variables.scss';"
      }
    }
  }
  // ...
}
```

위 옵션을 지정하고 `extract` 옵션까지 `true`로 설정했다면 추출되는 모든 스타일 파일에 변수에 대한 정보가 불러와져서 치환되므로 컴포넌트 파일 어느 곳에서나 `import` 구문 없이 변수를 사용할 수 있게 된다.

변수 외 믹스인이나 여타 다른 유틸 함수를 작성해놓았다면 이 역시 옵션을 통해 `import` 구문 없이 사용할 수 있게 된다.

## 주의

`extract` 옵션이 설정되어 있으면 해당 컴포넌트에서 스타일 부분만 추출하여 `css` 파일을 만들어낸다. 그리고 컴포넌트가 비동기적으로 로딩될 수 있다면 그 컴포넌트가 필요한 시점에 자바스크립트 파일과 스타일 파일이 같이 불러와진다.

이런 경우 전역적으로 불러오는 `scss` 파일에 어떤 엘리먼트의 스타일을 지정한다면 그 스타일 지정 구문이 `extract` 되는 파일의 갯수만큼 붙여넣어 진다. 즉 불필요한 중복이 적으면 몇 십개, 추출되는 스타일 파일에 따라 몇 백개, 몇 천개가 될 수도 있다.

따라서 아래 리스트를 체크해볼 필요가 있다.

- `prepandData` 혹은 `additionalData`로 선언된 `scss` 파일에 특정 엘리먼트의 스타일을 지정하는 코드가 넣어지지 않았는지
- 전역적으로 사용하지 않는 파일이 같이 넣어지지는 않았는지
- 한번만 불러오면 되는 스타일 파일이 여러 번에 걸쳐 `import` 되도록 하진 않았는지

## 참고

- [웹팩 공식 홈페이지](https://webpack.js.org/loaders/sass-loader/#additionaldata)
