---
title: Next.js 시작해보기
date: 2021-03-30 14:10:16
published: true
tags: ['react']
cover_image:
description: Create Next App을 이용해 Next.js 프로젝트를 설치하고 구조 살펴보기
---

## 설치

리액트 애플리케이션에 대한 기초 환경설정을 대신 해주는 솔루션인 Create React App(CRA)처럼 Next.js 환경을 자동으로 구축해주는 Create Next App(CNA)라는 것이 있다. 이를 이용하면 웹팩 환경설정부터 시작해서 초기에 설정해야하는 많은 설정을 대신 해주고 리액트를 서버 사이드에서 렌더링해주는 많은 환경설정을 대신 해준다.

```sh
npx create-next-app
# or
yarn create next-app
```

`npm` 혹은 `yarn`을 이용해서 CNA을 실행한다. `-e`, `--example` 옵션으로 다른 사람이 미리 구축해놓은 프로젝트로 시작할 수 있다. `vue-cli`에서 프로젝트를 만들 때, 템플릿이라는 개념과 비슷하게 생각하면 될 것 같다.

`--use-npm` 옵션을 통해 패키지 매니저로 `npm`을 사용하도록 지정할 수 있다. `yarn`이 설치된 환경이라면 기본적으로 `yarn`을 사용한다.

기초 환경설정을 미리 해주는 것 이외에 CNA을 통해서 프로젝트를 구성하면 많은 이점이 있다.

- 오프라인에서 사용할 수 있다. (로컬 패키지 캐시를 사용해서 프로젝트를 구성한다.)
- 테스트 된 프로젝트를 시작할 수 있다. `-e` 혹은 `--example` 옵션으로 다른 사람이 만들어놓은 프로젝트 위에서 프로젝트를 시작할 때 만들어진 프로젝트에 대한 검증이 필요없다. 여기에 올라가는 프로젝트는 Next.js 팀에서 검증하고 테스트 후에 올려진다.
- 예제를 지원한다. Next.js를 이용해서 만들고 싶은 형태의 웹 페이지에 대한 기본 예제를 제공한다.
- 종속성이 없다. 프로젝트를 구성할 때 `react`, `react-dom`, `next` 패키지 외 아무 종속성이 없다.

## 시작

```sh
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
```

Next.js 공식 홈페이지에서 제공하는 블로그에 대한 예제이다. nextjs-blog 폴더 내에 프로젝트를 구성한다. 기본적으로 `npm`을 사용하며 예제로 사용할 프로젝트의 주소는 `--example` 옵션으로 준 URL과 같다. 정상적으로 프로젝트가 설치되었다면 `npm run dev`로 바로 서버를 실행시킬 수 있다.

### 페이지 구성

`pages` 디렉터리에 파일을 추가하게 되면 Next가 알아서 경로를 구성해준다. 예를 들어, `pages` 디렉터리 내 `post.js`라는 파일을 아래와 같이 작성한다.

```jsx
export default function Post() {
  return (
    <main>
      <h1>Hello Post Page</h1>
    </main>
  )
}
```

함수를 내보내고 개발 서버를 실행한 후에 `http://localhost:3000/post`로 접근하면 `Hello Post Page`라는 제목을 볼 수 있게된다.

중첩된 경로를 제공하려면 `pages` 디렉터리 내에 또 다른 디렉터리를 생성하면 된다. 예를 들어 `/post/detail` 이라는 경로를 구성하고 싶다면 아래와 같은 디렉터리를 가질 수 있도록 구성한다.

```sh
├── pages
│   ├── index.js
│   └── post
│       ├── detail.jsx
│       └── index.jsx
```

위와 같은 디렉터리를 가지면, `/`, `/post`, `/post/detail` 세 개의 경로를 가진다. 파일 기반 라우팅 시스템이라 해서 해당 디렉터리 내에 파일을 작성하면 그 파일이 실제 경로가 되는 것이다. (Vue 진영에서는 Nuxt 프레임워크가 해당 기능을 거의 동일하게 제공한다.)

### 페이지 이동

Nuxt에서 `nuxt-link` 컴포넌트로 페이지를 이동하는 것처럼 Next에서도 자체적으로 제공하는 컴포넌트를 이용하여 페이지를 Navigate한다. `next/link` 패키지 내 export 된 모듈을 사용하면 된다.

```jsx
import Link from 'next/link'

export default function Post() {
  return (
    <main>
      <h1>Hello Post Index Page</h1>
      <h3>
        <Link href="/post/detail">
          <a>Detail Page</a>
        </Link>
      </h3>
    </main>
  )
}
```

`Link` 컴포넌트의 `href` 옵션은 필수이다.

### `head` 조작

경로별 컴포넌트 구성은 할 수 있게 되었으니, 이제 경로별 `head` 태그를 조작할 수 있는 방법을 사용한다.

```jsx
import Link from 'next/link'
import Head from 'next/head'

export default function Post() {
  return (
    <div className="container">
      <Head>
        <title>Post Detail Page~</title>
        <meta property="description" content="12345" />
      </Head>
      <main>
        <h1>Hello Post Index Page</h1>
        <h3>
          <Link href="/post/detail">
            <a>Detail Page</a>
          </Link>
        </h3>
      </main>
    </div>
  )
}
```

마찬가지로 Next에서 제공하는 `Head` 컴포넌트를 사용하여 구성한다. 다만 `Head` 컴포넌트를 삽입시키려면 head 부분과 바디에 보여지는 부분을 같이 작성해야 하기 때문에, 이 둘을 감싸는 `div` 태그가 필요하다. (컴포넌트에서 부모는 한 개만 존재해야 한다.) `div.container`는 사실 감싸기만 할 뿐 아무런 동작을 하지 않기 때문에 불필요해보인다.

```jsx
return (
  <>
    <Head>
      <title>Post Detail Page~</title>
      <meta property="description" content="12345" />
    </Head>
    <main>
      <h1>Hello Post Index Page</h1>
      <h3>
        <Link href="/post/detail">
          <a>Detail Page</a>
        </Link>
      </h3>
    </main>
  </>
)
```

`React.Fragment`로 감싼다.

## 다음으로 배워야 할 Next.js

- 정적 자산 처리
- CSS Preprocessor 사용 (스타일링)
- Vue에서 사용한 `<ClientOnly />` 사용할 수 있을까
- Static Site Generation만을 사용할 때 `gatsby`와 비교
- 배포 방법
- 서버 부하를 줄일 수 있는 렌더링 캐시 전략
- 기타 등
