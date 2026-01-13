---
title: border 에 gradient 적용하기
published: true
date: 2026-01-13T06:22:24.926Z
cover_image:
description: border 에 gradient 적용한 느낌 부여하기
tags: ['css']
---

## border 에 gradient 적용하기

요즘 LLM을 활용한 도구 및 화려한 웹 서비스들을 보면 프리미엄 버튼이라고 해서 눈에 띄는 UI 적인 버튼 요소들이 많이 보이는데, 주로 border 에 gradient 효과를 적용시킨 버튼들이 많이 보인다. 이런 효과를 적용시킬 수 있는 CSS 속성에 대해서 알아보고 정리한다.

::codepen-embed{hash="wBWoWxo" user="n2ptune" title="border gradient" :defaultTab='["result"]' description="새 탭을 열어서 확인"}
::

뚝딱 해버렸는데, 핵심은 그라데이션 적용 영역을 `border-width` 로 주고, `transparent` 투명색으로 칠한다.

CSS `background` 속성은 여러 레이어를 겹겹이 쌓을 수 있는데, 먼저 선언된 속성이 항상 상위 레이어에 위치한다. 그 뒤에 선언된 항목들은 아래 레이어에 쌓인다. 따라서 상위 레이어 부분이 가장 먼저 보인다. `linear-gradient` 함수 사용 뒤, `<box>` 값으로 `padding-box`, `border-box` 가 사용됬는데, `<box>` 값이 하나만 주어진 경우, `background-origin`, `background-clip` 모두 그 값으로 설정한다는 뜻이다.

- `background-origin` 배경 이미지를 어느 기준으로 배치할지 결정한다. `<box>` 값이 온다.
- `background-clip` `<box>` 값까지 포함하여 배경 이미지를 표시한다.

따라서 배경색은 `padding-box` 에 위치하고, gradient 색상은 `border-box` 영역에만 입혀 border 에 gradient 효과를 적용하는 방법이다.

이 방법을 응용한 방법은 아니지만 border 에 gradient 색상을 입히고 회전시키는 재밌는 방법도 [https://rgy0409.tistory.com/5049](https://rgy0409.tistory.com/5049) 아주 잘 설명한 블로그 글이 있어서 참고해보면 재미있을 것 같다.
