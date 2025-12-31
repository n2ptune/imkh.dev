---
title: core-js polyfill 학습하기
published: true
date: 2025-12-31T05:00:21.883Z
cover_image: 
description: core-js 라이브러리를 통해 자바스크립트 최신 기능을 구형 브라우저에서도 사용할 수 있게 하는 polyfill 에 대해서 학습하고, vite 기반 프로젝트에서는 어떻게 지원하고 있는지 학습하고 정리하기
tags: ["javascript"]
---

## core-js polyfill 학습하기

vite 기반 프로젝트를 많이 진행해오면서 구형 브라우저와의 호환성을 생각하지 않는 것 같다. 이번 기회에 경각심을 가지고, vite 기반 프로젝트에서 하위 호환성을 깨뜨리지 않고 최신 자바스크립트 문법 및 기능을 사용할 수 있는 방법에 대해서 정리하고 학습한다.

### (부제) tsconfig.json 및 번들러에서의 ESNext, ES2020 등의 의미

가끔 `tsconfig.json` 파일이나 번들러의 설정 파일 중 `target` 옵션 등으로 `ES2020`, `ESNext` 이런 값들을 자주 보는데, 이런 값들은 무얼 의미하는 걸까? 막연하게 생각했을 때, 우리 프로젝트가 딱 그 정도까지 지원한다는 것인가? 정도로 생각했었는데, 이번 학습을 통해 알게된 내용을 정리한다.

- `tsconfig.json` 내용의 `target` 값이 `ESNext` 일 때에는 타입스크립트가 자바스크립트로 변환될 때, 지정된 타입스크립트의 버전에서 정한 가장 최신의 자바스크립트 문법 및 기능에 대해서 문법 변환을 시도하지 않고 그대로 자바스크립트로의 변환을 수행한다. 예로, `target` 값이 매우 낮은 버전 (`ES5`)인 경우 화살표 함수 (`() => {}`) 등을 `function() {}` 같은 일반 함수 선언 문법으로 변환하는 과정을 들 수 있다.
- 번들러에서 사용하는 `ESNext` 의 의미는 최신 자바스크립트 문법이나 기능에 대해서 polyfill 을 수행하지 않고 그대로의 자바스크립트로 변환한다는 뜻이다.

쉽게 생각해서 `ESNext` 의 뜻은 **내 프로젝트를 사용하는 대상(사용자)은 전부 자바스크립트 최신 기능을 지원하는 모던 브라우저의 최신 버전을 사용하니, 최신 기능 및 문법에 대해서 변환하는 과정을 거칠 필요가 없다**고 설명해주는 것과 같다는 말로 이해하면 편할 것 같다.

## @vitejs/plugin-legacy 플러그인 사용하기

vite plugin 중 [@vitejs/plugin-legacy](https://www.npmjs.com/package/@vitejs/plugin-legacy) 플러그인의 경우 구형 브라우저와의 호환성 문제 없이 vite 에서 빌드 결과물에 legacy 용 코드를 자동으로 넣어주는 기능을 제공한다. 따라서, 브라우저 호환성을 깨뜨리지 않고 최신 기능 및 문법을 제공할 수 있는 가장 직관적이고 효율적인 솔루션이다.

```sh
npm i -D @vitejs/plugin-legacy
```

플러그인은 기본적으로 설치되어 있지 않으므로 설치를 진행한다.

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { resolve } from "node:path";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  root: "./",
  build: {
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [legacy()], // legacy 플러그인 사용
});
```

`vite.config.ts` 파일을 작성하고 플러그인을 구성한 뒤 빌드를 진행하면 legacy 결과물까지 반환해준다.

```sh
vite v7.3.0 building client environment for production...
✓ 3 modules transformed.
dist/assets/main-legacy-Ce5GIYIU.js        0.17 kB │ gzip:  0.17 kB │ map:   0.30 kB
dist/assets/polyfills-legacy-CWEGv_fb.js  59.34 kB │ gzip: 23.08 kB │ map: 282.09 kB
dist/index.html               1.52 kB │ gzip: 0.72 kB
dist/assets/main-DFsmjLbz.js  0.92 kB │ gzip: 0.54 kB │ map: 0.30 kB
```

`polyfills-legacy-CWEGv_fb.js` 파일이 생성됬는데, 사용된 최신 기능은 `Array.prototype.with` 메서드 뿐인데, 무언가 많은 polyfill 이 같이 삽입되었다. 어느 기준으로 삽입되는 것일까?

### @vitejs/plugin-legacy 가 polyfill 을 삽입하는 기준

- 코드 분석: 최신 문법과 기능에 대해서 사용되어 있는지 파악하고, 사용되어 있는 기능들에 한해 `core-js` 에서 찾아서 등록
- legacy 플러그인 `targets` 옵션에 들어있는 대상들에 대한 polyfill 지원
- 위 옵션과 관련하여 `polyfill` 옵션도 관여하는데, leagcy 번들에 등록할 `core-js` 모듈을 선택하는 옵션이다. 이 값은 기본적으로 `true` 로 설정되어 있어, `targets` 에 명시된 대상에 대한 polyfill 을 삽입한다. `true` 외 명시적으로 `core-js` 모듈을 선택해서 삽입할 수 있다.

### legacy 와 modern

legacy 번들이 아닌 번들을 modern 이라 지칭하고, 여태까지는 legacy 를 위한 설정을 해왔다면 modern 에 대한 polyfill 도 삽입할 수 있다. 예를 들어 legacy 지원 대상(targets)이 `chrome >= 64` 인 상태에서 사용자가 chrome 80 버전으로 이용한다면 modern 번들이 사용되는데, 이 경우 legacy 플러그인의 `modernPolyfill` 옵션을 통해 polyfill 을 삽입할 수 있다.

```ts
...
  plugins: [legacy({
    modernPolyfills: ['es.array.with']
  })],
...
```

위와 같이 `es.array.with` 만 `core-js` 모듈에서 선택하여 modern 번들에 포함시킬 수 있다.

### legacy 번들 용량

legacy 환경의 경우 Native ESM 을 지원하지 않기 때문에 이를 실행해줄 솔루션이 필요하다. [SystemJS](https://github.com/systemjs/systemjs)로 이러한 문제를 해결하는데, 관련 코드가 같이 삽입되기 때문에 용량이 조금 늘어난다.

## core-js 수동으로 사용

위 vite 플러그인을 사용하지 않고 `core-js` 모듈을 직접적으로 import 하여 polyfill 을 제공하는 방법도 드물지만 가장 확실한 방법이라고 생각된다. vite 기반 프로젝트가 아니라면 이런 식으로 polyfill 을 제공하는 것도 합리적이라고 생각된다.

```js
import "core-js/es/array/with";

const arr = [1, 2, 3];
const withArr = arr.with(1, 6);
console.log(withArr);
```

`core-js` 에서 `Array.prototype.with` 을 지원하지 않는 브라우저의 경우 동일한 기능을 하는 코드로 정의해준다.

