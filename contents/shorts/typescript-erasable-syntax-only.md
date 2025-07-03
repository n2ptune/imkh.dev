---
title: TypeScript erasableSyntaxOnly에 대한 학습과 정리
published: true
date: 2025-07-03T02:37:06.770Z
cover_image:
description: TypeScript erasableSyntaxOnly 옵션을 학습하고 정리해보기
tags: ['typescript']
---

## TypeScript erasableSyntaxOnly에 대한 학습과 정리

타입스크립트 최근 버전에서 사용할 수 있는 `erasableSyntaxOnly` 옵션은 자바스크립트 런타임에서 지울 수 있는 타입스크립트 구문만 허용한다는 의미이다. 여기서 "지울 수 있는 타입스크립트 구문"에 대한 명칭이 다소 생소한데, 생각해보면 바로 알 수 있는 개념이다.

```ts
interface Student {
  name: string
  grade: string
  score: number
}

const student: Student = {
  name: 'Lee',
  grade: 'A',
  score: 96
}
```

예를 들어 위 타입스크립트 내용을 자바스크립트로 컴파일시 지울 수 있는 구문을 제외한 자바스크립트만 남는다.

```js
const student = {
  name: 'Lee',
  grade: 'A',
  score: 96
}
```

인터페이스 선언 내용은 지울 수 있는 타입스크립트 구문이기에 제거되고 실행 가능한 자바스크립트 구문만 남는다.

이러한 지울 수 있는 타입스크립트 구문은 타입, 인터페이스 등 컴파일 전 정적 타입 확인시에만 필요한 부분들은 타입스크립트 컴파일시 모두 제거된다. 런타임시에는 필요가 없는 부분이기 때문이다. 그렇다면 지울 수 없는 타입스크립트 구문에는 뭐가 있을까?

### 지울 수 없는 타입스크립트 구문

런타임시에도 영향을 끼치는, 즉 런타임에도 필요한 타입스크립트에서만 사용한 구문은 반드시 제거되지 않고 남게 된다.

```ts
enum HTTPMethod {
  GET = 'get',
  POST = 'post'
}

const method = HTTPMethod.GET
```

`enum`이 그 대표적인 예인데, 해당 타입스크립트 구문은 자바스크립트에 그대로 남아있게 된다.

```js
var HTTPMethod
;(function (HTTPMethod) {
  HTTPMethod['GET'] = 'get'
  HTTPMethod['POST'] = 'post'
})(HTTPMethod || (HTTPMethod = {}))
const method = HTTPMethod.GET
```

자바스크립트로 컴파일되어도 `enum`이 남아있는 부분을 볼 수 있다.

```ts
function call() {
    console.log('called');
}

namespace Http {
    call();

    export type Method = string;
}

---> 자바스크립트로 컴파일시

function call() {
    console.log('called');
}
var Http;
(function (Http) {
    call();
})(Http || (Http = {}));
```

`namespace` 선언도 마찬가지로, 자바스크립트로 컴파일되어도 남게된다.

이외에도 타입스크립트 클래스에서 생성자에 `public` 키워드를 달아 멤버를 초기화하는 shorthand 방식도 자바스크립트로 컴파일시 남아있기 되기 때문에 런타임에서 지울 수 없는 타입스크립트 구문이라고 볼 수 있다.

다시 돌아와서, `--erasableSyntaxOnly` 타입스크립트 옵션은 이러한 지울 수 없는 타입스크립트 구문을 허용하지 않는다는 의미이다. "지울 수 있는" 타입스크립트 구문만 허용한다. [타입스크립트 공식 문서](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html)에서는, Nodejs v23.6 부터 타입스크립트를 바로 실행할 수 잇도록 지원하기 시작한다는데, "지울 수 있는 타입스크립트 구문"을 포함한 타입스크립트 파일만 직접 실행할 수 있다고 이야기한다. 즉, 해당 옵션을 반드시 사용해야만 타입스크립트 파일을 직접 실행할 수 있는 것 같다.
