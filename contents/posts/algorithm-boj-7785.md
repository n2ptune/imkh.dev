---
title: (Python) 백준 7785번 회사에 있는 사람 문제
date: 2020-12-11 05:00:18
published: true
tags: ['python', 'algorithm']
cover_image:
description: 백준 7785번 회사에 있는 사람 문제 파이썬 풀이
---

## 백준 7785번 회사에 있는 사람

[문제 원문](https://www.acmicpc.net/problem/7785)

최소 1번의 들어온 기록과 나간 기록 그리고 최대 1000000번의 기록이 주어진다. `enter` 라는 명령이 주어진 사람의 이름을 `dict` 자료형의 키로 둔다. 그리고 `leave`가 들어오면 해당 이름으로 된 사람을 `dict`에서 지운다. 마지막으로 `dict`의 모든 키를 가져와서 사전 역순으로 정렬해서 출력한다.

이 문제는 입력이 매우 많을 수도 있기 때문에 `input` 메서드를 사용하면 문제는 맞을 수 있으나 매~~~~~우 느리다. `sys` 모듈의 `stdin`을 사용하여 채점 시간을 짧게 할 수 있다.

### input을 사용한 풀이

```python
N = int(input())
pe = {}

for _ in range(N):
  p, c = input().split()

  if c == 'enter':
    pe[p] = 'enter'
  else:
    if pe[p]:
      del pe[p]

for people in sorted(pe, reverse=True):
  print(people)
```

시간은 총 4068ms가 걸렸다.

### sys.stdin을 사용한 풀이

```python
import sys

pe = {}

for _ in range(int(sys.stdin.readline())):
  p, c = sys.stdin.readline().rstrip().split()

  if c == 'enter':
    pe[p] = 'enter'
  else:
    if pe[p]:
      del pe[p]

for people in sorted(pe, reverse=True):
  print(people)
```

4068ms에서 216ms로 시간을 단축시킬 수 있었다.
