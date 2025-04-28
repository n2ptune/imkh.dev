---
title: 백준 2947번 나무 조각 문제
date: 2020-11-13 07:49:15
published: true
tags: ['algorithm', 'python']
cover_image:
description: 백준 2947번 나무 조각 문제 파이썬 풀이
---

## 백준 2947번 나무 조각

[원문](https://www.acmicpc.net/problem/2947)을 보면, 나무 조각은 총 5개이고 각 나무 조각에는 1부터 5까지의 숫자가 쓰여져있다고 한다. 나무 조각을 배열로 표시한다면 i번째 나무 조각과 i+1번째 나무 조각을 비교해서 i번째가 더 크다면 서로 바꾸고 바꾼 배열을 출력하면 되는 문제이다.

나무 조각은 항상 5개이고 나무 조각에 쓰여지는 숫자만 달라지기 때문에 배열을 `[1, 2, 3, 4, 5]`와 비교해서 똑같지 않을 때까지 위의 과정을 반복하면 된다.

### 풀이

```python
import sys

nums = list(map(int, sys.stdin.readline().split(' ')))

while True:
  for i in range(len(nums) - 1):
    if nums[i] > nums[i + 1]:
      temp = nums[i]
      nums[i] = nums[i + 1]
      nums[i + 1] = temp
      print(' '.join(map(str, nums)))

  if nums == [1, 2, 3, 4, 5]: break
```

만약 가지고 있는 나무 조각의 갯수가 동적이라면 처음에 먼저 나무 조각의 순서를 정렬한 뒤에 원본 나무 조각 순서가 정렬 된 순서와 맞으면 반복문을 빠져나가게 하면 동적인 갯수라도 풀 수 있다.
