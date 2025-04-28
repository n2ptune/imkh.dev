---
title: 프로그래머스 완주하지 못한 선수
date: 2020-11-25 05:21:21
published: true
tags: ['algorithm', 'python']
cover_image:
description: 프로그래머스 완주하지 못한 선수 문제 파이썬 풀이
---

## 프로그래머스 완주하지 못한 선수

- [문제 원문](https://hsin.hr/coci/archive/2014_2015/contest2_tasks.pdf)
- [프로그래머스 원문](https://programmers.co.kr/learn/courses/30/lessons/42576?language=python3)

마라톤에 참여한 선수 이름을 담고있는 배열과 완주한 선수 이름을 담고있는 배열이 주어지고 이들 중 완주하지 못한 선수의 이름을 출력해야 한다. 고려해야할 만한 제한 사항은 **동명이인이 있다는 점**, **완주한 마라톤 선수 배열의 길이는 항상 마라톤에 참여한 모든 선수 배열의 길이보다 1 작다는 것**, 그리고 여기서 유추하면 **마라톤을 완주하지 못하는 사람은 항상 1명이라는 점**이다.

처음에는 완주한 선수 배열에서 루프를 돌아 `participant`(모든 선수 배열)에서 일치하는 인덱스를 지워 마지막 한명을 반환하는 코드로 접근했었는데, 답은 맞았지만 효율성 테스트에서 떨어지게 되었다.

```python
def solution(participant, completion):
	for person in completion:
		del participant[participant.index(person)]

	return participant[0]
```

완주한 선수 목록에서 루프를 돌아 `participant`에 그 선수의 이름을 지워가는 방식인데, 완주하는 선수의 이름과 일치하는 이름을 찾아야 하기 때문에 배열이 커지면 느려지게 된다.

문제는 맞으나 효율성 테스트를 떨어지게 되니 생각을 좀 많이 하게 됐다. 인덱스를 찾는 비효율적인 코드를 없애고 완주한 선수의 이름을 찾는 방법이 없을까 고민하다가 한 방법을 생각하게 됬다.

두 문자열 배열을 모두 사전순으로 정렬하고 `completion` 배열 뒤에 아무 의미 없는 문자열 하나를 집어넣어 서로의 길이를 맞추고 루프를 돌면서 루프를 돌고 있는 현재 값과 `completion[i]`를 비교한다. 만약 틀리면 그 사람은 완주하지 못한 것이기 때문에 값을 바로 반환한다. 이렇게 하면 위의 방법보다 조금 더 효율적이다.

```python
def solution(participant, completion):
    participant.sort()
    completion.sort()

    completion.append('-')

    for i, v in enumerate(participant):
        if not v == completion[i]:
            return v
```

위 코드로 효율성 테스트를 통과하였다.
