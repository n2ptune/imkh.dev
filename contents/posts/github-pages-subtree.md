---
title: github pages 특정 폴더만 배포 시키기
date: 2020-02-01
published: true
tags: ['git']
cover_image: /images/gh-pages.jpeg
description: github pages 특정 폴더만 배포 시키는 방법 - subtree를 통한 방법
---

## Github Pages 특정 폴더만 배포 시키기

vue-cli로 프로젝트를 만들고 원격 저장소에 푸쉬하게 되면 `.gitignore`에 명시된 폴더나 파일을 제외한 모든 폴더와 파일이 원격 저장소에 저장되게 된다. 만약 이 프로젝트를 원격 저장소에 저장시키고 데모 페이지 또한 배포하려는 상황이라면 이 방법을 사용하여 쉽게 빌드 된 페이지를 배포할 수 있다.

vue-cli로 프로젝트를 만들었다고 가정한다. `.gitignore` 파일에서 다음과 같이 /dist 파일을 주석처리 하거나 없앤다. (vue-cli로 프로젝트를 만들면 기본적으로 ignore 되어있다.)

```sh
...

# /dist

...
```

그런 다음 명령어를 입력해서 파일과 폴더들을 추적가능케 한다.

```sh
git add .
git commit -m 'initial'
```

그런 다음, `git subtree`를 이용해서 `dist` 폴더만 `gh-pages` 브랜치에 배포시킨다.

```sh
git subtree push --prefix dist origin gh-pages
```

새로운 브랜치가 만들어지고 원격 저장소에 이 브랜치가 푸쉬된다. `package.json`에 스크립트로 등록해서 사용할 수도 있다.

```json
"gh-deploy": "git subtree push --prefix dist origin gh-pages"
```

...

```sh
yarn gh-deploy
or
npm run gh-deploy
```
