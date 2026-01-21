---
title: React debounce in useEffect
published: true
date: 2026-01-21T08:08:23.357Z
cover_image:
description: 리액트에서 useEffect 내부 debounce 를 구현하는 패턴에 대해서 학습하고 정리
tags: ['react']
---

## React debounce in useEffect

`useEffect` 내부에서 클린업 함수를 실행함과 동시에 다음 이펙트에 대한 처리를 함으로써 debounce 기능과 동일한 효과를 보도록 구현할 수 있다.

```tsx
import { useEffect, useState } from 'react'

function ChildInput({ onChange }) {
  const [input, setInput] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(input)
    }, 500)

    return () => clearTimeout(timer)
  }, [inpuㅃ onChange])

  return (
    <input type="text" value={input} onChange={e => setInput(e.target.value)} />
  )
}
```

위 예시를 보면 effect 내부 `setTimeout` 함수로 넘긴 콜백 함수는 이펙트가 여러 번 발생해도 마지막 이벤트가 발생한 후 500ms가 지나면 한번만 실행된다. 원리에 대해서 짚고 넘어가면 좋을 것 같다.

- setTimeout 함수의 인자로 콜백 함수를 넘긴다. (effect 내부 실행)
- (상태 업데이트) 다음 effect 내부가 실행되기 전 클린업 함수가 먼저 실행
- 기등록된 setTimeout 예약 종료
- 다음 effect 에서 반복..

따라서 debounce 를 사용한 것과 동일한 효과를 볼 수 있다.

### 번외) 비동기(Promise) 경쟁

꽤 많이 쓰이는 패턴인 것 같다. effect 내부 비동기 함수 호출이 있는 경우 상태가 변경되어 새 effect 가 실행되기 전 비동기 호출이 아직 종료되지 않았다면 그리고 effect 내부 또 다른 상태에 대한 업데이트가 동반되는 경우, 이전 effect 의 비동기 함수 호출보다 새 effect 비동기 함수 호출이 먼저 종료되어 이전 상태가 더 늦게 반영이 되어 업데이트되는 경우가 종종 일어날 수 있다.

```tsx
useEffect(() => {
  let ignore = false // 플래그 설정

  const fetchData = async () => {
    // 디바운스된 값으로 API 호출
    const result = await api.search(debouncedValue)

    // 응답이 왔을 때, 이미 새로운 요청이 시작되었다면(ignore가 true면)
    // 상태를 업데이트하지 않음
    if (!ignore) {
      setResults(result)
    }
  }

  fetchData()

  return () => {
    ignore = true // 다음 렌더링(또는 언마운트) 시 플래그를 true로 변경
  }
}, [debouncedValue])
```

플래그를 하나 두고 플래그 상태에 따라 처리 방법을 달리한다. 플래그는 클린업 함수에서 초기화한다.
