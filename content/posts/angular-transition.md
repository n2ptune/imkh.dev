---
title: Angular에서 Transition 사용법과 이해
date: 2021-07-28 02:28:19
published: true
tags: ['angular']
cover_image: ./images/angular-transition-thumbnail.jpg
description: Angular에서 Transition을 사용하는 방법과 동작하는 방식을 이해하기 - 공식 문서
---

## 트랜지션

여기에서는 컴포넌트가 생성될 때 `fade-in-out`을 적용시켜 트랜지션을 적용하는 예제에 대해서 기록한다. 앵귤러에서 트랜지션을 사용하는 방법과 다른 프레임워크와의 트랜지션 적용에 대한 차이점도 기록한다.

### 초기 구성

트랜지션을 적용시키기 위해 최상위 모듈에서 `BrowserAnimationsModule`을 추가해야한다. 해당 모듈을 `imports` 프로퍼티에 추가한다.

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  imports: [BrowserAnimationsModule]
})
export class AppModule {}
```

위 모듈을 추가시키면 `@angular/animations` 패키지 내 여러 심볼들을 사용할 수 있게 된다.

### 컴포넌트 구축

버튼을 누르면 `boolean` 타입인 값이 트리거되는 간단한 컴포넌트를 만든다.

```ts
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-transition-button',
  template: `
    <button (click)="handleClick()">
      Transition {{ active | activeText }}
    </button>
    <app-transition-text *ngIf="active"></app-transition-text>
  `,
  styles: []
})
export class TransitionButtonComponent implements OnInit {
  active = false

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.active = !this.active
  }
}
```

해당 템플릿에서 `TransitionText` 컴포넌트는 `active` 값에 의해 렌더링되거나 렌더링되지 않는다. 즉 `active` 값이 트리거될 때마다 트랜지션이 적용된다.

```ts
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-transition-text',
  template: ` <p>Hello I'm Transition Text (fade)</p> `,
  styles: []
})
export class TransitionTextComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
```

`active` 값에 의해 트리거되는 컴포넌트도 간단히 텍스트만 추가해서 작성한다.

### 적용

트랜지션의 대상이 될 컴포넌트에서 `@angular/animations` 패키지의 여러 함수들을 임포트한다.

```ts
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  animations: [
    state(
      'active',
      style({
        opacity: 1
      })
    ),
    state(
      'inactive',
      style({
        opacity: 0
      })
    ),
    transition('active => inactive', [animate('500ms')]),
    transition('inactive => active', [animate('500ms')])
  ]
})
export class TransitionText {}
```

`state` 함수는 상태에 대한 스타일을 지정할 수 있는 함수다. 위 예제에서 상단에 `active` 상태인 스타일을 정의할 때 사용된 `state` 함수는 첫번째 인자로 상태의 이름을 지정하고, 두번째 인자에서 트랜지션이 완료된 시점의 스타일을 `style` 함수로 지정한다. 아래 `transition` 함수는 어떤 상태에서 다른 상태에서 전환될 때, `animation`의 `delay`, `duration`, `timing-function` 등을 지정할 수 있다. 첫번째 인자로 상태의 흐름을 문자열로 주면된다. (매우 직관적임)

```ts
transition('active => inactive, inactive => active', [animate('0.5s')])
```

위와 같이 여러 상태에 대한 `animation`을 설정할 수도 있다.

```ts
transition('* => *', animate('0.5s ease'))
```

와일드카드를 매칭시킬 수 있다. 이 경우 모든 상태에 대해 트랜지션을 적용한다. 모든 애니메이션 메타데이터는 `@Component` 데코레이터의 `animations` 프로퍼티에 작성한다. 그리고 각각의 트리거를 작성한다.

```ts
trigger('trans', [
  state(
    'open',
    style({
      opacity: 1,
      color: 'red'
    })
  ),
  state(
    'close',
    style({
      opacity: 0,
      color: 'blue'
    })
  )
])
```

해당 트리거의 이름은 `trans`다. 추후에 트리거 이름으로 DOM에 바인딩 시킨다. 해당 트랜지션 트리거의 상태는 `open`과 `close`가 존재한다. 각각의 스타일은 투명도와 색상 지정뿐이다.

```ts
trigger('trans', [
  state(
    'open',
    style({
      opacity: 1,
      color: 'red'
    })
  ),
  state(
    'close',
    style({
      opacity: 0,
      color: 'blue'
    })
  ),
  transition('* => *', animate('0.3s ease'))
])
```

아래 `transition` 함수를 추가했고, 모든 상태에서 상태로 이동할 때 `0.3s ease`의 애니메이션을 실행한다. 즉 상태가 변할 때 트랜지션은 0.3초간 실행된다.

```html
<app-transition-text [@trans]="active ? 'open' : 'close'"></app-transition-text>
```

트랜지션 대상이 될 DOM에 `[@트리거 이름]` 형태로 트랜지션을 적용한다. `active` 값에 의해 트랜지션 상태가 지정된다.

```html
<button (click)="handleClick()">Transition {{ active | activeText }}</button>
```

위는 `active` 값을 조작할 버튼이다. 버튼을 누르면 `active` 값이 트리거된다. 이제 버튼을 누르면 아래 트랜지션 대상이 될 컴포넌트는 빨간색이 되거나 파란색이 되거나 투명도가 있다 없거나하는 트랜지션이 적용되었다.

## 비교

Vue에서의 트랜지션은 앵귤러에서 적용하는 것 만큼 어렵지 않다.

```html
<template>
  <div>
    <button @click="active = !active"></button>
    <transition name="fade">
      <div v-if="active">Hello World</div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  .fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.3s ease;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }

    &-enter-to,
    &-leave {
      opacity: 1;
    }
  }
</style>
```

Vue에서는 `active` 값의 변화가 있으면 감싼 `transition` 컴포넌트의 트랜지션이 일어난다. 어찌보면 앵귤러와 비슷한 방식으로 작동하지만 Vue가 좀 더 깔끔하게 트랜지션을 작성할 수 있다.

```tsx
import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

const Transition: React.FC = () => {
  const [active, setActive] = useState()

  return (
    <div>
      <CSSTransition in={state} timeout={200} className="transition-classes">
        <div>Hello World</div>
      </CSSTransition>
    </div>
  )
}

export default Transition
```

리액트에서는 `react-transition-group` 이라는 라이브러리를 활용해서 트랜지션을 적용시킬 수 있다. CSS를 작성해서 트랜지션을 적용시킬 수 있고, 상태 값으로 스타일을 조작하는 방식도 제공한다.

3 프론트엔드 프레임워크/라이브러리들의 트랜지션 적용 방식에 대해서 비교해보았을 때 리액트는 성격이 좀 다르지만, 상태 값을 이용해 트랜지션을 작동시키는 형태이다.
