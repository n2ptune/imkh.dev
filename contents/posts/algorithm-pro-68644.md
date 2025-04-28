---
title: 프로그래머스 두 개 뽑아서 더하기 알고리즘 문제
date: 2020-11-24 08:56:33
published: true
tags: ['algorithm', 'python']
cover_image:
description: 프로그래머스 알고리즘 문제 두 개 뽑아서 더하기 파이썬 풀이
---

## 두 개 뽑아서 더하기

[문제 원문](https://programmers.co.kr/learn/courses/30/lessons/68644)

정수만 담겨져 있는 `numbers` 배열이 주어지고 이 배열에서 두 개만을 뽑아 더해서 만들 수 있는 모든 수를 찾으면 되는 문제고 배열의 길이는 2~100 모든 수는 0~100으로 그렇게 크지 않은 정수와 배열이다.

간단하게, `[7, 5, 6, 8]`이라는 배열이 있으면 배열에서 두 수를 뽑아 모두 만들 수 있는 수는 `[11, 12, 13, 14, 15]`이다. 제일 먼저 생각났던 방법은, 그냥 모두 더해보고 배열에 없으면 추가하고 있으면 다시 루프를 도는 방법이 생각났다.

## 풀이

배열이 어떤 순서로 존재하건 두 수의 합으로 만들 수 있는 수는 한정적이기 때문에 배열이 정렬되어 있는 건 중요하지 않다. 다만 출력할 때에는 배열이 정렬되어야 한다.

```python
def solution(numbers):
  answer = []

  for i in range(0, len(numbers) - 1):
    for n in numbers[i + 1:]:
      s = numbers[i] + n
      if not s in answer:
        answer.append(s)

  answer.sort()
  return answer
```

배열의 마지막 원소까지 반복할 필요가 없기 때문에 마지막 전 원소까지 반복한다. 그리고 현재 인덱스 이후의 모든 원소들을 배열 형태로 가져와서 원소와 모두 더하고, 배열에 있지 않으면 원소를 넣고 모든 반복이 끝나면 배열을 정렬한 뒤 리턴한다.

아래와 같은 방법도 가능하다.

```python
def solution(numbers):
  answer = []

  for i in range(0, len(numbers) - 1):
    for n in numbers[i + 1:]:
      answer.append(numbers[i] + n)

  return sorted(list(set(answer)))
```

집합 자료형은 중복을 허용하지 않기 때문에 리스트를 집합 자료형으로 바꾸게 되면 중복이 모두 없어진다. 이걸 다시 리스트로 바꿔서 정렬한 배열을 리턴한다. 이렇게 하면 원소가 배열에 있는지 검사하지 않기 때문에 조금 더 빨라질 수 있겠다.
