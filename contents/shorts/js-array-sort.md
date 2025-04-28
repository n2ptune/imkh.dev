---
description: 자바스크립트 기본 제공 함수를 이용해 배열 내 원소를 정렬하는 방법
cover_image: /images/js-array-sort.png
tags: ['javascript']
published: true
date: 2020-03-16
title: 간단한 자바스크립트 배열 원소 정렬
---

## 일반적인 배열 정렬

```js
const arr = ['c', 'a', 'b', 1]

for (const i of arr) {
  console.log(i.toString().charCodeAt())
}

// output: 99
//         97
//         98
//         49
```

문자열과 숫자로 이루어진 간단한 배열이 있다. 배열의 원소들을 모두 읽어들여 문자열로 변환한 뒤 해당 문자의 UTF-16 코드를 출력한다. `Array.prototype.sort` 함수는 매개변수로 정렬 방식을 정하지 않으면 기본적으로 이 코드를 기준으로 정렬한다.

```js
const arr = ['c', 'a', 'b', 1, '나', '가', '다']

for (const i of arr) {
  console.log(i.toString().charCodeAt())
}

arr.sort()

console.log(...arr)

/** result
 * 99 (c)
 * 97 (a)
 * 98 (b)
 * 49 (1)
 * 45208 (나)
 * 44032 (가)
 * 45796 (다)
 * 1 'a' 'b' 'c' '가' '나' '다'
 **/
```

배열 원소에 숫자, 영어 알파벳, 한글이 있다. 각각 UTF-16 코드로 해당 숫자를 가지므로 이 숫자를 기준으로 정렬하게 되면 1, 'a', 'b', 'c', '가', '나', '다' 순이 된다. 이 함수는 기본적으로 이 함수를 호출하는 배열 자체를 바꾼다. 반환 값도 정렬 된 배열을 반환한다.

```js
const numArr = [1, 100000, 99]
numArr.sort()

console.log(...numArr)

// 1 100000 99
```

문제점이 하나 존재한다. 배열 정렬 함수를 지정하지 않으면 배열의 모든 원소를 문자열로 바꿔 정렬을 시도한다. 그렇기 때문에 위의 배열에서 기대하는 값 [1, 99, 100000]은 출력되지 않는다.

## 정렬 함수 지정

위의 문제를 해결하기 위해서 정렬 함수를 지정한다. `Array.prototype.sort` 함수는 매개변수로 2개의 매개변수(여기서는 a,b)를 갖는 함수를 받으며 이 함수에서 **양수를 반환하면 b가 더 낮은 값**으로 정렬, **음수를 반환하면 a가 더 낮은 값**으로 정렬 됨.

만약 이 함수가 **0을 반환하면 a, b 두 값에 대해 변경하지 않고 다음 요소로 넘어감** 이 정렬 함수 방식을 이용해서 위의 숫자 정렬을 다시 해보면 아래와 같이 된다.

```js
const numArr = [1, 100000, 99]
numArr.sort((a, b) => (a > b ? 1 : -1))

console.log(...numArr)

// 1 99 100000
```

수가 오름차순으로 정렬된다. 반환하는 수를 거꾸로하면(부등호를 반대로 하면) 내림차순으로 정렬된다. 배열의 모든 원소가 사칙연산이 가능하다면 아래와 같은 방식도 가능하다.

```js
const numArr = [1, 100000, 99]
numArr.sort((a, b) => a - b)

console.log(...numArr)

// 1 99 100000
```

반대로 더한 값을 반환하면 내림차순으로 정렬한다.

## 객체 정렬

배열 안의 모든 원소가 객체일 경우 객체의 어떤 값을 기준으로 정렬이 가능하다.

```js
const personArr = [
  {
    name: 'Kim',
    age: 30,
    job: 'Teacher'
  },
  {
    name: 'Lee',
    age: 24,
    job: 'Student'
  },
  {
    name: 'Hwang',
    age: 35,
    job: 'Zookeeper'
  }
]
```

위처럼 객체가 3개 들어있는 배열이 있다. 이 배열의 객체 값들 중 나이순으로 이들을 정렬하고 싶다고 하면 아래와 같이 a, b 객체의 `age` 속성을 서로 비교하면 된다.

```js
personArr.sort((a, b) => a.age - b.age)

console.log(...personArr)

// { name: 'Lee', age: 24, job: 'Student' } { name: 'Kim', age: 30, job: 'Teacher' } { name: 'Hwang', age: 35, job: 'Zookeeper' }
```

## 참고

- [브라우저 호환성](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%ED%98%B8%ED%99%98%EC%84%B1)
