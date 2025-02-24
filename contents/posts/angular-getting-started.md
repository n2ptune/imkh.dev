---
title: Angular 프로젝트 설치하고 컴포넌트 만들기
date: 2021-07-13 12:19:45
published: true
tags: ['angular']
cover_image:
description: Angular 프로젝트 설치하고 컴포넌트 만들기 CLI 설치하기
---

## Angular 시작하기

`vue`와 마찬가지로 Angular는 프로젝트를 구성하기 위한 도구로 CLI를 제공한다. 이 글에서는 Angular 프로젝트를 간단하게 설치하고 구성해보는 걸 목표로 학습하고 정리한다.

### Angular CLI 설치하기

`npm` 혹은 `yarn` 패키지 매니저를 통해 CLI를 설치한다.

```sh
npm i -g @angular/cli
# or
yarn global add @angular/cli
```

`ng new` 커맨드를 통해 프로젝트를 생성할 수 있다.

```sh
ng new angular-getting-started

? Would you like to add Angular routing? (y/N) y
? Which stylesheet format would you like to use? (Use arrow keys)
❯ CSS
  SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]
  Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
  Less   [ http://lesscss.org
```

프로젝트를 구성하는 도중 여러가지를 물어본다. route 기능을 사용할건지와 어떤 CSS 전처리기를 사용할지 물어본다. route 기능을 사용하고 SCSS를 사용할 것이므로 체크하고 넘어간다.

```sh
✖ Package install failed, see above.
The Schematic workflow failed. See above.
```

에러를 마주했다. 당황하지 않고 로그를 살펴본다.

```sh
cat ~/.npm/eresolve-report.txt

Could not resolve dependency:
peer jasmine-core@">=3.8" from karma-jasmine-html-reporter@1.7.0
node_modules/karma-jasmine-html-reporter
  dev karma-jasmine-html-reporter@"^1.5.0" from the root project
```

의존성 충돌이 일어났다. npm 버전이 올라가면서 자주 이러는 것 같다. Angular CLI 커맨드 중 `--skipInstall` 옵션을 통해 프로젝트를 구성하고 자동으로 의존성을 설치해주는 단계를 건너띌 수 있다.

```sh
.
├── README.md
├── angular.json
├── karma.conf.js
├── package.json
├── src
│   ├── app
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.scss
│   └── test.ts
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json

4 directories, 21 files
```

프로젝트 구성이 끝났다. `--legacy-peer-deps` 옵션과 함께 의존성을 설치한다.

```sh
npm install --legacy-peer-deps
```

의존성 설치를 끝냈으면 `ng serve` 명령어를 통해 개발 서버를 실행시킬 수 있다. `--open` 옵션과 함께 사용되면 브라우저까지 자동으로 열어준다. 기본적으로 4200 포트에 열리는 것 같다. 설치는 이로써 완료되었다.

### Angular 첫번째 컴포넌트 만들기

`ng generate component` 명령어를 통해 컴포넌트 구조 또한 자동으로 만들 수 있다. 신기하게도 CLI에서 모든 부분을 제공해준다. 상당히 편한 기능인데, 굳이 사용하지 않아도 된다.

```sh
ng generate component my-first-component
CREATE src/app/my-first-component/my-first-component.component.scss (0 bytes)
CREATE src/app/my-first-component/my-first-component.component.html (33 bytes)
CREATE src/app/my-first-component/my-first-component.component.spec.ts (698 bytes)
CREATE src/app/my-first-component/my-first-component.component.ts (322 bytes)
UPDATE src/app/app.module.ts (519 bytes)
```

기본적으로 타입스크립트 파일로 생성되고, 프로젝트를 생성할 때 지정한 CSS 전처리기에 해당하는 파일로 생성되는 것 같다. 또한 테스트 파일도 자동으로 생성된다. (ㅎㄷㄷ)

`vue`는 HTML, 자바스크립트, CSS가 한 파일에 모아져 있는 싱글 파일 컴포넌트 체계인데 Angular는 각 파일들이 서로 분리되어 있는 형태로 스타일을 가이드하는 것 같다.

### 라이프사이클 인터페이스

`@angular/core` 패키지에서 여러 인터페이스를 제공한다. 라이프사이클에 관련된 인터페이스를 구현하는 클래스를 만들면 각 라이프사이클에 행위에 대한 기능을 작성할 수 있다. 예를 들어 `ng generate component` 명령어를 통해 컴포넌트를 만들면 자동으로 `OnInit` 인터페이스를 구현한 클래스를 만들어준다.

추가로 `OnDestroy` 인터페이스를 구현하면 컴포넌트가 파괴될 때의 행위를 기술할 수 있다.

```ts
import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-my-first-component',
  templateUrl: './my-first-component.component.html',
  styleUrls: ['./my-first-component.component.scss']
})
export class MyFirstComponentComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {
    console.log()
  }

  ngOnDestroy(): void {
    console.log()
  }
}
```

`ngOnDestory` 를 구현하면 된다. 라이프사이클을 가지고있는 인터페이스를 구현하면 그 라이프사이클에 맞는 메서드를 실행할 수 있다.
