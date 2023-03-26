---
description: 자바스크립트로 웹 API중 하나인 IntersectionObserver에 대해서 알아보고 정리하기
cover_image:
tags: ['javascript', 'html5']
published: true
date: 2020-04-12
title: 자바스크립트로 IntersectionObserver API 다루기
---

## IntersectionObserver API

IntersectionObserver API는 생각보다 많은 곳에 쓰일 수 있다. 이 API는 브라우저를 통해 실제 웹 페이지를 볼 때 뷰포트 기준으로 어떤 대상(HTML 태그)이 일정 비율정도로 브라우저에서 보이게 되면 콜백을 호출해서 원하는 시점에 함수를 실행할 수 있는 API다.

이 API를 이용해서 100개의 이미지를 보여주는 웹 페이지가 있다고 가정할 때, 처음 페이지 접속시 100개의 이미지를 모두 불러오는게 아니라, 최초 소량의 이미지만 가져와서 보여주고 이미지를 다 본 시점(5개 이미지 태그들의 끝)까지 오게되면 새로운 이미지들을 불러와서 보여주는게 가능하단 말이다.

이런 기술들이 **Lazy Load 기법**이라고 부른다. 컨텐츠가 필요할 때 그 때마다 컨텐츠를 불러와서 표시하는 방법이다. 많은 웹 사이트들을 보게 되면 **Infinity Loading(무한 로딩)**을 구현한 사이트를 많이 보게되는데, 실제로 100개의 무거운 컨텐츠를 첫 페이지 로딩시 보여주는 것도 가능하겠지만, 이 경우 100개의 모든 컨텐츠를 불러오기는 네트워크 속도에 한계가 있기 때문 사용자에게 컨텐츠를 효율적으로 보여주기 위한 방법으론 적절치 못한 방법일 수 있다.

이런 문제들을 해결하기 위해서 많은 방법이 있겠지만 이 API를 통해 구현하는 방법이 매우 쉽고 간편하기 때문에 API를 통해 문제를 해결하고 정리한다.

## API를 사용해서 문제를 해결하기

HTML에서 각각 일정한 너비와 높이를 가지고 배경색이 빨간색인 태그가 여러개 있다. 스크롤로 내려가며 이 빨간색 태그들이 실제로 브라우저에 보이게 되면 배경색을 파란색으로 바꾸고 싶다. 이 문제를 해결하기 위해 API를 사용한다.

```vue
<div class="container">
  <div class="box"></div>
  <div class="box"></div>
  <!-- ... 생략 -->
</div>
```

간단한 태그들로 구성한다. 컨테이너 안에 약 20개의 박스를 둔다.

```css
.box {
  width: 100px;
  height: 50px;
  background-color: red;
}
.box:not(:first-child) {
  margin: 10rem 0;
}
```

박스들의 너비와 높이를 정하고 배경색을 지정하고 API를 사용한 효과를 제대로 보기위해 박스와 박스의 간격을 최대한 멀리 떨어뜨려 놓는다.

```js
function factory(el) {
  const io = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.intersectionRatio > 0)) {
      el.style.backgroundColor = 'blue'
    }
  })
  io.observe(el)
  return io
}

const boxes = document.querySelectorAll('.box')
const ioWrap = []

for (const box of boxes) {
  ioWrap.push(factory(box))
}
```

IntersectionObserver API(줄여서 IO API)를 만들기 위해서는 `new` 연산자와 함께 사용하면 된다. 매개변수로 콜백 함수와 옵션을 받는데, 이 콜백 함수는 2가지 인수를 받는다. 첫 인자는 뷰포트에서 타겟 엘레먼트가 보이게 될 때나, 보이지 않게 될 때 그 정보를 담고있는 객체다. 이 객체를 통해 뷰포트에 보이게 될때와 보이지 않게 될 때를 감지해서 어떤 행위를 할 수 있다.

그 두번째 인자는 옵션이다. `root`, `rootMargin`, `threshold` 이 세개의 속성을 갖는 객체를 넘기면 된다. 넘기지 않고 만들어내면 모두 기본값으로 만들어진다. 옵션중 `threshold` 속성은 타겟 엘레먼트가 어느 정도 보일 때 함수를 호출할지 정하는 속성이다. 0.0부터 1.0까지 설정이 가능하며 0.1의 경우 타겟 엘레먼트가 10% 정도 보일 때 함수를 호출하겠단 얘기다. 기본 값은 0이며 0일 때 1픽셀이라도 뷰포트에 보이게 되면 함수를 실행한다.

이제 실행해본다.

![intersection-observer-api-example-gif](/images/intersection-observer-api-example.gif)

완벽하게 보이진 않지만 뷰포트에 들어올 때 빨간색이였던 박스가 파란색으로 바뀌는 걸 볼 수 있다. 아래에서 Codepen 예제를 볼 수 있다.

<https://codepen.io/n2ptune/pen/mdeJVav>

## Infinity Loading 구현

페이스북이나 여타 다른 페이지를 보면 스크롤을 내릴 때마다 새로운 컨텐츠들을 계속 볼 수 있다. 이 때 컨텐츠들의 끝을 감지해서 스크롤이 끝까지 내려온다면 서버로부터 새로운 컨텐츠들에 대한 정보를 받아 브라우저에서 렌더링할 수 있다면 가능하다. 간단한 예제를 작성한다.

```vue
<div class="container">
  <div class="status-field">
    <div class="status-item">Loaded Item : 4</div>
  </div>
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
  <div class="scroll-detecting"></div>
</div>
```

기본적으로 로딩된 아이템을 보여주기 위한 상태창을 하나 만든다. 이 상태창은 아이템이 로딩될 때마다 아이템의 갯수를 표시할 공간이다. 기본으로 로딩되는 아이템 4개를 두고 마지막으로 IO API의 타겟이 될 요소를 하나 만든다. 이 요소는 항상 아이템의 끝에 위치해서 이 요소가 뷰포트가 보이게 된다면 아이템을 로드시킨다.

```css
.status-field {
  position: fixed;
  top: 0;
  width: 100%;
}
.status-item {
  text-align: right;
  padding: 1rem;
}
.item {
  padding: 10rem 2rem;
  border-top: 2px solid gray;
}
.scroll-detecting {
  width: 5px;
  height: 5px;
}
```

예제를 보기 편하게 하기 위해서 스타일을 적용시킨다.

```js
const container = document.querySelector('.container')
const detector = document.querySelector('.scroll-detecting')
let currentIndex = document.querySelectorAll('.item').length + 1

function update() {
  const statusEL = document.querySelector('.status-item')
  const items = document.querySelectorAll('.item')

  statusEL.innerText = `Loaded Item : ${items.length}`
}

function loadItem(count) {
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div')

    div.classList.add('item')
    div.innerText = `Item ${currentIndex++}`

    container.appendChild(div)
  }

  update()
}

const io = new IntersectionObserver(entries => {
  if (entries.some(entry => entry.intersectionRatio > 0)) {
    loadItem(10)
    container.appendChild(detector)
  }
})

io.observe(detector)
```

먼저 컨테이너에 아이템을 계속 붙여야 하기 때문에 컨테이너와 뷰포트 감지를 위해 만들어둔 감지용 요소를 가져온다. `loadItem` 함수가 핵심이 되며, 인자로 받은 횟수 만큼 컨테이너에 아이템을 가져다 붙인다. `update` 함수는 `loadItem` 함수가 실행될 때 마지막으로 한번씩 실행되며 상태창을 업데이트하기 위해 호출한다.

그리고 마지막에 타겟이 된 요소가 일정 가시성 비율을 넘으면 `loadItem` 함수를 호출시키고 `detector` 요소를 컨테이너에 다시 자식요소로 붙인다. (이렇게 되면 기존의 요소는 납둬지고 새로운 요소가 끼워지는게 아니라 기존의 요소가 다시 최하단으로 이동하게 된다.)

이렇게 해서 간단한 예제가 만들어졌다. 스크롤이 아이템 끝에 위치하게 되면 `detector` 요소가 보여지는게 되므로 결국 `loadItem` 함수가 실행된다. 아래 Codepen에서 예제를 확인할 수 있다.

<https://codepen.io/n2ptune/pen/pojJyeP>

## 정리

- Lazy Load를 구현하기 위해 IntersectionObserver API를 이용할 수 있다.
- 비교적 최신에 만들어진 인터페이스이므로 다양한 브라우저를 지원하지 않는다.
- 감지하기 위해 `observe` 함수를 이용하고 감지를 해제하기 위해 `unobserve` 함수를 이용한다.
- 뷰포트에서 보여지는 조건을 `entry.intersectionRatio > 0`로 사용하였는데, 간단하게 **IO API Entry** 인터페이스의 `isIntersecting` 속성을 사용하면 보다 더 쉽다.

## 참고

- [https://caniuse.com/#feat=mdn-api_intersectionobserver](https://caniuse.com/#feat=mdn-api_intersectionobserver) (브라우저 호환성)
- [https://googlechrome.github.io/samples/intersectionobserver/](https://googlechrome.github.io/samples/intersectionobserver/) (구글 크롬에서 사용한 예제)
- [https://w3c.github.io/IntersectionObserver/#intersection-observer-interface](https://w3c.github.io/IntersectionObserver/#intersection-observer-interface) (W3C 인터페이스 표준)
- [https://velog.io/@doondoony/IntersectionObserver](https://velog.io/@doondoony/IntersectionObserver)
