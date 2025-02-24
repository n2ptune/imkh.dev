---
title: (Python) 백준 7568번 덩치 문제
date: 2020-12-05 07:24:37
published: true
tags: ['python', 'algorithm']
cover_image:
description: 백준 7568번 덩치 문제 파이썬 풀이
---

## 백준 7568번 덩치 문제

- [문제 원문](https://www.acmicpc.net/problem/7568)

A의 몸무게와 키가 B보다 모두 커야 B보다 A가 덩치가 더 크다라고 말할 수 있다. 문제에서 등치가 큰 등수는 자기보다 덩치가 큰 사람들의 수로 정해진다고 나와있다. 이를 파이썬의 `filter`를 이용해서 아주 손쉽게 풀 수 있다.

```python
N = int(input())
P = [list(map(int, input().split())) for _ in range(N)]
ans = []

for A in P:
  f = list(filter(lambda x: x[0] > A[0] and x[1] > A[1], P))
  ans.append(len(f) + 1)

print(' '.join(list(map(str, ans))))
```

키와 몸무게를 담을 리스트를 하나 만들어두고 거기에 모든 사람들의 키와 몸무게를 저장한다. 하나씩 반복해서 자신보다 덩치가 큰 사람들의 수를 `filter` 내장 함수를 이용해 구한다. 거기에 1을 더하면 등수가 나오고, 이 등수를 리스트에 저장해 마지막 공백을 이어붙여 출력하면 정답이다.

분류에 브루트포스 알고리즘으로 분류되어 있는데, 이는 가능한 경우의 수를 모두 해보는 알고리즘이라고 이해할 수 있다. 위 문제에서는 모든 사람들의 키와 몸무게를 모두 비교해보기 때문에 브루트포스 알고리즘으로 분류된 것 같다.
