---
title: Motion으로 splitText 구현하기
published: true
date: 2025-04-21T08:22:33.434Z
cover_image:
description: Motion 라이브러리를 이용해 splitText 애니메이션 구현하고 정리하기
tags:
  - javascript
---

## splitText 애니메이션

framer motion에 대해서 아는 바는 없지만 이 라이브러리가 [motion](https://motion.dev/)으로 이전된 것 같다. React/Vue용 라이브러리 및 범용 바닐라 자바스크립트를 지원한다. 여러 트랜지션 및 애니메이션에 대한 유틸리티/컴포넌트를 제공하고, CSS로 구현하기 귀찮은 여러 부분에 대해 알아서 처리해주는 유틸리티가 존재한다.

사용자의 제스쳐에 관련된 컨트롤도 가능하다는 것이 특장점 중 하나이다. 예를 들어, **사용자가 스크롤 할 때**, **컨텐츠에 마우스를 올렸을 때**, **Viewport에 컨텐츠가 들어왔을 때** 등 사용자와의 Interaction 부분도 다양하게 관리할 수 있다.

유틸리티 기능 중 [splitText](https://motion.dev/docs/split-text)라는 기능이 있는데, 텍스트가 점진적으로 나타나는 효과를 주며 모던하고 깔끔한 느낌을 주는 유틸리티 기능이다. 해당 기능이 유료 버전에 한해서만 지원하는 것 같아, 직접 구현해보고 정리한다.

## Idea

글자의 철자 분리를 통해 opacity 속성과 x, y 속성을 조작하면 쉽게 구현 가능해보였다.

```js
function splitText(container, text) {}
```

철자 분리 함수의 시그니처는 이 정도, 글자들을 포함하고 있는 엘리먼트(`container`)와 텍스트 애니메이션 적용 대상인 텍스트를 인자로 받는다.

```js
function splitText(container, text) {
  const lines = text.split('\n')
  const textEls = []

  for (const line of lines) {
    const lineEl = document.createElement('p')
    let temp = ''

    function push(pushBlank = false) {
      const textEl = document.createElement('span')
      textEl.textContent = temp
      temp = ''
      lineEl.appendChild(textEl)
      textEls.push(textEl)
      if (pushBlank) {
        const blank = document.createTextNode(' ')
        lineEl.appendChild(blank)
      }
    }

    for (const char of line) {
      if (char === ' ') {
        push(true)
        continue
      }
      temp += char
    }

    if (temp) push(false)
    container.appendChild(lineEl)
  }

  return textEls
}
```

텍스트는 `ABC ABC ABC\nABCD ABCDE ABC` 형태로 받고, 줄바꿈 문자 단위로 라인별 문자열을 배열에 담고 있다가, 라인별로 단어 사이를 잘라 단어 단위로 애니메이션 적용을 하는 걸로 선회했다. (철자 단위 애니메이션은 뭔가 조잡하고 내용이 애니메이션에 치우친 느낌이라 전달하고자 하는 내용이 확실히 전달되지 못하는 느낌이 든다. 음... 내용을 깔끔하고 모던하게 전달하는게 아니라, 내가 만든 애니메이션을 한번 볼래? 라는 느낌?) 그리고 단어 단위 엘리먼트를 만들어 라인 단위 엘리먼트 하위에 넣는다. 이러면 단어 단위의 엘리먼트에 애니메이션을 적용하면 문서에 있는 애니메이션과 비슷한 느낌을 구현할 수 있을 것 같다.

```js
const text =
  'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit. Vestibulum imperdiet mauris\nornare turpis semper, non egestas leo ultricies.\nPraesent sed laoreet ex. In eget orci arcu.'
const { animate, stagger } = Motion

function animateText() {
  return animate(splitText(document.querySelector('.container'), text))
}
```

애니메이션 실행 함수까지 만들어주면 준비는 끝났다. `stagger` 메서드는 앞서 말했듯 애니메이션 대상이 복수개인 경우 상대적인 딜레이(앞 애니메이션이 실행되고 지연 시간)를 할당할 수 있게 해주는 유틸리티다. 이 기능이 해당 이펙트의 핵심 유틸리티다.

## 애니메이션 심화

`inView` 유틸리티는 HTML `Intersection API`를 활용해 애니메이션 대상이 viewport에 진입했는지 여부에 따라 애니메이션 실행 여부 결정을 관리할 수 있다. 제작한 애니메이션에 이 유틸리티를 적용해본다.

```js
const { motion, stagger, inView } = Motion

inView(document.querySelector('.container'), el => {
  animateText()

  return leaving => {
    animate(document.querySelector('.container'), { opacity: 0 })
  }
})
```

첫번째 인자로 애니메이션 대상을 넘기고, 두번째 인자로 콜백 함수를 넘기면 엘리먼트가 viewport에 진입했을 때 애니메이션이 수행된다. 그리고, viewport에서 엘리먼트가 벗어나면 리턴한 콜백 함수가 실행된다. 즉, 여기서 viewport 벗어남 애니메이션을 수행하면 적절하다.

::codepen-embed{hash="azzBWYE" user="n2ptune"}
::
