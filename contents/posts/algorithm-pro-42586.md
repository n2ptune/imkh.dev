---
title: (Python) 프로그래머스 스택/큐 기능 개발
date: 2020-11-30 07:30:22
published: true
tags: ['algorithm', 'python']
cover_image:
description: 프로그래머스 기능 개발 문제 파이썬 풀이
---

## 프로그래머스 기능 개발

- [프로그래머스 문제 원문](https://programmers.co.kr/learn/courses/30/lessons/42586)

각 작업은 인덱스에 맞는 `speeds` 원소의 값을 계속 더해 100을 넘게되면 작업이 완료된다. 이 때까지 카운트를 세면 작업까지 걸리는 N일이 된다. 먼저 작업이 모두 끝나는 일 수를 리스트로 모두 더하게 되면 예시 `[95, 90, 99, 99, 80, 99]`의 경우 `[5, 10, 1, 1, 20, 1]`이 된다.

기능은 개발이 완료되면 순서대로 배포를 한다. 먼저 제일 앞에있는 5가 배포된다. 배포할 때, 자신보다 뒤에 있는 기능들이 걸린 일 수를 파악하면 같이 배포를 할 수 있다. 여기서는 5 다음 10이 왔으므로 이 기능이 배포될 때에 쯤에는 아직 기능이 개발이 완료되지 않았으므로 5를 먼저 배포한다.

배포되는 시점에 배포된 기능이 1개이므로 1을 리스트에 저장한다. 그 다음, 10일 걸리는 기능이 완료되었다. 이제 배포 준비가 완료된 기능의 갯수를 하나씩 늘리고 자신이 걸린 일 수를 저장해서 뒤에 있는 기능을 자신보다 더 오래 걸리는 기능이 나타날 때까지 반복한다. 10 다음은 1, 1이므로 3개를 한번에 배포할 수 있다. 저장된 모든 변수를 초기화시키고 다음 기능부터 앞의 동작을 반복한다.

![algorithm-pro-42586-1.png](/images/algorithm-pro-42586-1.png)

그림으로 보자면, 5와 10을 먼저 비교해 10이 더 크므로 기능 갯수인 1을 배열에 집어 넣고 다음 기능으로 넘어간다.

![algorithm-pro-42586-2.png](/images/algorithm-pro-42586-2.png)

10과 1을 비교하면 10이 더 크므로 기능 갯수를 하나 늘리고 비교 대상을 `current`로 지정한다. 그리고 앞으로 나오는 모든 원소에 `current`를 비교해서 작으면 기능 갯수를 늘리고, 그렇지 않으면 현재 까지 모인 기능 갯수를 배열에 넣고 `current`와 `function_count`를 초기화 시킨다. 이렇게 반복한 후 리스트를 반환하면 된다.

```python
def solution(progresses, speeds):
  stack = []

  for i, v in enumerate(progresses):
    count = 0
    while v < 100:
      v += speeds[i]
      count += 1

    stack.append(count)

  answer = []
  function_count = 0
  current = 0

  print(stack)

  for i, work in enumerate(stack):
    if function_count == 0:
      current = work

    function_count += 1

    if i < len(stack) - 1 and not current >= stack[i + 1]:
      answer.append(function_count)
      function_count = 0

  answer.append(function_count)

  return answer


print(solution([96, 99, 98, 97], [1, 1, 1, 1]))
print(solution([93, 30, 55], [1, 30, 5]))
print(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]))
```
