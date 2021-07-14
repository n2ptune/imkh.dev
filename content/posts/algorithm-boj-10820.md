---
title: (Node.js) 백준 10820번 문자열 분석 문제
date: 2020-11-13 06:52:44
published: true
tags: ['javascript', 'algorithm']
cover_image:
description: 백준 10820번 문자열 분석 문제 솔루션
---

## 백준 10820번 문자열 분석

차례로 주어지는 문자열에서 소문자, 대문자, 숫자, 공백의 수를 각각 출력하면 되는 문제, 자바스크립트의 정규식을 이용하면 간단하게 풀 수 있다.

각각의 방법은 다음과 같다.

- 문자열에서 정규식으로 대문자를 모두 지운 문자열의 길이를 원본 문자열의 길이에서 빼면 대문자의 갯수다.
- 문자열에서 정규식으로 소문자를 모두 지운 문자열의 길이를 원본 문자열의 길이에서 빼면 소문자의 갯수다.
- 문자열에서 정규식으로 숫자를 모두 지운 문자열의 길이를 원본 문자열의 길이에서 빼면 숫자의 갯수다.
- 문자열에서 정규식으로 공백을 모두 지운 문자열의 길이를 원본 문자열의 길이에서 빼면 공백의 갯수다.

다만 Node.js 환경에서 입력을 받게 되면 가장 끝 부분에 `\n`까지 입력받기 때문에 `trim` 메서드로 지워주는데, 만약 공백으로만 이루어진 문자열이 주어질 수도 있기 때문에 따로 처리가 필요하다.

### 풀이

```js
const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .split('\n')

const t = input.filter(str => str.length < 1)

if (t.length) {
  input.splice(input.indexOf(t[0]), 1)
}

input.forEach(str => {
  const lower = str.length - str.replace(/[a-z]/g, '').length
  const upper = str.length - str.replace(/[A-Z]/g, '').length
  const num = str.length - str.replace(/[0-9]/g, '').length
  const blank = str.length - str.replace(/\ /g, '').length

  console.log(lower, upper, num, blank)
})
```

문자열에 대해 입력을 받고 `\n`로 문자열을 자른다. 자른 문자열 중 아무런 문자를 담지 않는 배열은 제거하고 실행한다.
