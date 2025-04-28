---
title: GraphQL 서버 환경설정
date: 2020-02-14
published: true
tags: ['graphql', 'nodejs']
cover_image: /images/graphql-yoga-cover.png
description: GraphQL은 쿼리 언어이다. 서버와 클라이언트 중간에 위치해서 클라이언트는 서버로부터 정말 필요한 데이터만 받을 수 있게 하고, 서버는 클라이언트가 필요로 하는 데이터만 내보낸다. (Over-Fetching 극복) 또한 기존의 REST로 구성 된 서버에서 여러 개의 데이터를 내보낼 때에는 클라이언트에서 서버로 여러번 요청하여 데이터를 받아낼 수 있겠지만은 GraphQL은 한 개의 쿼리로 여러 개의 데이터를 내가 갖고 싶은 데이터만을 서버에 요청할 수 있다.
---

## GraphQL-Yoga

GraphQl-Yoga는 GraphQL 기반의 서버를 만들기 쉽게 제작 된 프로젝트다. 최종적으로 Express를 사용하는 서버를 만들어주며 타입스크립트를 지원한다.

이 프로젝트는 아래의 다양한 GraphQL 기반 프로젝트들과 함께 지원된다.

- Express / Apollo-Server
- GraphQL-subscriptions / GraphQL-transport-ws
- GraphQL / GraphQL-tools
- GraphQL-playground

## GraphQL-Yoga Install

GraphQL-Yoga를 사용하기 위해서 다음 명령어로 GraphQL을 설치한다.

```sh
yarn add graphql-yoga
```

import, async/await 등등 최신 ES6 문법을 사용하기 위해 바벨을 설치해준다.

```sh
yarn add -D @babel/core @babel/preset-env @babel/node nodemon
```

babel 7 버전부터 babel-cli, babel-preset-env 이런 패키지들이 다른 패키지들과 겹치는 문제가 발생하면서 모두 네이밍 패키지 안에 들어갔다.

## Babel Setting

위에서 `@babel/node`를 설치했기 때문에 `babel-node index.js` 이런 명령어가 가능하다. 물론 전역적으로 깔지 않았기 때문에 `npx babel-node index.js` 혹은 `yarn babel-node index.js` 이런식으로 해야 명령어가 돌아간다.

아래 명령어로 초기 폴더 구조를 잡자.

```sh
touch .babelrc index.js

mkdir graphql && cd graphql
touch schema.graphql resolvers.js

cd ..
mkdir db && cd db
touch users.js
```

위의 명령어를 입력했으면 아래와 같은 폴더 구조가 갖춰진다.

```sh
├── db
│   └── users.js
├── graphql
│   ├── resolvers.js
│   └── schema.graphql
├── index.js
├── package.json
└── yarn.lock
```

`.babelrc` 파일을 다음과 같이 설정해준다. (최신 자바스크립트 문법을 프로젝트 내에서 사용하기 위해서)

```json
{
  "presets": ["@babel/preset-env"]
}
```

## index.js 파일 설정 & nodemon 스크립트 만들기

**index.js**를 열어 아래와 같이 수정한다.

```javascript
import { GraphQLServer } from 'graphql-yoga'
import resolvers from './graphql/resolvers'

const server = new GraphQLServer({
  typeDefs: './graphql/schema.graphql',
  resolvers
})

server.start(() => console.log('server start'))
```

스크립트를 하나 만들어서 nodemon과 연결시킨다.

```json
{
  "scripts": {
    "dev": "nodemon index.js --exec babel-node"
  }
}
```

nodemon은 파일 수정을 감지해서 entry 파일을 자동으로 시작해준다. --exec 옵션을 주면 해당 명령어로 nodemon을 실행시킬 수 있다. 나는 ES6+ 문법을 사용하기 때문에 babel-node 명령어로 nodemon을 실행시켜준다. 위와 같이 입력하고 `yarn dev`를 입력하면 오류가 뜬다. GraphQL 스키마 정의를 아직 하지않았다.

## GraphQL Schema 정의하기

아래와 같이 예시로 스키마를 하나 만들자.

```graphql
# schema.graphql

type User {
  id: Int!
  name: String!
  age: Int!
}
type Query {
  user(id: Int!): User!
  users: [User]!
}
```

`User` 타입은 각각 `id`, `name`, `age`를 갖고 모두 필수요소라고 정의해줬다. (타입 뒤에 느낌표가 붙으면 필수 요소)

`user` 쿼리를 받으면 타입이 `Int`형인 `id`를 받아 타입이 `User`인 객체를 내보낸다. `users` 쿼리를 받으면 매개변수와 상관없이 배열로 된 User 타입 객체를 내보낸다.

매우 직관적이고 쉬운 GraphQL의 스키마 정의 특징이다. 다음은 쿼리를 `resolve` 하는 함수들을 만든다.

## Resolver 함수 만들기

```javascript
// db/users.js

let users = [
  {
    id: 1,
    name: 'n2ptune',
    age: 24
  },
  {
    id: 2,
    name: 'Apdula',
    age: 55
  }
]

export const getUser = id => users.filter(user => user.id === id)[0]

export const getUsers = () => users
```

기본적으로 `users`라는 배열이 있고 배열 안엔 앞서 정의한 `User` 타입과 같은 속성을 가지는 객체가 여러개 있다. `getUser` 메서드는 `user(id: Int!)` 쿼리를 해결하기 위한 함수고, 그 뒤에 함수는 `users` 쿼리를 해결하기 위한 함수이다. 두 함수를 내보내준다.

```javascript
// graphql/resolvers.js

import { getUser, getUsers } from '../db/users'

export default {
  Query: {
    user: (_, { id }) => getUser(id),
    users: getUsers
  }
}
```

앞에서 정의해서 내보냈던 함수 2개를 가져온다. 하나의 객체를 내보낸다. 이 객체는 `Query` 속성을 가지고 그 속성 안에는 2개의 함수가 있다. 스키마 파일에서 정의한 쿼리의 이름과 일치해야 한다. 쿼리 속성 안의 모든 함수들은 `f: (root, args, context, info)` 꼴을 가진다. args에 쿼리에 요청한 매개변수가 담긴다.

이제 서버를 실행해본다.

```sh
yarn dev
```

`http://localhost:4000/`으로 접속한다. (기본이 4000임)

![graphql-playground](/images/graphql-playground.png)

짜잔 이 모든게 GraphQL-Yoga가 해주는 기능이다. GraphQL-Yoga의 자세한 스펙과 설명은 [여기](https://github.com/prisma-labs/graphql-yoga)를 참고하면 된다.
