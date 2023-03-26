---
title: toLocaleDateString과 toDateString 비교, (Chrome과 Safari)
date: 2021-03-18 02:12:13
published: true
tags: ['javascript']
cover_image: /images/date-thumbnail.jpg
description: toLocaleDateString과 toDateString에 대해서 알아보고 비교, 크롬과 사파리에서 일어날 수 있는 이슈에 대한 정리
---

## 유닉스 타임

POSIX 시간 혹은 Epoch 시간이라고도 부른다. 1970년 1월 1일 00시 00분 00초를 기준으로 경과한 초를 정수로 반환한 수다. 자바스크립트에서 유닉스 타임을 구하는 방법은 매우 쉽다. `new Date().getTime() / 1000` 혹은 `Date.now() / 1000`을 사용하면 된다.

두 메서드 모두 유닉스 타임이긴 하지만 밀리초로 반환된다. 초 단위로 변환하려면 1000을 나누면된다.

## 오늘 날짜의 유닉스 타임

현재 시간에 대한 관심이 없고 오늘 오전 00시 00분 00초를 기준으로 한 유닉스 타임을 구해 다른 날짜와 필터링할 때 사용할 수 있는 트릭이 몇 개 있다. `toLocaleDateString` 혹은 `toDateString`을 이용해 오늘의 일 단위까지만 Date를 구하고 다시 `new Date`로 랩핑하는 방법이 있다.

### toLocaleDateString

국가 혹은 지역마다 날짜 표기법이 다를 수 있다. 예를 들어 우리나라에서는 년, 월, 일을 순서대로 표기하는 방법을 사용하는데 2021. 1. 5. 꼴로 날짜를 표기한다. 미국에서는 월, 일, 년을 순서대로 표기하는 방법을 사용한다. 그리고 . 대신 슬래시(/)를 사용한다. 1/5/2021 꼴로 표기한다. 이렇듯 많은 국가마다 날짜 표기법이 다르며 이 메서드는 국가권을 지정하지 않으면 현재 운영체제의 언어를 기반으로 한 날짜 표기법을 문자열로 반환한다.

국가를 지정해서 반환시킬 수 있다. 첫 번째 인자로 해당 국가의 언어를 지정한다.

```js
new Date('2021-1-9').toLocaleDateString('ko-KR')
// 2021. 1. 9.
new Date('2021-1-9').toLocaleDateString('en-US')
// 1/9/2021
new Date('2021-1-9').toLocaleDateString('en-GB')
// 09/01/2021
```

표기법에 대한 옵션을 지정할 수 있는데, 자세한 옵션은 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)를 참고한다.

### toDateString

`toString`은 시, 분, 초 및 시간대까지 가져오는 반면 `toDateString`은 년, 월, 일 그리고 요일까지만 가져온다. `toLocaleDateString`과의 차이점은, locale 별로 반환되는 문자열을 바꿀 수 있는 반면 `toDateString`은 영어로만, 그리고 사람이 읽을 수 있는 형태로 반환된다. 각각의 locale에 대해 모두 똑같은 결과를 반환한다.

### 오늘 00시 00분 00초 유닉스 타임

그럼 둘 중 무얼 사용해서 구해야할까? 크롬에서는 무얼 사용해도 오늘 날짜의 유닉스 타임을 잘 반환한다.

```js
const today = +new Date(new Date().toLocaleDateString())
// 1615993200000
```

하지만 사파리에서 위 코드는 Invalid Date라고 오류를 뿜는다. 자바스크립트 엔진이 어떻게 해석하느냐에 따라 다른 것 같은데, 사파리 자바스크립트 엔진은 위 날짜를 Invalid Date로 처리한다. 크롬에서는 정상적으로 작동하지만 크롬과 사파리 모두 동작하도록 하려면 `toDateString`을 사용해야 한다.

```js
const today = +new Date(new Date().toDateString())
// 1615993200000
```

크롬과 사파리에서 모두 위 코드는 정상적으로 작동한다. 크롬과 사파리에서만 동작하는걸 확인했고, 크롬과 사파리 외 다른 브라우저까지 고려해야 한다면 `date-fns`, `moment`, `dayjs` 등 다른 라이브러리를 사용하면 손쉽게 브라우저 호환성을 보장할 수 있다.
