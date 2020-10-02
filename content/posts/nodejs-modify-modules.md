---
title: node_modules modify dependency 의존성 패키지 수정하기
date: 2020-10-02 17:45:31
published: true
tags: ['nodejs']
cover_image:
description: 의존성으로 설치 된 패키지를 수정하는 방법에 대해서 정리하고 알아보기
---

## Node Modules 패키지 직접 수정하기

가끔 종속성으로 설치 된 패키지의 어떠한 점을 수정해서 사용하면 좋은 상황이 있다. 이 변경사항이 이 패키지를 사용하는 다른 유저에게도 확연히 유용하고 좋은 방향으로 나아갈 수 있는 점을 가지고 있다면 직접 레포에 Pull Request를 할 수 있다. 그렇지 않고 내 프로젝트에서만 유용하다면 직접 수정해서 사용할 수 있어야 한다. 여기서는 직접 패키지를 수정할 수 있는 여러가지 방법을 정리한다.

## Repository Fork

저장소를 Fork 떠서 저장소 프로젝트를 내 프로젝트에 설치하면 된다. 먼저 Fork 할 프로젝트 한 개를 정해서 Fork 한다. 그런 다음 변경사항을 적용하고 의존성을 추가할 프로젝트에서 아래와 같이 입력한다.

```sh
npm install https://github.com/[user_id]/[repository_name]
```

변경사항이 저장 된 패키지가 설치되었다. 원본 저장소가 업데이트될 때에는 마찬가지로 내 저장소에 있는 프로젝트도 업데이트를 해주어야 한다. 매우 간단한 변경사항을 적용하려면 매우 간단한 방법이다.

하지만, 이러한 변경사항을 적용한 것을 다른 사람에게 보이고 싶지 않을 경우도 있고 레포에 이런 걸 남기고 싶어하지 않을 수 있다. 이런 점이 단점인 것 같다.

## patch-package

이 패키지를 이용하면 node_modules 안에 패키지를 수정하고 나중에 이 프로젝트를 지우고 다시 설치하거나 다른 곳에서 이 프로젝트를 이용해도 패키지를 수정한 변경사항이 적용되어 예상한대로 기능이 작동되게 할 수 있다. `npx`를 이용해서 쉽게 사용할 수 있다.

제일 먼저, node_modules 안에 변경사항을 적용하고 싶은 패키지를 수정한다. 그리고 아래와 같이 입력한다.

```sh
npx patch-package [package_name]
```

그러면 현재 프로젝트 내부에 patches 라는 폴더가 생기고 그 안에 변경사항을 추적하는 파일이 생성된다. 이제 아래 스크립트를 추가해서 의존성이 설치될 때 패키지 변경사항을 적용시킨다.

```json
// package.json

"scripts": {
	"postinstall": "npx patch-package"
}
```

위 스크립트는 프로젝트의 의존성이 모두 설치되고 난 다음에 실행된다. `patch-package` 패키지가 변경사항을 알아서 적용시켜 준다. 👍👍

## 참고

- [patch-package (npmjs.com)](https://www.npmjs.com/package/patch-package)
- [stackoverflow (how-to-edit-a-node-module-installed-via-npm)](https://stackoverflow.com/questions/13300137/how-to-edit-a-node-module-installed-via-npm)
