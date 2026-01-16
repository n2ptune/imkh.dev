---
title: Node Alpine 이미지에서 lightningcss 관련 바이너리 미설치로 인한 빌드 실패 트러블슈팅
published: true
date: 2026-01-16T05:57:58.137Z
cover_image:
description: Node Alpine 이미지에서 lightning 관련 바이너리를 찾을 수 없다는 메시지와 함께 마주한 빌드 에러, 트러블슈팅한 기록과 내용을 정리
tags: ['nodejs']
---

## Node Alpine 이미지에서 lightningcss 관련 바이너리 미설치로 인한 빌드 실패 트러블슈팅

`vite build` 명령어로 프론트엔드 프로젝트를 빌드하다가 `lightningcss` 관련 에러를 마주했다.

```sh
Error: Cannot find module '../lightningcss.linux-arm-musl.node
```

내가 설치한 모듈은 아니고, `vite`, `@tailwindcss/vite` 의존성 내부에서 사용중인 모듈인듯 하다. [뭐하는 애](https://lightningcss.dev/)인지는 알고 있었는데, CSS 파싱, 변환, 압축 등 CSS 관련 유틸리티 기능을 제공하는 라이브러리다. 다만 Rust 코드로 작성되어 있어 npm 에서는 바이너리 형태로 제공된다.

따라서, 운영체제별로 설치되는 라이브러리가 다르다. 윈도우는 윈도우 전용 라이브러리, 리눅스는 리눅스 전용 라이브러리가 있다. 단, 리눅스 전용 라이브러리라고 하더라도, 사용하는 표준 운영체제 라이브러리 종류에 따라 바이너리의 종류도 달라진다.

가령, 일반적인 리눅스(우분투나 데비안 등)에서는 [glibc](https://www.gnu.org/software/libc/)라는 GNU 프로젝트 진영의 표준 C 라이브러리를 사용한다. 대부분의 리눅스가 여기에 포함되기 때문에 대부분 glibc 기준으로 바이너리도 빌드된다. 문제가 된 건 `node:22-alpine` 이미지를 사용해서 glibc가 아닌 [musl](https://musl.libc.org/)를 표준 C 라이브러리로 사용하는데, 요 바이너리를 다운로드 받지 못한건지 계속 찾을 수 없다는 에러를 마주했다.

```sh
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.53.2.tgz",
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.53.2.tgz",
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.53.2.tgz",
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.53.2.tgz",
        "@tailwindcss/oxide-linux-arm64-musl": "4.1.18",
        "@tailwindcss/oxide-linux-x64-musl": "4.1.18",
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.1.18.tgz",
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.1.18.tgz",
        "lightningcss-linux-arm64-musl": "1.30.2",
        "lightningcss-linux-x64-musl": "1.30.2",
    "node_modules/lightningcss-linux-arm64-musl": {
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.30.2.tgz",
    "node_modules/lightningcss-linux-x64-musl": {
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.30.2.tgz",
        "@rollup/rollup-linux-arm-musleabihf": "4.53.2",
        "@rollup/rollup-linux-arm64-musl": "4.53.2",
        "@rollup/rollup-linux-riscv64-musl": "4.53.2",
        "@rollup/rollup-linux-x64-musl": "4.53.2",
```

package-lock.json 파일 내부 musl 키워드 검색 결과인데, 분명 lightningcss 바이너리가 musl 대상으로도 지정이 되어있다. 이러면 설치가 되어있어야 정상일텐데 무언가 잘못된 걸까. node_modules 를 지우고 클린 설치 이후에도 동일한 에러가 계속해서 발생했다. 물론 alpine 이미지 말고 slim 이미지를 사용하면 바로 해결되는 문제이긴 하지만, 이미지를 바꾸지 않고도 이슈를 해결할 수 있는지가 궁금해져서 여러 방법을 시도해봤다.

- lock 파일 지우고 설치
- 노드 버전 바꾸기
- `apk add --no-cache libc6-compat`
  - musl 환경에서 glibc 의존성이 있는 부분들을 해결해준다.
- `.dockerignore` node_modules 등록

libc6-compat 설치는 효과가 있었다. 다만 이미지를 바꿔버리면 되는 깔끔한 대안이 있어서 slim 이미지로 변경해서 사용했다. node:22-alpine 이미지와 node:22-slim 이미지의 용량 차이는 100MB 조금 안되게 차이가 난다.
