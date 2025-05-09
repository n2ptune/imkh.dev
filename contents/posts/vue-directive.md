---
title: Vue Directive 알아보고 만들어보기
date: 2020-07-02 03:22:54
published: true
tags: ['vue']
cover_image:
description: Vue에서 기본적으로 제공하는 13가지 디렉티브를 훑어보고 사용자 지정 디렉티브를 만들어보기
---

## Vue Directive

디렉티브(Directive)를 설명하기에 앞서 Vue에서는 코드를 추상화하거나 재사용하기 위해 사용하는 단위로 컴포넌트를 기본 형식으로 사용하고 있다. 애플리케이션의 구성요소가 모두 컴포넌트란 이야기다. 이 컴포넌트를 활용해서 때에 따른 적절한 동작을 취할 수 있지만 어떨 때에는 컴포넌트의 템플릿 내 DOM 요소에 대해 특정한 동작을 취해야 하는 경우도 있다. 이 상황에서 사용할 수 있는 기능이 디렉티브(Directive)라는 기능이다.

### Vue에서 기본으로 제공되는 디렉티브

디렉티브는 2가지로 나뉜다. 사용자 지정 디렉티브라고 해서 직접 디렉티브를 만들거나 타 라이브러리를 사용해서 우리의 애플리케이션에 주입된 디렉티브인 종류가 하나있고, Vue에서 기본적으로 제공하는 디렉티브가 있다. 기본적으로 제공하는 만큼 매우 자주 쓰이는 요소고, 매우 유용한 디렉티브가 많다.

값을 가지는 DOM 요소(textarea, input 등)의 값과 지역 컴포넌트의 데이터와 바인딩 시켜주는 `v-model` 디렉티브가 종류 중 하나이다. 이 디렉티브를 사용하지 않고 컴포넌트의 데이터 객체와 바인딩 시켜주려면 DOM 요소에 이벤트를 추가해서 요소의 값이 바뀔 때마다 컴포넌트의 데이터를 업데이트 해주는 방법이 있는데, 매번 이벤트를 만들고 컴포넌트가 destroy 되면 이벤트를 해제하고, 이런 일련의 방식이 매우 귀찮을 뿐더러 코드의 길이도 길어지게 된다. `v-model` 디렉티브를 사용하면 단 한 줄을 추가하고 컴포넌트의 데이터와 바인딩 시킬 수 있다.

가끔은 서버에서 받아온 HTML 내용을 그대로 클라이언트에서 렌더링해서 보여줘야 되는 상황이 있을 수 있다. 그 때, `v-html` 디렉티브를 사용해서 HTML 내용을 그대로 사용자에게 보여줄 수 있다. 이 경우 서버측에서 필터링을 거치지 않고 오거나 신뢰되지 않은 HTML 내용을 렌더링하게 되면 XSS 공격에 매우 취약해진다. 그러므로 꼭 신뢰된 컨텐츠만을 `v-html` 디렉티브를 사용해서 렌더링해야 한다.

템플릿에서 적을 수 없는 문자열을 출력해야 할 때도 있다. 예를 들어 템플릿 내에서 Mustache(콧수염 태그)를 사용하게 되면 그 안의 내용은 자바스크립트로 해석 되어 출력된다. 이런 콧수염 태그를 그대로 보여주고 싶을 때도 있을 것이다. 그럴 때에는 `v-text` 디렉티브를 사용하면 텍스트의 내용을 그대로 출력할 수 있게 된다.

그 다음으로는 매우 자주 사용되는 디렉티브들만 남았다. 디렉티브의 이름도 매우 직관적으로 되어 있어 디렉티브의 이름만으로도 이 디렉티브가 무슨 기능을 하는지 단번에 알 수 있다. 첫번째로, 조건에 따라 컴포넌트 혹은 DOM요소를 렌더링 할 수 있는 `v-if`, `v-else`, `v-else-if` 3개의 디렉티브가 있다. 이 디렉티브들은 자바스크립트에서 조건문을 사용할 때 처럼 사용하면 되고, 오른쪽에 오는 값이 참이면 해당 디렉티브를 가진 요소가 렌더링 될 것이고, 해당 요소와 같은 레벨의 요소가 `v-else`를 가지고 있다면, 그 요소는 `v-if`를 가진 요소가 렌더링 될 때 렌더링 되지 않으며, 값이 거짓이 된다면 `v-else` 디렉티브를 가진 요소가 렌더링 될 것이다. `v-else-if` 디렉티브는 비교적 최근에 추가 된 디렉티브이며 추가적인 조건을 달 수 있다.

이와 비슷하게 값이 참이면 보여주고 거짓이면 보여주지 않는 디렉티브가 한개 더 있다. `v-show`라는 디렉티브이다. 이 디렉티브의 값이 참이면 해당 요소를 보여주며, 거짓이면 보여주지 않는 점에서 `v-if` 외 2개 디렉티브와 유사하다. 다른 점이라고 한다면 렌더링의 차이에 있을 수 있다. `v-show` 디렉티브에 의해 보여지지 않는 요소는 보여지지 않는 다고 해도 Vue 인스턴스 내에 반드시 존재하며 간단히 CSS를 조작해서 보여지지 않게끔 되어 있다. 반대로, `v-if`에 의해 요소가 보여지지 않게 되면 Vue 인스턴스 내에서 제거 되고 디렉티브의 값이 참이 되면 다시 인스턴스 내에 삽입되므로 어느 정도 비용이 발생한다. 따라서, 상황에 맞게 사용하는 것이 바람직한데 만약 디렉티브의 값이 수시로 바뀔 수 있거나 그래야 하는 경우는 삽입과 제거가 빈번하게 일어나므로 좀 더 가벼운 `v-show`를 사용하는 것이 나을 것이고, 그렇지 않고 가끔 값의 변화가 일어나는 경우는 `v-if`도 괜찮을 것이다.

그 외에 위의 디렉티브를 포함해서 총 13개가 있으며 이외에 디렉티브들도 위의 디렉티브와 마찬가지로 매우 유용하고 직관적이며 쉽다. [공식 홈페이지](https://kr.vuejs.org/v2/guide/syntax.html#%EB%94%94%EB%A0%89%ED%8B%B0%EB%B8%8C)에서는 한국어도 제공하고, 이해하기 쉬운 예제가 있으며 좀 더 자세한 설명을 해주고 있다.

## 사용자 지정 디렉티브 만들기

경우에 따라서는 기본으로 제공하는 디렉티브 외에 다른 디렉티브를 만들어서 사용하는 경우가 편할 때도 있다.

Vue에서 사용자 지정 디렉티브를 만들기 위해서 2가지 방법 중 하나를 사용하거나 두 가지 모두 사용할 수 있다. 차이는 **전역적**으로 사용할 것인가, **지역적**으로 사용할 것인가에 있다. **CLI**를 이용해서 만든 애플리케이션 구조에서는 `main.js`에 코드를 추가해서 전역적인 디렉티브를 만들 수 있다. 그리고 컴포넌트 내 옵션인 `directives`를 적절히 수정해서 지역적인 디렉티브를 만들 수 있다.

### 전역적으로 디렉티브 만들기

**CLI**를 이용해서 프로젝트를 만들었다고 가정하고 `main.js`에 코드를 추가한다.

```js
import Vue from 'vue'

Vue.directive('tooltip', {
  inserted: function (el, binding, n, o) {
    console.log(el, binding, n, o)
  }
})
```

위와 같이 작성하면, `v-tooltip` 이라는 디렉티브를 모든 컴포넌트에서 사용할 수 있게된다. `directive` 메서드가 받는 첫번째 인자는 디렉티브의 이름이다. 만약 tooltip이라고 적게 되면 `v-` 접두사가 붙어 `v-tooltip`이 된다. 두번째는 디렉티브의 옵션을 주면 되는데, 여러 훅 함수와 훅 함수에 전달되는 인자를 제공한다. 훅은 5단계로 이루어져 있으며 컴포넌트의 라이클과 비슷한 성격의 훅을 제공한다.

### 디렉티브 훅 함수

디렉티브는 5단계에 걸쳐 옵션으로 준 함수를 실행한다. (함수를 제공하지 않으면 아무 일도 하지 않음) 컴포넌트의 라이프 사이클에서 상황에 맞는 훅에 적절한 동작을 취하는 코드를 작성하는 것처럼 디렉티브에서도 상황에 맞는 훅에 어떤 동작을 할 수 있다.

- `bind` 훅 함수

해당 함수는 디렉티브와 디렉티브가 걸려있는 요소와 연결될 때 한번만 실행된다. 이 때, 초기값을 설정할 수 있다.

- `inserted` 훅 함수

디렉티브와 디렉티브가 걸려있는 요소가 부모 노드에 삽입되었을 때 실행된다.

- `update`, `componentUpdated`, `unbind` 훅 함수

각각 디렉티브가 걸려있는 요소가 업데이트될 때 실행되는 훅 함수, 컴포넌트와 그 자식들이 업데이트될 때 실행되는 훅 함수, 바인딩이 끊길 때 실행되는 함수가 있다.

### 디렉티브 훅 전달 인자

풀어쓸 정도로 복잡하지 않으며 [공식 홈페이지](https://kr.vuejs.org/v2/guide/custom-directive.html#%EB%94%94%EB%A0%89%ED%8B%B0%EB%B8%8C-%ED%9B%85-%EC%A0%84%EB%8B%AC%EC%9D%B8%EC%9E%90)에 매우 자세하게 나와있으며 이 내용에 대해 어떠한 견해도 없고 추가적으로 적어야 할 내용도 없어 보인다. 한가지 주의할 점은 모든 전달 인자는 수정해서 안된다고 한다.
