---
title: Angular Routing 이해하기
date: 2021-07-16 04:20:14
published: true
tags: ['angular']
cover_image: ./images/angular-routing-thumbnail.jpg
description: Angular Routing에 대해 간단히 알아보고 정리해보기
---

## Angular Routing

기본적인 라우팅 방식은 여타 다른 프레임워크나 라이브러리와 비슷하다. Vue에서는 라우터 파일에서 각 경로에 대한 컴포넌트를 매핑시시키고 옵션을 설정한 후에 메인 파일에서 라우터 파일을 불러와 애플리케이션에 등록하는 방식인데, Angular의 많은 부분을 Vue가 흡수해서 개발되었기 때문에 상당 부분이 비슷하다고 볼 수 있다.

```javascript
// router.js
import Router from 'vue-router'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/module',
      name: 'FirstModule',
      component: FirstModule // () => import('./FirstModule.vue')
    }
  ]
})
```

Vue의 라우터 적용 방식인데, Angular에서도 역시 비슷하게 라우팅을 적용시킬 수 있다.

### Install

Angular를 첫 시작할 때, Angular CLI에서 프로젝트를 구성하는데, `--routing` 옵션을 주면, 라우팅 가능한 프로젝트를 세팅해주는데 이미 만들어진 프로젝틑에 라우팅을 추가하려면 다른 방식으로 생성해야한다.

```sh
ng new first-my-angular-project --routing
```

위의 명령어대로 Angular 프로젝트를 시작할 수 있다.

```sh
ng generate module app-routing --flat --module=app
```

위 명령어로 라우팅 모듈을 하나 만들고 여기다 라우팅 처리를하면 이미 존재하는 프로젝트에서 라우팅 기능을 활성화시킬 수 있다.

### Mapping

각 경로에 매핑될 컴포넌트를 `import` 해주어서 사용해야 한다. Vue처럼 비동기 컴포넌트로 구성할 수도 있을 것이다. 원래부터 Angular에 존재했던 기능일 수도 있다.

```typescript
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FirstComponent } from './first/first.component'
import { SecondComponent } from './second/second.component'

const routes: Routes = [
  {
    path: 'first',
    component: FirstComponent,
    children: [
      {
        path: 'second',
        component: SecondComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

`Routes` 타입으로 작성된 라우팅 데이터는 Vue와 완전 흡사하다. Vue가 Angular의 많은 부분을 가져와서 그런 것일 수도 있다.

### Nested Route

아무리 간단한 어플리케이션이라도 요즘엔 1 depth 경로를 가지는 어플리케이션이 많이 없다. 각 경로 마다 하위 경로가 있을 것이고 그 하위 경로의 하위 경로가 존재할 수도 있다. Vue Router에서 구성한 것 처럼 Angular에서도 손쉽게 구성이 가능하다.

```typescript
const routes: Routes = [
  {
    path: 'main', // /main
    component: MainComponent,
    // 여기에 중첩 옵션을 작성
    children: [
      // 타입은 Route 타입과 똑같음
      path: 'sub', // /main/sub
      component: MainSubComponent
    ]
  }
]
```

`children` 키에 똑같은 타입의 옵션을 작성하면 하위 경로를 구성할 수 있다

### WildCard

`**` 형태의 경로로 라우팅 옵션을 설정하면 모든 경로가 이쪽으로 들어오게 된다. 즉 제일 하단에 해당 옵션을 위치시키고 404 페이지를 보여줄 수 있다.

## View

최상위 App 컴포넌트가 위치하고 경로마다 다른 레이아웃이 필요하다면 그 아래 레이아웃 컴포넌트가 위치한 후 라우팅 컴포넌트를 배치시켜 경로마다 다른 컴포넌트가 노출되도록 설정한다.

### router-outlet

Vue에서는 `<router-view />` 컴포넌트를 컴포넌트 아래 위치시키면 라우팅 모듈에 매핑시킨 컴포넌트가 렌더링된다. Angular에도 비슷하게 `<router-outlet></router-outlet>` 을 사용하면 동일한 효과를 볼 수 있다.

```html
<div>
  <nav>
    <ul>
      <li>
        <a href="" routerLink="/first" routerLinkActive="active">
          first routing
        </a>
      </li>
      <li>
        <a href="" routerLink="/first/second" routerLinkActive="active">
          nested routing (second)
        </a>
      </li>
    </ul>
  </nav>
  <router-outlet></router-outlet>
</div>
```

`<router-outlet` 으로 감싼 부분에 우리가 매핑시킨 뷰 컴포넌트로 치환된다.

## Guard

Vue에서 했던 `beforeRouteLeave`, `beforeRouteEnter` 등을 Angular에서는 `Guard`를 통해 구현할 수 있다. 먼저, 가드를 생성하기 위해 Angular CLI의 도움을 받는다.

```sh
ng g guard my-guard
```

`my-guard` 형태로 만들게 되면 뒤에 `.guard.ts`가 붙어서 가드가드가 되어버린다.. 가드 파일만 모아서 폴더 구조를 따로 만들어주진 않아서 따로 가드 파일을 어떻게 관리해야될지 애매하다. 아무튼 가드에서 여러 인터페이스를 구현하면 각 행위에 맞게 접근을 제한하거나 어떤 행위를 기술할 수 있다.

## Router Link

각 경로를 이동하기 위해 Angular에서는 `a` 태그의 `routerLink` 속성을 사용하여 경로를 지정해서 이동하도록 지원한다. 또한 `routerLinkActive` 속성에서 활성화되었을 때의 클래스 지정 등을 활용할 수 있다.
