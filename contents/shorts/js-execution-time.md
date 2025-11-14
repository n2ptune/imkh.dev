---
title: 자바스크립트 함수 실행 시간 측정
published: true
date: 2025-11-14T08:30:13.247Z
cover_image:
description: 자바스크립트에서 함수 실행 시간을 측정할 수 있는 다양한 방법에 대해서 정리
tags: ['javascript']
---

## 자바스크립트 함수 실행 시간 측정

함수 실행 시간을 측정할 수 있는 여러 방법에 대해서 학습하고 정리한다. 함수 실행 시간 측정을 하는 방법에 대해서 알고 있으면, 성능 최적화 및 벤치마킹 / 디버깅 등에 도움이 될 수도 있다.

### Date.now()

`Date` 객체의 `now` 메서드를 사용하면 밀리초를 리턴받을 수 있는데, 이걸 이용해 함수 실행 시간을 측정할 수 있다.

```javascript
function run() {
  const start = Date.now()

  for (let i = 0; i < 1e6; i++) {
    Math.sqrt(i)
  }

  const end = Date.now()
  console.log(`Execution time: ${end - start} ms`)
}
// result: Execution time: XX ms
```

`now` 메서드는 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 시간을 밀리초 단위로 리턴한다. 이를 통해서 함수 시작시 한번 찍고, 종료부에 한번 찍고 종료 시간과 시작 시간을 빼주면 함수 실행 시간을 측정할 수 있다.

### console.time() / console.timeEnd()

`Date.now` 메서드보다 더 간결한 방식으로, `Date` 객체와 마친가지이지만 브라우저 및 Node.js 환경 모두에서 사용 가능하다.

```javascript
function run() {
  console.time('Execution Time')

  for (let i = 0; i < 1e6; i++) {
    Math.sqrt(i)
  }

  console.timeEnd('Execution Time')
}
// result: Execution Time: XX ms
```

메서드의 인수로 문자열을 받는데, 라벨링을 한다고 보면 된다. `time` 메서드와 `timeEnd` 메서드에 동일한 라벨을 넘겨주면, 해당 라벨에 대한 실행 시간을 측정하여 출력해준다. `now` 메서드와 마찬가지로 밀리초 단위로 반환된다.

### process.hrtime

`process` 객체가 존재하는 Node.js 환경에서만 사용 가능한 방법이나, 매우 정밀하게 측정할 수 있는 특징이 있다.

```javascript
function run() {
  const start = process.hrtime()

  for (let i = 0; i < 1e6; i++) {
    Math.sqrt(i)
  }

  const end = process.hrtime(start)
  console.log(`Execution time: ${end[0]}s ${end[1] / 1e6} ms`)
}
// result: Execution time: 0s XX ms
```

`hrtime` 은 나노초 단위로 반환한다. 반환하는 타입이 `[number, number]` 형태이고, 첫번 째는 초를 뜻하고 두번째는 나노초를 의미한다.

### performance.now()

위 `hrtime` 과 동일하게 정밀한 측정이 가능하다는 특징이 있고, 브라우저 환경과 Node.js 환경 모두에서 사용 가능하다. 반환하는 단위는 소수점을 포함한 밀리초다. (hrtime 이 더 세밀한 단위)

```javascript
function run() {
  const start = performance.now()

  for (let i = 0; i < 1e6; i++) {
    Math.sqrt(i)
  }

  const end = performance.now()
  console.log(`Execution time: ${end - start} ms`)
}
// result: Execution time: XX.XXXX ms
```

다른 것들과 특징은, 소수점 아래 자릿수가 세밀하여 마이크로초까지 측정할 수 있다는 특징이 있다.
