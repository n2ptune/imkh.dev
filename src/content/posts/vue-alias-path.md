---
title: Vue에서 경로 별칭(@, ~ 등) 사용하기
date: 2019-12-13
published: true
tags: ['vue']
cover_image: /images/Vue.js-cta-main.jpg
description: Vue에서 경로 별칭(@, ~ 등) 절대 경로를 손쉽게 사용하는 방법, VSCode 자동 완성 기능 연동 방법을 소개합니다.
---

## 경로 별칭이란

경로 별칭은 아래와 같이 경로에 별명(별칭)을 주는 것입니다. 예를 하나 들면, `Vue`에서 컴포넌트를 하나 임포트할려고 합니다. 그러면 아래와 같이 할 수 있겠지요.

```js
import NotFound from './NotFound'

export default {
  components: {
    NotFound
  }
}
```

위와 같이 쓸 수 있습니다. 그런데, 좀 더 규모가 있는 어플리케이션이고 컴포넌트가 매우 많아 많은 폴더로 나뉘어져 있다면 컴포넌트에서 컴포넌트를 포함하는 경우 매우 복잡해질 수 있습니다. 예를 들어 이런 경우입니다.

```js
# components/section/blah/etc/NotFound.vue

import ErrorName from '../../../error/data/ErrorName'

export default {
  components: {
    ErrorName
  }
}
```

**components/section/blah/etc** 폴더 안에 존재하는 `NotFound` 컴포넌트는 **components/error/data** 폴더의 `ErrorName` 이라는 컴포넌트를 자식 컴포넌트를 가져야 할 상황입니다. 이런 경우 매우 복잡해집니다. 이 문제는 `vue.config.js` 파일의 웹팩 설정에서 바꿀 수 있습니다.

## 경로 별칭 설정 (vue.config.js)

```js
# vue.config.js

const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src/'))
  }
}
```

`Vue`에서 경로를 사용하는 구문(css에서 `url()` 혹은 `import()`, `require()`, `img` 태그의 `url` 속성 등)을 웹팩에서 번들시킬 때 '@'라는 경로를 만나면 src/ 경로로 바꿔주는 설정입니다. 이렇게 하면 다음과 같이 컴포넌트를 불러올 수 있습니다.

```js
# components/section/blah/etc/NotFound.vue

export default {
  components: {
    ErrorName: () => import('@/error/data/ErrorName')
  }
}
```

좀 더 간결해지지 않았나요? 이제 컴포넌트를 불러와야 될 상황이 오면 절대경로인 '@'를 사용해 현재의 컴포넌트가 속해있는 폴더에 구애받지 않고 어디서든 컴포넌트를 불러올 수 있습니다.

## 경로 별칭 설정 (VSCode)

한 가지 문제가 있습니다. 위의 설정으로 인해서 `Vue`와 웹팩은 '@'가 뭔지 압니다. 하지만 우리의 에디터는 아직 '@'가 뭔지 모릅니다. 안알려주었기 때문이죠.

![vscode-alias](/images/vscode-alias.gif)

만약 VSCode에서도 이 '@'이 뭔지 알고 자동 완성을 시켜주면 정말 편할 것 같습니다. 우리만 이런 생각을 했던 것이 아닌지 VSCode에서는 `jsconfig.json`을 통해 VSCode에게 '@'가 뭔지 알려주면 가능합니다. 아래와 같이 작성해보세요.

```json
# jsconfig.json

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ],
      "@@/*": [
        "./*"
      ]
    }
  },
  "exclude": [
    "node_modules",
    "dist",
    "public"
  ]
}
```

루트 디렉터리에 `jsconfig.json`을 위와 같이 작성하고 `Ctrl+Shift+P`로 커맨드 창을 띄운 뒤 **Reload Window**로 VSCode를 다시 띄워줍니다. 그런 뒤 한번 다시 작성해볼까요?

![vscode-alias-2](/images/vscode-alias-2.gif)

짜잔! 이제 VSCode도 '@'를 알아서 자동 완성을 시켜줍니다. 타입스크립트 사용자는 `tsconfig.json`을 작성해야 되는 것으로 알고있습니다. 혹시 다른 의견이 있으신 분들은 [github](https://github.com/n2ptune/dev-blog)에 이슈를 등록해주세요.
