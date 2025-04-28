---
description: 가져온(Fork) 저장소를 최신 상태로 동기화하기
cover_image:
tags: ['git']
published: true
date: 2020-04-01
title: 원본 저장소의 내용을 최신화 시키기
---

## Fork 뜬 저장소를 최신화 시켜야 되는 이유

아마 이 기능이 필요한 이유는 지속적으로 오픈소스에 기여하고 있는 경우 혹은 원본 저장소가 업데이트 되기 전 Fork를 뜨고 그 후에 작업을 진행하는 경우 등이 있다. 두 가지의 경우엔 원본 저장소의 수정 내역을 Fork 뜬 저장소에 적용시켜야 되기 때문에 이럴 경우 이 기능이 유용하게 쓰일 수 있다.

방법은 간단하게 Fork 뜬 저장소를 삭제하고(만약 내 수정 내역이 있다면 복사 시킨 후) 업데이트 된 저장소를 다시 Fork 뜨면 된다. 이럴 경우 내 수정 내역이 많아질 수록 다시 붙여넣어야 될 부분이 많아지기 때문에 많은 번거로움이 있다.

`upstream`을 이용한 아주 간단한 방법이 있다.

## Upstream, Downstream, origin

일반적으로 오픈소스에 기여하는 방법으로 프로젝트에 `pull request`를 날리는 방법이 있다. 여러 가지 방법이 있겠지만, 내가 주로 사용하는 방법은 다음과 같다.

- 원본 저장소를 내 저장소로 Fork한다.
- 새로 브랜치를 만든다.
- 수정해야 될 내용을 수정한다.
- 내 저장소에 Push한다.
- 원본 저장소에 `pull request`를 날린다.
- 원본 저장소와 Merge된다.

위와 같은 내용으로 아마 오픈소스 프로젝트에 기여할 수 있지 않을까 싶다.

원본 저장소의 변경 내용을 추적하기 위해서 `upstream`으로 지정하는 방법이 있다. `upstream`이란 흐르는 물에 비유하자면 윗 부분에 해당한다. 반대로 `downstream`이란 물이 흐르는 아랫 부분에 해당한다.

이 개념을 저장소에 표현하자면 원본 저장소는 `upstream`이 되고 내가 Fork 떠서 저장소를 만들게 되면 그 저장소는 `downstream`이다. `upstream`은 하나지만, `downstream`은 여러 개가 될 수도 있다.

`origin`은 원본 저장소를 Fork 뜨게 되면 내 저장소는 기본으로 `origin` 리모트를 갖는다.

## git upstream

먼저 아무 저장소나 한개 Fork를 떠본다. 그런 다음 로컬에서 클론한 후에 `git remote -v` 명령을 실행한다.

```bash
git remote -v

origin  https://github.com/n2ptune/first-project.git (fetch)
origin  https://github.com/n2ptune/first-project.git (push)
```

기본적으로 `origin`이 붙었다. 여기서 `upstream`을 리모트에서 추가시켜준다.

```bash
git remote add upstream https://github.com/rise-web/first-project.git
git remote -v

origin https://github.com/n2ptune/first-project.git (fetch)
origin https://github.com/n2ptune/first-project.git (push)
upstream https://github.com/rise-web/first-project.git (fetch)
upstream https://github.com/rise-web/first-project.git (push)
```

`git remote -v` 명령을 통해 리모트가 추가가 되었는지 확인한다. 표시되는 것 처럼 추가가 잘 되었다. 이제 원본 저장소의 업데이트 내역을 받아오기 위해 `fetch`를 사용한다.

```bash
git fetch upstream

remote: Enumerating objects: 1, done.
remote: Counting objects: 100% (1/1), done.
remote: Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (1/1), done.
From https://github.com/rise-web/first-project
 * [new branch]      master     -> upstream/master
 * [new branch]      yoonah     -> upstream/yoonah
```

원본 저장소의 브랜치들이 가져와졌다. 확인을 해보자.

```bash
git branch -v

* feat/front 0051cc1 fix: dev proxy server rewrite path
  master     88757e7 first commit
  yoonah     c0fae3e create back-end scaffold
```

내가 작업하고 있는 브랜치는 `feat/front`고, 원본 저장소에 있던 다른 두 개의 브랜치가 모두 잘 가져와졌다. 이제 내 브랜치와 원본 저장소의 브랜치를 `merge` 시킨다.

```bash
git merge upstream/master

....

git push
```

마스터 브랜치와 `merge` 시킨 후 내 저장소에 푸쉬한다. 그런 다음 원본 저장소에 `pull request`를 날리면 된다.

## 참고

- [https://www.koskila.net/how-to-git-merge-upstream/](https://www.koskila.net/how-to-git-merge-upstream/)
- [https://developer-alle.tistory.com/315](https://developer-alle.tistory.com/315)
