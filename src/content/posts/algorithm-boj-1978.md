---
title: (Python) 백준 1978, 2581, 1929번 소수 구하기, 소수 찾기
date: 2020-11-20 15:56:13
published: true
tags: ['python', 'algorithm']
cover_image:
description: 백준 1978, 2581, 1929번 소수 구하기, 소수 찾기 문제 파이썬 풀이
---

## 소수 구하기

소수 구하는 문제 중 비교적 쉽게 풀 수 있는 문제 3가지가 있다. [1978번 문제](https://www.acmicpc.net/problem/1978)와 [2581번 문제](https://www.acmicpc.net/problem/2581) 그리고 [1929번 문제](https://www.acmicpc.net/problem/1929)다. 소수를 구하는 문제에서 가장 쉽게 해볼 수 있는 생각은 N이 주어지면 2부터 N - 1 까지의 수를 모두 나누어 보는 것이다. 소수는 1보다 큰 수로 1과 자기 자신으로 나누었을 때에만 나누어지는 수를 말한다.

이 접근 방법의 제일 큰 문제점은 바로 시간 복잡도다. 2부터 N까지의 모든 수를 나누어보기 때문에 N이 작으면 그다지 느린 걸 느낄 수 없지만 수가 커지면 커질 수록 시간 복잡도가 올라가 매우 느려진다.

다른 방법은, 2부터 N의 최대 약수까지를 나누어보는 방법이다. N이 만약 60이라면, 60은 1, 2, 3, 4, 5, 6, 10, 20, 30라는 약수를 가진다. 여기서 1은 제외하고, 2부터 30까지의 수를 순서대로 나누다가, N이 만약 그 수로 나누어진다면 그 수는 소수가 아니게 된다. 이 접근 방법으로 위의 3가지 알고리즘 문제를 풀어본다.

### 문제 1978번

소수의 개수를 세면 되는 문제 소수인지 아닌지를 판별해야 되는 수가 공백을 구분자로 두고 주어지며 제일 첫번째에는 숫자의 개수인 N이 주어진다. 위에서 언급했던 방법으로 접근한다.

```py
L = int(input())
nums = map(int, input().split(' '))
c = 0

for n in nums:
  if n == 1:
    continue
  else:
    prime = True
    for i in range(2, int(n**0.5) + 1):
      if n % i == 0:
        prime = False
        break
    if prime:
      c += 1

print(c)
```

핵심은 플래그 하나를 두고 나누어지면 플래그를 비활성화 시키고 반복문을 빠져나온다. 그 다음 플래그가 활성화되어 있다면 (초기화 상태) 해당 수를 소수로 간주하고 카운트를 증가, 마지막 카운트를 출력하면 쉽게 풀리는 문제

### 문제 2581번

위의 문제와 다른 점은 구해야 하는게 소수들의 합과 최솟값이다. 합이 초기 값이면 해당 소수를 최솟값으로 설정하고 그 뒤 모든 소수들에 대해 값을 더해주면 된다. 알고리즘은 위의 문제와 동일하다.

```py
m = int(input())
n = int(input())
_sum = 0
_min = 0

for i in range(m, n + 1):
  if i == 1:
    continue
  elif i == 2:
    _sum += i
    _min = i
  else:
    prime = True
    for j in range(2, int(i**0.5) + 1):
      if i % j == 0:
        prime = False
        break

    if prime:
      if _sum == 0:
        _min = i
      _sum += i

if _sum == 0:
  print(-1)
else:
  print(_sum)
  print(_min)
```

### 문제 1929번

범위가 1부터 1,000,000까지다. 위의 방법들로 하게되면 매우 느리다. 에라토스테네스의 체라는 방법을 이용해서 풀면 시간 복잡도를 낮출 수 있다.

```py
def sieve(start, end):
    if end < 2:
        return []
    sieve_list = [False, False] + [True] * (end-1)
    for i in range(2, int(end**0.5)+1):
        if sieve_list[i]:
            sieve_list[i*2::i] = [False] * ((end-i)//i)
    return [i for i, v in enumerate(sieve_list) if v and i >= start]


M, N = map(int, input().split())

S = sieve(M, N)

for prime in S:
    print(prime)
```

N의 최대 약수까지 다 나누어 보는 방법으로 문제를 풀면 풀어지긴 하나 2~3초 정도 걸리고, 에라토스테네스의 체 방법을 이용하면 300ms안에 풀 수 있다.
