---
description: 자바스크립트에서 Clipboard를 사용하여 텍스트를 복사하는 여러 방법
cover_image: /images/js-clipboard.png
tags: ['javascript']
published: true
date: 2020-03-09
title: 자바스크립트를 이용해서 텍스트를 클립보드에 복사시키는 여러 방법
---

## document.execCommand 이용

마크다운 에디터 혹은 블로그에서 포스트를 작성하기 위해서 사용하는 에디터에서는 글을 쓰는 도중 어떤 단어에 굵기나 밑줄, 이탤릭체를 주고 싶다면 그 부분을 선택하고 아이콘을 눌러 굵기를 주거나 다양한 옵션을 사용할 수 있다.

그런 기능을 하는 **API**가 `document.execCommand`다. 굵기와 밑줄 등 다양하게 사용할 수 있고 많은 기능을 제공한다. 복사하기 붙여넣기 등이 그 예다. 이 글은 붙여넣기에 대해서 알아본다.

```vue
<div id="app">
  <button>dummy 복사하기</button>
</div>

<script>
function copyText() {
  const temp = document.createElement('textarea')

  document.body.appendChild(temp)

  temp.value = 'dummy'
  temp.select()

  document.execCommand('copy')
  document.body.removeChild(temp)

  window.alert('복사 완료')
}

const button = document.querySelector('button')
button.addEventListener('click', copyText)
</script>
```

간단하게 버튼 하나를 만들고 버튼을 눌렀을 때 함수가 실행되게 한다. 이 함수는 `textarea` 태그를 하나 만들어서 그 안의 값으로 `dummy`라는 문자열을 준다. 그리고 이 태그를 `select` 함수를 통해 선택되게 한다.

`document.execCommand`는 첫번째 매개변수로 오는 어떠한 명령을 실행한다. `bold`, `copy`, `cut`, `createLink` 등이 있고 이 중에 `copy`를 사용해 클립보드에 복사시킨다.

그리고 임시로 만들었던 `textarea` 태그를 삭제한다. 그러면 클립보드에 `dummy` 라는 문자열이 정상적으로 복사된 걸 볼 수 있다.

`document.execCommand`는 모든 브라우저에서 지원하며 IE까지 지원한다. 하지만 첫번째 매개변수로 오는 명령 중 몇개는 일부 브라우저에서는 지원하지 않으니 사용하려면 호환성을 체크해야한다. `copy` 명령어는 낮은 버전의 브라우저를 제외한 모든 브라우저가 지원한다. (IE9+, Edge12+, Chrome42+)

<https://codepen.io/n2ptune/pen/WNvdrbq>

[document.execCommand 브라우저 호환성](https://developer.mozilla.org/ko/docs/Web/API/Document/execCommand#%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%ED%98%B8%ED%99%98%EC%84%B1)

## Clipboard API

비교적 최근에 발표된 인터페이스, 마찬가지로 텍스트를 복사하거나 붙여넣거나할 수 있다. 데이터 버퍼를 이용한 구현 방식으로 `navigator` 객체의 `clipboard` 속성으로 존재한다.

```js
;<div id="app">
  <button>dummy 복사하기</button>
</div>

const clipboard = navigator.clipboard
const button = document.querySelector('button')

button.addEventListener('click', function () {
  clipboard.writeText('dummy').then(function () {
    window.alert('복사 완료')
  })
})
```

`document.execCommand`를 활용한 코드보다 굉장히 직관적이고 깔끔하게 보인다. 그리고 **DOM**을 새로 만들어서 집어넣고 다시 지워야되는 동작을 안해도 된다. 퍼포먼스 측면에서도 **Clipboard API**가 훨씬 깔끔하다.

이 API는 총 4개의 함수를 제공한다. `read`, `readText`, `write`, `writeText` 4개의 함수는 모두 이름과 같이 클립보드에서 데이터를 읽거나 텍스트를 읽거나 데이터를 쓰거나 텍스트를 쓰거나하는 동작을 한다.

그리고 4개의 함수 모두 `Promise`를 반환한다. 그렇기 때문에 비동기 작업이 가능하며 함수가 끝났을 때에 적절한 로직을 넣어주기만 하면 된다.

하지만 앞서 말했듯이 비교적 최근에 발표된 인터페이스라 아직 지원하는 브라우저나 지원을 시작한 버전이 최근 버전들이기 때문에 이전 버전의 브라우저에서는 사용하지 못한다.

또, `read` 함수와 `write` 함수는 기본적으로 비활성화 되어있으며 사용하려면 설정을 바꿔주어야 하는 등의 복잡함이 있다. 모든 브라우저가 지원하지 않기 때문에 호환성을 반드시 살펴봐야 한다.

<https://codepen.io/n2ptune/pen/XWbVXMM>

[Clipboard API 브라우저 호환성](https://developer.mozilla.org/ko/docs/Web/API/Clipboard#Browser_Compatibility)  
[ClipboardEvent API](https://developer.mozilla.org/ko/docs/Web/API/ClipboardEvent)

## clipboard.js

클립보드를 좀 더 쉽게 다룰 수 있는 자바스크립트 라이브러리, CDN을 통해서 직접 링크로 불러올 수 있고, **NPM**으로 설치할 수도 있다. 아래는 **clipboard.js**를 이용한 예제다.

```vue
<div id="app">
  <button class="btn" data-clipboard-text="dummy">dummy 텍스트 복사하기</button>
</div>

<script>
new ClipboardJS('.btn')
</script>
```

스크립트는 단 한줄, `data-` 속성에 원하는 속성을 붙여넣어서 어떤 동작을 하거나 어떤 텍스트를 복사시킬 수 있다. 매우 간단해졌다. `ClipboardJS` 생성자를 이용해서 매개변수에 선택자를 넣어주게 되면 선택자에 맞는 클래스명/아이디/태그명을 가진 태그와 알맞게 결합해서 알맞는 동작을 한다.

```vue
<div id="app">
  <input id="something" value="dummy input" />
  <button class="btn" data-clipboard-target="#something">
    dummy 텍스트 복사하기
  </button>
</div>

<script>
new ClipboardJS('.btn')
</script>
```

위와 같이 타겟을 정해서 타겟의 값을 복사할 수 있다. 스크립트는 수정할 필요 없이 `data-` 속성을 조작하면 된다. 복사하는 액션 외에 잘라내기 등을 사용할 수 있다.

```js
const clipboard = new ClipboardJS('.btn')

clipboard.on('success', function (e) {
  console.info('Action:', e.action)
  console.info('Text:', e.text)
  console.info('Trigger:', e.trigger)

  e.clearSelection()
})

// console
// "Action:" "copy"
// "Text:" "dummy input"
// "Trigger:" "<button class='btn' data-clipboard-target='#something'>dummy 텍스트 복사하기</button>"
```

이벤트를 감지하는 것도 가능하다. 생성자를 호출하고 반환받은 변수에 객체를 담고 이 객체의 `on` 함수를 이용하면 다양한 이벤트의 감지를 할 수 있게된다. 예를 들어 클립보드에 복사가 완료된 시점에 호출되는 `success` 이벤트는 이벤트의 메타데이터를 담고있는 변수를 매개변수로 받는 콜백을 하나 정의하면, 완료된 시점에 콜백 함수가 호출된다.

브라우저 호환성은 뛰어난 편이다. 악덕높은 IE를 9버전부터 사용 가능하고, 그 외의 모든 브라우저에서 작동할 수 있다. 사용도 쉽고 이벤트의 감지도 할 수 있고, 옵션도 여러있고. 간단하게 구현해야할 상황이면 `document.execCommand`를 사용하고 좀 더 까다로운 로직에는 이 라이브러리를 사용하면 편할 것 같다.

<https://codepen.io/n2ptune/pen/QWbayab>

## 참고

- [https://www.w3schools.com/jsref/met_document_execcommand.asp](https://www.w3schools.com/jsref/met_document_execcommand.asp)
- [https://developer.mozilla.org/ko/docs/Web/API/ClipboardEvent](https://developer.mozilla.org/ko/docs/Web/API/ClipboardEvent)
- [https://github.com/zenorocha/clipboard.js](https://github.com/zenorocha/clipboard.js)
- [https://zetawiki.com/wiki/JavaScript*%ED%81%B4%EB%A6%BD%EB%B3%B4%EB%93%9C%EB%A1%9C*%EB%B3%B5%EC%82%AC%ED%95%98%EA%B8%B0](https://zetawiki.com/wiki/JavaScript_%ED%81%B4%EB%A6%BD%EB%B3%B4%EB%93%9C%EB%A1%9C_%EB%B3%B5%EC%82%AC%ED%95%98%EA%B8%B0) (구식 IE에서 사용할 수 있는 방법이라든지 재밌는 방법이 많다)
