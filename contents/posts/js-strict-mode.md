---
description: 자바스크립트로 작성된 기존의 레거시 코드들은 자바스크립트가 발전하고 이를 실행하는 엔진이 표준 규격인 ECMAScript 사양에 따라 추가되거나 변경되는 부분들에 있어서 호환이 제대로 되지 않는 부분이 분명 있을 것이다. 이를 방지하기 위해서 큰 변화가 있었던 ES6부터의 변경사항은 ES5의 기본 모드에서는 활성화되지 않도록 설계되었다. 이 변경사항을 적용시키려면 어떻게 해야되는지를 알아보고 엄격 모드에 대해서 정리한다.
cover_image: /images/js-strict-mode.png
tags: ['javascript', 'es6']
published: true
date: 2020-03-08
title: 자바스크립트 엄격한 모드 (js strict mode)
---

## 자바스크립트의 큰 변화와 하위 호환성 이슈

ES5에서 ES6로 개정되고 매우 큰 변화가 자바스크립트에 찾아왔다. 화살표 함수, 객체 구조 분해 할당, 인자 기본값, 전개 연산자 등등 눈에 띄게 많은 변화가 있었다. 이런 눈으로 보이는 부분만이 아니라 자바스크립트 내부에서도 많은 변화가 있다고 한다.

자바스크립트 내부에서도 변화가 있었기 때문에 기존의 코드들이 최신 ECMAScript 스펙을 따라 만들어진 자바스크립트에서는 실행이 안될 수 있거나, 어떤 부분에서 실행이 되지 않는다거나, 오류가 난다거나 다양한 호환성 문제가 일어날 수 있다.

이런 호환성 문제가 반드시 일어날 수 있기 때문에 ES6 이후의 많은 변화들은 기존의 ES5 코드에서는 적용되지 않도록 설계했다.

ES6 이후의 많은 변화들은 이 **엄격 모드**를 사용해야 적용이 된다.

## 실행 환경

**Chrome Devtools**를 사용하여 엄격 모드에 대해 알아본다.  
Chrome 브라우저에서 F12를 눌러 콘솔탭에서 예제를 실행할 수 있다.

콘솔탭에서는 구문을 입력하고 엔터를 누르면 바로 스크립트가 실행되기 때문에, 구문을 입력하고 `Shift+Enter`를 누르면 여러 줄에 걸쳐 코드를 작성할 수 있다.

[Chrome](https://www.google.com/intl/ko/chrome/)

## 엄격 모드 사용

엄격 모드는 엄격 모드를 사용하지 않는 부분과 같이 사용할 수 있다. 하지만 엄격 모드로 작성된 파일과 엄격 모드로 작성되지 않은 파일을 연결해서 사용하면, 전체가 엄격 모드로 실행된다. 그러므로 부분적으로 엄격 모드를 적용하려면 함수 단위로 적용시키거나, 아예 모든 자바스크립트 파일에서 엄격 모드로 통일시키는 것이 좋다.

이와 관련해서 문제가 있었던 적이 있다고 한다.

- [https://bugzilla.mozilla.org/show_bug.cgi?id=579119](https://bugzilla.mozilla.org/show_bug.cgi?id=579119)
- [https://bugzilla.mozilla.org/show_bug.cgi?id=627531](https://bugzilla.mozilla.org/show_bug.cgi?id=627531)

이 엄격 모드를 사용하려면 스크립트 최상단에 `'use strict';` 구문을 넣으면 된다.

```js
'use strict'

let a = 'Hello Strict'
```

`'use strict'`와 `"use strict"`는 똑같다. 이렇게 작성하고 나면 이 스크립트는 엄격 모드로 실행된다. ES6 이후 적용된 변화로 스크립트를 실행한다.

use strict 구문은 스크립트 최상단에 위치하거나 함수 본문 최상단에 위치해야 한다.

```js
// prettier-ignore
'use strict'

(function() {
  let a = 'Hello Strict'
  console.log(a)
})

// error
// VM269:3 Uncaught TypeError: "use strict" is not a function
//     at <anonymous>:3:1
```

위 코드의 에러 내용은 `"use strict"`가 함수가 아니라고 나온다. 세미콜론이 없으면 위 코드는 다음과 같이 해석될 수 있다.

```js
'use strict'(function() {...})
```

문자열은 함수가 아니기 때문에 위의 코드는 실행할 수 없다.

```js
// prettier-ignore
(function() {
  'use strict'

  let a = 'Hello Strict'
  console.log(a)
})
```

위의 코드는 정상적으로 실행할 수 있다.

```js
function sum(a, b) {
  'use strict'

  return a + b
}

function print(a) {
  'use strict'

  console.log(a)
}
```

함수마다 엄격 모드를 사용하거나 사용하지 않을 수 있다.

```js
if (true) {
  // prettier-ignore
  'use strict'

  console.log('Something wrong')
}
```

{로 시작해서 }로 끝나는 블록문에서는 엄격 모드를 사용해도 실행은 되지만 엄격 모드가 적용되지 않는다.

```js
function a() {
  return 'a'
}

function b() {
  return 'b'
}

function c() {
  return 'c'
}

export { a, b, c }
```

모듈 기능을 사용하는 자바스크립트에서는 이 기능이 ES6 이후에 발표되었기 때문에 기본적으로 엄격 모드로 동작한다.

## 엄격 모드 vs 비엄격 모드

```js
var undefined = 'undefined'
var Infinity = 'Infinity'
var NaN = 'NaN'
```

위 3가지 구문은 ES5에서는 매우 잘 동작한다. 오류도 뿜지않고 실행된다. 엄격 모드를 사용하면 에러를 발생시킨다.

```js
'use strict'

var undefined = 'undefined'
var Infinity = 'Infinity'
var NaN = 'NaN'

// error
// VM1168:3 Uncaught TypeError: Cannot assign to read only property 'undefined' of object '#<Window>'
// at <anonymous>:3:17
```

```js
var person = Object.defineProperty({}, 'info', {
  value: 'lee',
  writable: false
})

person.info = 'person'
```

마찬가지로 ES5에서 위의 객체는 다른 값을 쓸 수 없는 객체지만 문제없이 실행된다. (물론 값이 바뀌진 않음)

```js
'use strict'

var person = Object.defineProperty({}, 'info', {
  value: 'lee',
  writable: false
})

person.info = 'person'

// error
// VM1695:8 Uncaught TypeError: Cannot assign to read only property 'info' of object '#<Object>'
// at <anonymous>:8:13
```

엄격 모드에서는 `TypeError`가 발생한다.

```js
false.undefined = 'undefined'
'undefined'.undefined = 'undefined'
;(1.25).undefined = NaN
;(4.5).NaN = null
```

ES5에서는 위 4가지 구문이 모두 잘 작동한다. (실제로 반영되지 않음)

```js
'use strict'

false.undefined = 'undefined'
'undefined'.undefined = 'undefined'
;(1.25).undefined = NaN
;(4.5).NaN = null

// error
// VM1912:3 Uncaught TypeError: Cannot create property 'undefined' on boolean 'false'
// at <anonymous>:3:17
```

엄격 모드에서는 첫 구문부터 에러가 난다. 엄격 모드에서는 원시 자료형에 속성을 설정하는 걸 막는다.

그 밖에 객체의 속성이 읽기 전용 속성일 때 속성을 바꾸려 할 때, `Object.prototype.preventExtensions`를 사용해 객체를 확장 불가 상태로 만들었을 때 객체를 확장시킨다거나 삭제할 수 없는 속성을 삭제시키면 모두 에러를 발생시킨다.

## 엄격 모드 in 브라우저

엄격 모드는 모든 브라우저가 지원하지 않는다. (대표적으로 IE나 IE나 IE 혹은 IE) IE11 이상에서는 엄격 모드를 지원한다. 모던 브라우저들이 낮은 버전을 제외하고 모두 엄격 모드를 지원한다.

이렇게 브라우저마다 엄격 모드 지원 여부가 다르기 때문에 항상 엄격 모드를 사용하고 작성하는 코드는 엄격 모드를 지원하지 않는 브라우저에서 테스트를 자주 해봐야 한다.

엄격 모드에서 잘 되던 코드가 엄격 모드를 지원하지 않는 브라우저에서 예상대로 작동되지 않을 수도 있거나 작동되면 안되는데 작동될 수도 있다.

사실, 엄격 모드를 지원하지 않는 브라우저에서 작동되는 코드를 만들어야 되는 환경이 더 아쉽지만 사용자가 어떤 브라우저로 스크립트를 실행하게 될지는 모르는 거니까 알아두면 좋을 것 같다.

## 참고

- [https://caniuse.com/#feat=use-strict](https://caniuse.com/#feat=use-strict)
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode)
- [https://ko.javascript.info/strict-mode](https://ko.javascript.info/strict-mode)
- [https://developers.google.com/web/tools/chrome-devtools/javascript?hl=ko](https://developers.google.com/web/tools/chrome-devtools/javascript?hl=ko)
- [https://stackoverflow.com/questions/24369328/how-to-use-strict-mode-in-chrome-javascript-console](https://stackoverflow.com/questions/24369328/how-to-use-strict-mode-in-chrome-javascript-console)
