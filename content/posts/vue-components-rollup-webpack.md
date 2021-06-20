---
title: Vue 컴포넌트 빌드 전략 롤업과 웹팩 비교
date: 2021-06-20 11:23:01
published: true
tags: ['vue']
cover_image: ./images/vue-rollup-cover.jpg
description: Vue 컴포넌트를 외부로 배포하기 위해 사용하는 번들링 툴 웹팩과 롤업을 사용해보고 비교해서 정리하기
---

## 내 컴포넌트 빌드

라이브러리를 번들링해서 효율적으로 배포하기 위해서 많은 솔루션이 있다. 그 중 가장 대중적인 것이 **웹팩**이라고 하는 오픈소스다. **번들링**이라고 하면 **웹팩**이 생각나듯이 많은 곳에 자리잡은 오픈소스다. 활용되는 곳은 무궁무진하다. 웹팩이 하는 일은 복잡하게 얽힌 자바스크립트 파일들 간에 의존성을 파악하고 이를 하나의 파일로 처리하도록 하거나 비동기적으로 불러올 수 있는 여러 파일들로 조각내준다. 이 기능은 많은 기능들 중 일부에 불과하며 이 외에 정적 파일들을 처리하거나 여러 플러그인을 달아 유용한 기능을 사용할 수 있다.

Vue에서 직접 만든 컴포넌트를 외부에 배포할 때에도 웹팩이 쓰인다. 물론 웹팩뿐만이 아니라 웹팩의 대안으로 나온 여러 번들링 서비스를 사용할 수 있다. 리액트의 경우 단순히 `jsx`를 해석하기 위한 플러그인 혹은 기능을 사용하면 쉽게 컴포넌트를 번들링할 수 있다. 하지만 Vue에서는 `*.vue`라는 파일 확장자를 읽어들이기 위한 별도의 로더가 필요하다. 웹팩에서 사용되는 플러그인은 `vue-loader`라고 Vue 코어팀에서 관리하는 플러그인을 지원한다.

여러 Vue 컴포넌트 빌드 플러그인들과 웹팩과 비슷한 일을하는 **롤업**이라는 오픈소스를 이용해 내 컴포넌트를 빌드하는 방법을 단계적으로 정리하고 실습한다.

### CLI을 통해 빌드하기

> 아래에서 설명하는 모든 방법은 Vue 버전 2에 의존하고 있습니다. 버전 3에 관한 내용은 해당 포스트에서 정리한 내용과 많이 다를 수 있거나 방식이 아예 틀릴 수 있습니다.

`vue-cli`을 이용해서 컴포넌트를 빌드하게 되면 아주 간단하게 내 컴포넌트들을 빌드할 수 있다. cli에서 제공하는 기능을 사용하기 위해 cli을 통해 프로젝트를 세팅한다.

```sh
vue create vue-cli-build-test

Vue CLI v4.5.11
┌─────────────────────────────────────────────┐
│                                             │
│    New version available 4.5.11 → 4.5.13    │
│   Run yarn global add @vue/cli to update!   │
│                                             │
└─────────────────────────────────────────────┘

? Please pick a preset: (Use arrow keys)
❯ Default ([Vue 2] babel, eslint)
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)
  Manually select features
```

Default(Vue version 2)를 선택하고 프로젝트를 세팅한다. 그 후 외부로 배포하고 싶은 컴포넌트를 하나 작성한다.

```sh
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

만들어진 프로젝트는 위와 같은 구조를 가진다. (node_modules 포함)

```html
<!-- ExampleComponent.vue -->
<template>
  <div>Example Component {{ interval }}</div>
</template>

<script>
  export default {
    data: () => ({
      interval: 0
    }),
    created() {
      setInterval(() => (this.interval += 1), 1000)
    }
  }
</script>
```

외부로 배포하기 위한 테스트 컴포넌트를 하나 작성한다. 1초마다 `interval` 값을 1 늘려주는 매우 단순한 컴포넌트를 작성했다.

```js
// Example.lib.js
import Component from './ExampleComponent.vue'

Component.install = Vue => {
  Vue.component('test-component', Component)
}

export default Component
```

해당 컴포넌트를 플러그인 형태로 배포하기 위한 자바스크립트 파일을 작성한다. 이렇게 하는 이유는 매우 간단하다. 각각의 컴포넌트가 독립적으로 개발되었을 때 해당 컴포넌트가 사용되기 위해서 서로 다른 컴포넌트가 사용될 수 있고 디렉티브, 믹스인 등 다양한 Vue의 옵션을 사용할 수 있다. 따라서 내보내는 객체가 `Vue.use(Component)` 형태로 호출되게 하고, 위 일련의 과정을 작성해놓으면 최종적으로 사용하는 입장에서 이 컴포넌트를 사용하기 위해 많은 Vue 옵션들을 다시 정의할 필요가 없기 때문에 편리하다.

```js
// main.lib.js
import Vue from 'vue'
import Example from './components/Example.lib'

Vue.use(Example)

export default {
  Example
}
```

빌드 엔트리포인트가 되는 파일을 작성한다. 이 파일이 vue-cli에서 빌드될 때 진입점이 된다. 여기서 모든 컴포넌트들을 외부 Vue 프로젝트에서 사용될 수 있게 코드를 작성한다.

```js
// main.lib.js
import Vue from 'vue'
import Example from './components/Example.lib'
import Example2 from './components/Example2.lib'
import Example3 from './components/Example3.lib'
import Example4 from './components/Example4.lib'
import Example5 from './components/Example5.lib'
import Example6 from './components/Example6.lib'
import Example7 from './components/Example7.lib'
import Example8 from './components/Example8.lib'
import Example9 from './components/Example9.lib'

const Components = [
  Example,
  Example2,
  Example3,
  Example4,
  Example5,
  Example6,
  Example7,
  Example8,
  Example9
]

Components.forEach(component => Vue.use(component))

export default {
  Example
}
```

컴포넌트 수가 극단적으로 많아질 시를 대비해 각각의 컴포넌트의 `install` 메서드를 실행해줄 간단한 코드를 작성한다.

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "build:lib": "vue-cli-service build --target lib --name example-components ./src/main.lib.js"
  }
}
```

`package.json` 파일의 `scripts` 부분 `build:lib` 명령어를 하나 추가한다. `--target` 옵션을 통해 해당 Vue 프로젝트를 어플리케이션 모드로 빌드할지, 라이브러리 모드로 빌드할지를 결정할 수 있다. 기본값은 어플리케이션 모드이므로 해당 옵션을 다른 값으로 지정하지 않으면 Vue를 사용한 웹 어플리케이션 형태로 빌드된다. 여기에선 라이브러리 모드를 사용하는게 목적이므로 `lib` 값을 지정해주고 `--name` 옵션으로 빌드될 라이브러리의 이름을 지정한다. 그리고 마지막으론 아까 작성했던 엔트리포인트 파일의 경로를 작성한다.

```sh
npm run build:lib

 DONE  Compiled successfully in 598ms                                                                                                                                                                                                9:03:54 PM

  File                                  Size                                                                                              Gzipped

  dist/example-components.umd.min.js    3.73 KiB                                                                                          1.66 KiB
  dist/example-components.umd.js        13.80 KiB                                                                                         4.18 KiB
  dist/example-components.common.js     13.31 KiB                                                                                         4.05 KiB

  Images and other types of assets omitted.
```

sourceMap과 최적화되지 않은 파일, 최적화된 파일 총 3개의 파일이 여러 포맷으로 빌드된다. 브라우저/Node.js에서 둘다 사용가능한 UMD 모듈과 commonJS 모듈로 빌드해준다.

vue-cli 라이브러리 모드로 빌드할 때에는 빌드된 파일 안에 Vue 코어에 대한 소스코드가 없는데, 이는 라이브러리를 사용하는 프로젝트에 Vue가 포함될 것이기 때문에 빌드 파일이 Vue를 포함하지 않는다. 다만 해당 라이브러리가 프로젝트에 의존적이지 않고 standalone 형태로 독립적인 실행이 가능하도록 하려면 Vue에 대한 코드를 담아야한다. 라이브러리를 빌드할 때 `--inline-vue` 옵션을 통해 Vue 코드를 라이브러리 코드에 심을 수 있다.

### CLI을 통하지 않고 웹팩으로 빌드하기

CLI로 만든 프로젝트는 결국 내부적으로 웹팩을 사용한다. `vue.config.js`에 정의된 웹팩 설정에 의존해서 프로젝트를 라이브러리로 빌드한다. 이 단계에서는 CLI을 사용하지 않고 쌩 웹팩을 사용해서 프로젝트를 라이브러리 형태로 빌드하는 방법을 정리한다.

```sh
npm init -y
npm i -D webpack webpack-cli vue@2.6.12 vue-template-compiler@2.6.12 vue-loader@15.9.7 css-loader
```

빌드에 필요한 의존성을 설치한다. `webpack`과 `webpack-cli`는 우리의 컴포넌트들을 번들링하기 위한 패키지이고, 다른 모든 것은 Vue 컴포넌트를 해석하기 위한 패키지이다.

```html
<template>
  <div>Hello world {{ data }}</div>
</template>

<script>
  export default {
    data: () => ({
      data: 0
    }),
    created() {
      setInterval(() => (this.data += 1), 1000)
    }
  }
</script>

<style scoped>
  div {
    color: red;
  }
</style>
```

CLI에서 작성했던 컴포넌트와 비슷하게 작성한다. 여기서는 스타일 또한 빌드 타임에 포함되는지를 테스트하기 위해 간단한 스타일을 포함한다. scoped style이 잘 먹는지 테스트 해보기 위해 `scoped` 옵션을 포함한다.

```js
import TestComponent from './test.vue'

TestComponent.install = Vue => {
  Vue.component('test-component', TestComponent)
}

export default TestComponent
```

마찬가지로 해당 컴포넌트를 연결하기 위한 자바스크립트 파일을 작성한다.

```js
import TestComponentInstall from './components/index'

export default {
  install(Vue) {
    Vue.use(TestComponentInstall)
  }
}
```

엔트리포인트 파일을 작성한다.

```sh
├── build-webpack
│   └── main.js
├── package-lock.json
├── package.json
├── src
│   ├── components
│   │   ├── index.js
│   │   └── test.vue
│   └── index.js
└── webpack.config.js
```

최종적으로 프로젝트 구조는 위와 같이 된다.

```js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build-webpack'),
    filename: '[name].js',
    library: {
      type: 'umd',
      name: 'test-element'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.s?css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [new VueLoaderPlugin()]
}
```

웹팩 설정에 대한 파일을 프로젝트 루트에 작성한다.

```json
{
  "scripts": {
    "build:webpack": "rm -rf build-webpack && webpack --config webpack.config.js"
  }
}
```

`package.json` 파일에 해당 명령어를 추가한다. 최종적으로 빌드된 파일은 `build-webpack` 이라는 폴더에 생성된다.

```sh
npm run build:webpack

> vue-test@1.0.0 build:webpack
> rm -rf build-webpack && webpack --config webpack.config.js

asset main.js 4.75 KiB [emitted] [minimized] (name: main)
orphan modules 5.78 KiB [orphan] 9 modules
runtime modules 937 bytes 4 modules
cacheable modules 15.5 KiB
  modules by path ./src/ 7.22 KiB
    ./src/index.js + 8 modules 5.29 KiB [built] [code generated]
    ./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/test.vue?vue&type=style&index=0&id=e43c18bc&scoped=true&lang=css& 1.6 KiB [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/test.vue?vue&type=style&index=0&id=e43c18bc&scoped=true&lang=css& 345 bytes [built] [code generated]
  modules by path ./node_modules/ 8.28 KiB
    ./node_modules/vue-style-loader/lib/addStylesClient.js + 1 modules 6.71 KiB [built] [code generated]
    ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
webpack 5.39.1 compiled successfully in 729 ms
```

정상적으로 번들링이 끝났다. 여기서 자바스크립트 파일에 대해 바벨 로더를 추가하거나 타입스크립트를 사용한다면 타입스크립트 로더를 통해 자바스크립트 파일로 변환할 수 있다. scss를 사용한다면 `scss-loader`를 통해 스타일 파일을 컴파일할 수 있다.

### 롤업으로 빌드하기

롤업은 웹팩과 비슷한 기능을 하는데, 최종적으로 빌드된 결과물이 웹팩과 비교했을 때 상대적으로 더 가볍다는 이야기를 들었다. (오피셜 아님) 따라서 프로젝트를 빌드할 때에는 여러 자산을 처리하는 플러그인의 갯수가 월등히 많은 웹팩을 사용하고, 라이브러리 등 프로젝트 내부에 사용될 프로젝트에는 롤업을 사용하면 어떨까 라는 생각을 했다.

```sh
npm i -D rollup rollup-plugin-terser rollup-plugin-vue@5.1.9
```

롤업으로 빌드하기 위한 의존성을 추가한다. `rollup-plugin-vue`는 반드시 버전을 지정해서 설치해야한다. 최신 버전은 Vue 3용 플러그인이다.

```js
// rollup.config.js
const { defineConfig } = require('rollup')
const { terser } = require('rollup-plugin-terser')
const vue = require('rollup-plugin-vue')

export default defineConfig({
  input: 'src/index.js',
  output: [
    {
      format: 'umd',
      name: 'test',
      file: 'build-rollup/test.js'
    },
    {
      format: 'umd',
      name: 'test',
      file: 'build-rollup/test.min.js',
      plugins: [terser()]
    }
  ],
  plugins: [vue()]
})
```

설정 파일을 작성한다. 서로 다른 포맷에 대해 빌드 파일을 여러 개로 떨어뜨릴 수 있다. 각각의 빌드 파일에 개별 플러그인을 사용할 수 있고, 글로벌로 적용될 플러그인 또한 지정할 수 있다. `terser` 플러그인은 파일을 더 압축시키게 도와주는 플러그인이다. 자세한 내용은 [여기](https://github.com/terser/terser)를 참고

```json
{
  "scripts": {
    "build:webpack": "rm -rf build-webpack && webpack --config webpack.config.js",
    "build:rollup": "rm -rf build-rollup && rollup --config rollup.config.js",
    "build": "npm run build:rollup && npm run build:webpack"
  }
}
```

아까 작성했던 웹팩 관련 명령어 밑에 `rollup` 관련 명령어를 추가한다. 최종적으로 빌드 파일은 `build-rollup` 폴더 밑에 생성된다. 또한 웹팩과 롤업 빌드를 한꺼번에 실행하기 위한 명령어도 작성한다.

```sh
npm run build

> rollup-vue-test@1.0.0 build
> npm run build:rollup && npm run build:webpack


> rollup-vue-test@1.0.0 build:rollup
> rm -rf build-rollup && rollup --config rollup.config.js

clean: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration

src/index.js → build-rollup/test.js, build-rollup/test.min.js...
created build-rollup/test.js, build-rollup/test.min.js in 443ms

> rollup-vue-test@1.0.0 build:webpack
> rm -rf build-webpack && webpack --config webpack.config.js

asset main.js 4.75 KiB [emitted] [minimized] (name: main)
orphan modules 5.78 KiB [orphan] 9 modules
runtime modules 937 bytes 4 modules
cacheable modules 15.5 KiB
  modules by path ./src/ 7.22 KiB
    ./src/index.js + 8 modules 5.29 KiB [built] [code generated]
    ./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/test.vue?vue&type=style&index=0&id=e43c18bc&scoped=true&lang=css& 1.6 KiB [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/test.vue?vue&type=style&index=0&id=e43c18bc&scoped=true&lang=css& 345 bytes [built] [code generated]
  modules by path ./node_modules/ 8.28 KiB
    ./node_modules/vue-style-loader/lib/addStylesClient.js + 1 modules 6.71 KiB [built] [code generated]
    ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
webpack 5.39.1 compiled successfully in 684 ms
```

롤업은 빌드에 걸린 시간이 400~500ms 정도로 웹팩보다 미세하게 빠르다. (매우 간소한 컴포넌트로 테스트한 결과입니다.) 여러 컴포넌트를 빌드할 때에는 어떨지 모르겠으나 속도면과빌드 파일의 사이즈면에서는 롤업이 더 우수한 것 같다.

## 정리

Vue 컴포넌트를 외부에 배포하기 위한 여러가지 방법이 있다. 어떠한 솔루션도 사용할 수 있지만 Vue 싱글 파일 컴포넌트를 해석할 수 있는 플러그인이 존재해야 하고 없으면 직접 만들어야 한다. 개발 서버, 풍부한 플러그인 및 로더를 가지고 있는 웹팩이 아직까지는 많이 쓰이고 있지만 웹팩의 대안으로 나온 여러 솔루션들이 웹팩의 어떤 문제점을 해결하고자 나왔는지 혹은 어떠한 철학을 가지고 개발되었는지 알아볼 필요가 있다.

여기에서는 롤업으로 빌드하는 방법과 웹팩으로 빌드하는 방법 두 가지를 사용했지만 롤업의 문서는 웹팩만큼 자세하지 않고 커뮤니티가 웹팩에 비해 작은 것 같다. 하지만 웹팩의 설정 파일과 비교했을 때 롤업이 훨씬 간소하고 간단한 느낌을 받았다.

롤업을 쓸 수 있는 환경이면 적극적으로 롤업을 사용할 수 있을 것 같다.
