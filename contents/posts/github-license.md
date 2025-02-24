---
title: github repository(원격 저장소)에 license 추가하기
date: 2020-02-25
published: true
tags: ['github']
cover_image: /images/mit-license.png
description: github repository(원격 저장소)에 license 추가하는 방법 소개
---

## License

영어 낱말 라이선스(license)는 한국어의 '면허'에 해당하지만, 한국어에서 외래어 용례로 '라이선스'를 사용할 때는 주로 지적 재산권의 이용허락을 의미하는 경우가 많다.

- 참고 [위키백과](https://ko.wikipedia.org/wiki/%EB%A9%B4%ED%97%88)

## 원격 저장소에 추가하기

### 저장소를 만들 때 추가하기

[https://github.com/new](https://github.com/new)에 접속하면 새로운 저장소를 만들 수 있는 폼이 뜬다. 이 곳에서 저장소의 이름, 설명, 공개 여부, .gitignore 생성 여부, README.md 생성 여부, 라이선스 생성 여부 등을 결정할 수 있다.

![license-1](/images/license-1.png)

**Add a license** 부분을 클릭 후 라이선스를 선택한 뒤에 저장소를 만들면 자동으로 라이선스가 저장소에 추가된다.

### 만들어진 저장소에 추가하기

이미 만들어진 저장소에 라이선스를 추가할 때에는 저장소 루트 디렉터리에 `LICENSE` 파일을 추가하기만 하면 github에서 자동으로 라이선스를 확인해준다.

![license-2](/images/license-2.png)

`Create new file`을 클릭해서 새로운 파일을 하나 만든다.

![license-3](/images/license-3.png)

파일 이름에 `LICENSE`를 적게 되면 오른쪽에 `Choose a license template` 라는 버튼이 보이게 된다. 이 버튼을 눌러서 라이선스 종류 중 하나를 선택하면 자동으로 문구를 만들어준다.

![license-4](/images/license-4.png)

녹색의 `Review and submit` 버튼을 클릭하게 되면 다시 폼으로 돌아와, 자동 생성된 문구를 볼 수 있게 된다. 이름과 년도가 잘못되어 있다면 이 부분에서 수정할 수 있고 `Preview` 기능으로 작성될 라이선스를 미리 확인할 수도 있다.

![license-5](/images/license-5.png)

라이선스 파일에 대해 커밋을 생성하고 원격 저장소에 푸쉬하게 되면 github가 라이선스를 확인하고 해당 라이선스를 이미지로 보여주게 된다.

![license-6](/images/license-6.png)

## 참고

- [https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository)
- [https://developer.github.com/v3/licenses/](https://developer.github.com/v3/licenses/) (API로 가져오기)
