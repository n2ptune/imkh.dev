---
title: Nuxt에서 Gridsome으로 블로그 전환한 이유
date: 2020-02-28
published: true
tags: ['vue']
cover_image: /images/gridsome-thumbnail.png
description: Nuxt에서 Gridsome으로 블로그를 전환한 이유, 그리고 "블로그"라는 목적을 가지고 개발할 때, Nuxt보다 Gridsome이 더 쉬운 이유
---

## Gridsome

**React**진영의 **Gatsby**를 생각하면 **Gridsome**이 뭔지 이해하기 쉽다. **Gridsome** 공식 홈페이지에도 나온 것처럼 **Gridsome**은 **Gatsby**에 영감을 받아 **React**진영에서 만이 아니라 **Vue**에서도 **Gatsby**처럼 동작하는 기능이 필요했던 것이다.

기본적으로 두 개가 하는 일이 비슷하다. 물론 두개가 완벽히 똑같진 않지만 다음과 같은 단계를 가지는 것 같다.

1. 서버나 외부 컨텐츠 관리 시스템에서 제공하는 API 혹은 로컬 파일에서 데이터를 가져온다. (대부분 CMS에서 컨텐츠를 외부로 내보내는 API가 구현되어 있다.)

2. **Gridsome**가 이 데이터들을 **GraphQL Schema**로 만든다.

3. 사용자가 템플릿에서 가져올 컨텐츠를 분류하고 **GraphQL 쿼리**를 템플릿 페이지 컴포넌트에서 사용해서 템플릿을 구성한다.

4. 각종 플러그인(source-filesystem, 기타 등)이 동작한다. 여기서 마크다운을 **HTML**문법으로 변환하거나 마크다운 요소에 **HTML**속성을 집어넣거나 할 수 있다.

5. 이미지가 처리된다. 이 점은 매우 신기하다. 페이지나 템플릿에서 사용한 모든 이미지를 내부 로직으로 처리한다. 여기서는 **이미지 압축**, **이미지 크기조정**, **해시 붙이기** 정도를 하는 것 같다. 이 부분에서는 아래에 더 자세하게 알아보자.

6. 페이지 혹은 템플릿에서 작성했던 GraphQL 쿼리문을 실행한다. 여기서는 사이트의 메타 정보나 블로그 포스트 구성에 필요한 여러 데이터를 불러와서 페이지, 템플릿을 구성한다.

7. **HTML**을 렌더링한다. (서버사이드 렌더링, **vue-meta**를 이용해 작성한 메타태그들은 모두 head태그 안에 담기게 된다.)

8. 최종적으로 렌더링 된 **HTML**파일, 이미지 파일, JS(+CSS)파일, 404파일, 사이트 맵(플러그인 사용시) 등이 빌드된 결과물로 나오게 된다. 이 파일들을 정적 호스팅 서비스(Netlify, Firebase Hosting, AWS S3 등)에 배포하기만 하면 개인 블로그 하나가 완성되는 것이다.

## 기존의 Nuxt에서 사용한 방법

**Nuxt**도 **Gridsome**처럼 정적 파일로 빌드하는 기능이 있다. (nuxt generate)

하지만 여러 라우트를 만들기 위해서 약간은 복잡한 로직을 짜야하는 경우도 있다. (외부 API에서 불러오는 경우 등)

당연히 블로그나 기술 문서를 목적으로 만들어진 프로젝트가 아니기 때문에 이런 목적으로 사용하려면 마크다운을 HTML로 변환한다든지 서버사이드 렌더링을 지원하지 않는 모듈은 SPA처럼 작동한다는 점이나 불편한게 조금 있었다.

Netlify CMS에서 포스트를 작성하면 그 마크다운 파일 혹은 이미지들을 원격 저장소에 자동으로 푸쉬해준다. Netlify에서는 해당 브랜치의 커밋을 감지해서 푸쉬한 커밋이 있다면 다시 페이지를 빌드한다. 빌드 후에 정해진 폴더의 파일들이 자동으로 배포된다.

이 점들도 매우 매력적으로 느껴졌지만 Netlify CMS에서는 마크다운으로 작성된 파일의 스타일을 미리볼 수 없기 때문에 조금 불편하다. 그리고 무엇보다 개발용 서버를 여는데 시간이 비교적 많이 걸린다.

## Gridsome으로 데이터 불러오기

**Gridsome** 전용 플러그인에 CMS에서 데이터를 가져오는 플러그인들이 많다. 그 중 대표적인게 Contentful 플러그인이다.

```js
module.exports = {
  siteName: 'My Gridsome Website',
  siteDescription: '...is faster than yours',
  plugins: [
    {
      use: '@gridsome/source-contentful',
      options: {
        host: 'cdn.contentful.com',
        typeName: 'Contentful'
      }
    }
  ],
  // Setup templates for data collections.
  // This will automatically look for and use
  // a src/templates/{Collection}.vue file.
  templates: {
    ContentfulTeam: '/team/:slug',
    ContentfulEvent: '/event/:slug'
  }
}
```

위 코드는 **Gridsome** 공식 홈페이지에 있는 Contentful API를 이용해서 데이터를 가져오는 방법을 소개하는 코드이다. 단 몇줄만으로 여러 개의 페이지를 구성할 수도 있고 플러그인 사용방법이 매우 쉽다. 옵션을 통해 다양한 기능을 커스터마이징 할 수 있다.

혹은 다른 API에서 데이터를 가져오는 것도 아래와 같이 가능하다.

```js
const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Fetch data from APIs
    const { data } = await axios.get('https://any.api.com')

    // Create a new GraphQL Collection
    const posts = addCollection('Post')

    // Add data to the new collection
    for (const item of data) {
      posts.addNode({
        id: item.id,
        title: item.title,
        date: item.date,
        content: item.content
      })
    }
  })
}
```

이렇게 외부 API를 통해서 데이터를 만들어놓으면 똑똑한 **Gridsome**이 **GraphQL Schema**로 만들어준다. 모든 블로그 포스트를 가져온다거나, 필터링해서 가져온다거나 어떤 특정한 요소만 가져오고 싶다거나 이 모든 것들이 **GraphQL**을 좀만 알면 **Gridsome**에서는 쉽게 가능하다.

## Gridsome 데이터 사용하기

```markdown
<template>
  <Layout>
    <h1>My blog</h1>
    <div v-for="{ node } in $page.allPost.edges" :key="node.id">
      <h3>{{ node.title }}</h3>
      <g-link :to="node.path">Read more</g-link>
    </div>
  </Layout>
</template>

<!-- Query from local GraphQL data layer. -->
<page-query>
  query {
    allPost {
      edges {
        node {
          id
          title
          path
          }
        }
      }
    }
</page-query>
```

위와 같이 쿼리를 날리고 쿼리를 날려서 받은 데이터로 템플릿을 구성하면 된다.

```md
<template>
  <Layout>
    <ul>
      <li v-for="{ node } in $page.allPost.edges" :key="node.id">
        {{ node.title }}
      </li>
    </ul>
    <!-- Add the pagination component -->
    <Pager :info="$page.allPost.pageInfo"/>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  allPost (perPage: 10, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
      }
    }
  }
}
</page-query>

<script>
// Import pagination component
import { Pager } from 'gridsome'

export default {
  components: {
    Pager
  }
}
</script>
```

페이지 단위로 쿼리를 날릴 수도 있고, 몇 개의 포스트만 가져온다든지가 가능하다. 이로 인해 적어도 몇 개의 포스트만 먼저 빠르게 보여주고, 그 나머지의 포스트들은 지연 로딩을 이용한다든지 페이지네이션을 이용한다든지 구성 방법을 여러개 생각할 수가 있다.

## Gridsome 이미지 처리

```vue
<template>
  <Layout>
    <!-- Use the built-in Image component
    for progressive images -->

    <g-image src="~/assets/images.jpg" width="500" />

    <!-- This will render a small
    ultra-compressed, blurred inline base64 image
    before it's lazy loaded into view with
    Intersection Observer -->
  </Layout>
</template>
```

`g-image` 태그는 **Gridsome**이 이미지 처리를 하기위해 필요한 컴포넌트이다. 이 컴포넌트를 이용해서 연결시킨 이미지는 모두 **Gridsome** 내부 로직에 의해 처리된다. 압축되고, 크기가 조정되는 등 다양한 처리가 이루어진다.

그리고 이후 빌드되면, 이 이미지는 **Intersection Observer**를 이용해서 실제로 이 컨텐츠가 보여지지 않고 있다면 빌드할 때 만들어둔 적은 용량의 이미지를 먼저 미리보기 형식으로 보여줬다가, 이 이미지가 가시성이 확보된다면 그 때 본래의 이미지를 보여준다. 이 모든 로직이 **Gridsome**에 의해 자동으로 처리된다.

## SEO

```vue
<template>
  <Layout>
    <!-- Any .vue file in /src/pages will be a route. -->
    <!-- This page will be 'mysite.com/hello-world' -->
    <h1>Hello World!</h1>
  </Layout>
</template>

<script>
export default {
  // Use vue-meta to add & customize meta tags
  metaInfo: {
    title: 'Hello World'
  }
}
</script>
```

**vue-meta**를 사용하는 것처럼 `metaInfo` 객체에 기존 head 태그에 들어갈 수 있는 모든 내용을 내보내면 된다. (meta 태그 같은 경우에는 배열로)

## 참고

- [Gridsome 공식 홈페이지](https://gridsome.org/)
