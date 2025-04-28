---
title: 백준 14222번 배열과 연산 문제
date: 2020-12-01 05:51:45
published: true
tags: ['algorithm', 'python']
cover_image:
description: 백준 14222번 배열과 연산 문제 풀이
---

## 백준 14222번 배열과 연산

- [문제 원문](https://www.acmicpc.net/problem/14222)

총 N개로 이루어진 배열 A에서 각 원소들에 K만큼 더해 1부터 N까지 이루어진 배열에 있는 수를 하나씩 만들 수 있는지 찾아내는 문제. 제공된 난이도에 비해 쉬웠다.

주어진 배열 A의 원소들을 반복하고 원소가 1부터 N까지 수가 들어있는 배열에 들어있으면 삭제시킨다. 없으면 원소에 K를 더한다. 범위를 벗어나거나, 더해진 원소가 배열에 들어있으면 그 원소를 배열에서 삭제시키고 반복을 빠져나간다. 이 과정을 반복한다.

```python
N, K = map(int, input().split())
nums = list(map(int, input().split()))
nums.sort()
req = list(range(1, N + 1))

for n in nums:
  if n in req:
    req.remove(n)
  else:
    flag = False
    temp = n
    while True:
      temp += K

      if temp in req:
        flag = True
        break

      if temp > max(req):
        break

    if flag:
      req.remove(temp)

print(0 if req else 1)
```
