---
description: 데이터베이스의 데이터들을 객체로 매핑해주는 ORM을 이해하고 자바스크립트에서 ORM을 위한 라이브러리를 이용해서 실제 데이터베이스에 접속해서 간단한 서버를 만들어 보기
cover_image:
tags: ['nodejs', 'javascript']
published: true
date: 2020-04-15
title: Nodejs(Express)와 Sequelize를 같이 사용하기
---

## ORM

ORM이란, **Object Relational Mapping**이라는 말의 줄임말로 간단하게 데이터베이스의 데이터들을 프로그래밍 언어에서 사용할 수 있는 객체로 연결해주는 도구다.

모든 프로그래밍 언어에서 ORM 시스템을 구축하기 위한 라이브러리들이 많으며 여기서는 자바스크립트(Nodejs)의 Sequelize라는 라이브러리를 이용해서 ORM에 대해 알아본다.

[ORM에 대한 정리와 장단점에 대한 설명 참고](https://gmlwjd9405.github.io/2019/02/01/orm.html)

## 라이브러리 설치

이 라이브러리는 Nodejs에서 ORM을 구축하도록 도와주는 라이브러리다. 예제로는 MySQL을 사용하지만 다른 DBMS와의 연결도 가능하다. 먼저 시퀄라이즈 라이브러리와 MySQL 라이브러리를 설치한다.

```bash
yarn add express sequelize mysql2
yarn global add sequelize-cli
```

Express는 꼭 필요한 것은 아니지만 예제를 작성하고 데이터베이스의 내용을 JSON으로 응답하기 위한 것이 목적이니 깔아주도록 한다.

sequelize-cli는 시퀄라이즈의 많은 기능들을 CLI에서 이용할 수 있도록 만든 모듈이다. 전역으로 설치해서 터미널에서 사용할 수 있게 한다.

## Sequelize & Express 초기 설정

위와 같이 라이브러리들을 설치하고 난 후 프로젝트 루트에 `app.js` 파일을 작성한다.

```js
const app = require('express')()

app.get('/', function (req, res) {
  res.send('Hello Express')
})

app.listen(3000, () => console.log('!'))
```

간단하게 Express가 설치가 되었는지 확인하고 서버를 하나 만들고 연다. 그 다음 유저의 리스트를 JSON으로 응답하기 위한 라우트 `/user`와 유저의 아이디를 이용해서 유저의 정보를 내보낼 수 있는 라우트 `/user/:id`를 하나 만든다.

```bash
.
├── app.js
├── package.json
├── routes
│   └── user.js
└── yarn.lock
```

위와 같은 폴더 구조로 만든다. 그리고 프로젝트 루트에 `database` 폴더를 하나 만들고 그 안에서 `sequelize init`를 입력하고 시퀄라이즈를 쓸 수 있게 만든다.

```bash
mkdir database
cd database
sequelize init
```

총 4개의 폴더가 생성되며 각각 `config`, `migrations`, `models`, `seeders`가 있다. `config` 폴더에 `config.json` 파일을 열어 사용할 데이터베이스의 정보와 맞춘다. 이 파일이 시퀄라이즈가 데이터베이스와 연결할 때 필요한 가장 중요한 설정 파일이다.

## Sequelize와 Express 연결

다시 `app.js`로 돌아와 시퀄라이즈와 연결해준다.

```js
const express = require('express')
const { sequelize } = require('./database/models/index')
const userRoutes = require('./routes/user')

const app = express()

sequelize
  .sync()
  .then(() => console.log('connected database'))
  .catch(err => console.error('occurred error in database connecting', err))

app.use('/user', userRoutes)

app.listen(3000, () => console.log(`started server`))
```

`/database/models/index.js` 파일에는 시퀄라이즈가 설정 파일을 읽어들여 데이터베이스와 연결하고 모델 폴더에 들어가있는 모델들을 읽는다. 시퀄라이즈를 동작하기 위해 `sequelize` 프로퍼티를 가져와 `sync` 메소드를 실행시킨다.

이 메소드를 실행하면 시퀄라이즈가 데이터베이스와 연결한다. 반환 객체가 `Promise`이기 때문에 비동기 작업에 대한 처리를 해줘야 한다.

## 모델 작성

모델은 `/models/xxxx.js`로 작성하면 되며 작성하면 알아서 읽어들인다. `/models/user.js`로 작성한다.

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'User',
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '사용자 ID'
      },
      name: {
        type: DataTypes.STRING,
        comment: '사용자 이름'
      },
      email: {
        type: DataTypes.STRING,
        comment: '사용자 이메일'
      }
    },
    {
      timestamps: false
    }
  )
}
```

2개의 인자를 받는 함수로 내보낸다. `define` 메소드를 이용해서 모델을 정의한다. 위와 같이 'User'로 모델을 정의하면 데이터베이스 테이블에 'Users'라는 테이블이 만들어진다. 그리고 그 테이블의 컬럼들은 2번째 인자로 준 객체의 속성들로 구성된다.

속성들은 또 다른 속성들을 가질 수 있으며 대표적으로 `type`, `comment` 등이 있다. MySQL에서 컬럼을 구성하기 위해 사용하는 것과 많이 비슷하다. 타입을 지정하기 위해서는 인자로 받는 `DataTypes`를 사용하면 된다.

그리고 3번째 인자로 옵션을 줄 수 있는데, `timestamps` 속성은 기본값이 `true`고, `true`로 설정되면 기본적으로 지정한 컬럼 이외에 `updatedAt`과 `createdAt` 속성이 추가로 붙는다. 여기선 필요없기 때문에 속성을 `false`로 한다.

이렇게 하고 `node app.js` 명령어로 서버를 껏다 킨다. 이미 'Users'라는 테이블이 있으면 만들지 않고 없으면 테이블을 만든다.

## 라우트에서 모델 데이터 가져오기

`/user` 라우트에서는 모든 유저의 데이터들을 가져온다. 시퀄라이즈는 각 모델에 유용한 메소드들을 제공한다. 대표적으로 모델의 모든 값을 가져오기 위한 메소드 `findAll` 혹은 하나만 가져올 수 있는 메소드 `findOne`가 있다. 두 개를 이용해서 유저 리스트와 유저 정보를 가져온다.

```js
// /routes/user.js

const { Router } = require('express')
const router = Router()
const { User } = require('../database/models/index')

// user
router.get('/', async (req, res) => {
  const users = await User.findAll()
  const result = []

  for (const user of users) {
    result.push({
      id: user._id,
      name: user.name,
      email: user.email
    })
  }

  res.send(result)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ where: { _id: id } })

  if (user) {
    res.send({ id: user._id, name: user.name, email: user.email })
  } else {
    res.status(500).send('해당 유저를 찾을 수 없음')
  }
})

module.exports = router
```

모델로 지정한 객체 'User'는 `/models/index` 파일에서 가져올 수 있다. 그리고 `findAll`을 사용해 모든 User 모델을 가져오고 배열에 담은 후에 응답한다. 이 때 반환되는 객체가 `Promise`이므로 적절한 처리가 필요하다.

`findOne` 메소드는 `findAll`과 사용법이 비슷하나 `LIMIT 1` 쿼리가 뒤에 붙어 데이터들 중 하나만 가져온다. 인자로 옵션을 주게 되면 다양한 쿼리를 보낼 수 있다. `/user/:id` 부분에서는 \_id가 요청 파라미터로 들어온 id값과 일치한 유저를 모델 데이터에서 찾아서 내보낸다.

![sequelize-example](/images/sequelize-example.png)

크롬 확장 프로그램을 사용해서 JSON이 이쁘게 보인다. 결과는 이런식이다.

## 마이그레이션과 시드

만약 실제 데이터베이스 테이블에서 데이터들을 넣고 삭제하고 하는 작업이 부담되고 불안하다면 마이그레이션과 시드라는 기능을 이용하면 안정적이고 쉽게 테스트해볼 수 있다. 여기서는 **시드**만 사용해본다.

```bash
sequelize seed:generate --name user

Sequelize CLI [Node: 12.16.2, CLI: 5.5.1, ORM: 5.21.6]

seeders folder at "/mnt/d/examples/sequelize-test/database/seeders" already exists.
New seed was created at /mnt/d/examples/sequelize-test/database/seeders/20200415103847-user.js .
```

`seed:generate --name user` 옵션으로 시드를 생성한다. 그러면 `/seeders` 폴더에 자바스크립트 파일이 하나 생성된다.

```js
// 20200415103847-user.js

'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
}
```

`up` 메소드와 `down` 메소드가 있는데, 시드가 실행되면 `up` 메소드 부분이 실행되고 시드가 취소되면 `down` 메소드가 실행된다. `queryInterface`의 `bulkInsert` 라는 메소드를 이용해서 테이블을 만들고 데이터를 넣어본다.

```js
'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: '12345',
        email: '12345@example.com'
      },
      {
        name: '3456',
        email: '3456@example.com'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
```

`bulkInsert`와 `bulkDelete` 메소드 모두 `Promise` 객체를 반환한다. 그리고 이제 CLI를 통해 시드를 실행시킨다.

```bash
sequelize db:seed:all
```

![sequelize-example2](/images/sequelize-example2.png)

이제 시드를 취소시켜 없애보자.

```bash
sequelize db:seed:undo:all
```

모든 시드가 취소된다. `down` 메소드에 테이블 이름을 `Users`로 지정하고 조건 옵션을 주지 않았기 때문에 그냥 모든 행이 지워졌다. 그래서 기존 데이터까지 같이 지워졌다. 실제로 사용할 때는 이런 짓은 하면 안된다.

## 참고

- [https://www.hanumoka.net/2018/11/23/node-20181123-express-setting-sequelize/](https://www.hanumoka.net/2018/11/23/node-20181123-express-setting-sequelize/)
- [https://sequelize.org/v5/manual/migrations.html](https://sequelize.org/v5/manual/migrations.html)
- [https://jetalog.net/83](https://jetalog.net/83)
