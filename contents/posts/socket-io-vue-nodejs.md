---
title: Socket.io 5분만에 배우기
date: 2021-03-13 14:03:01
published: true
tags: ['vue', 'nodejs']
cover_image: /images/web-socket-thumbnail.jpg
description: HTML5 API 중 하나인 웹 소켓에 대해서 알아보고 웹 소켓을 좀 더 깔끔하게 사용할 수 있는 라이브러리인 Socket.io를 사용하는 방법을 정리하기
---

## 웹 소켓

웹 상에서 서버와 클라이언트가 서로 통신하기 위해서는 서로간의 통신 프로토콜을 정하고 그 통신 규약에 맞게 통신하여 정보를 주고 받는다. 많이 알고 있는 대표적인 프로토콜이 바로 **HTTP**다. 웹 소켓은 HTTP와 비슷한 통신 프로토콜 중 하나이다. HTTP는 서버에 요청을 하고, 응답을 받으면 커넥션을 바로 끊어버리지만, 웹 소켓은 그 커넥션을 유지할 수가 있다. 그렇기 때문에 서버와 클라이언트가 지속적으로 통신할 수 있는 환경을 만들 수 있으며 상대적으로 빠른 시간안에 응답을 받을 수 있다.

브라우저에서 웹 소켓 기능을 바로 사용할 수 있다. 브라우저에서 제공하는 API를 사용하면 말이다. 하지만 웹 소켓도 서버와 클라이언트가 통신하는 것이기 때문에 서버에서도 웹 소켓에 대한 내용이 구현되어 있어야 한다. 이 포스트에서는 앞단을 vue와 웹 소켓을 이용해서 구현하고, 뒷단을 node.js를 이용해 웹 소켓 기능을 구현한다.

node.js에서는 많은 웹 소켓 구현체가 있다. [socket.io](https://github.com/socketio/socket.io)와 [ws](https://github.com/websockets/ws)가 있다. ws는 기본에 충실한 느낌이고, socket.io는 기본도 기본이지만 뭔가 색다른 기능을 제공한다. 예를 들어 room이라는 기능을 이용해 여러 개의 채팅방을 만들 수 있고 소켓에 연결된 전체 클라이언트에게 broadcast를 보낼 수 있다거나, room 별로 broadcast를 보낼 수 있다. 이런 부분들을 좀 더 쉽고 직관적으로 제공하는 것이 특징이다.

먼저, 웹 소켓의 처음 시작 방식은, 기존에 HTTP를 이용해 통신하는 것과 다르지 않다. 웹 소켓은 HTTP와 HTTPS 두 개의 프로토콜과 잘 호환될 수 있도록 설계되었다. 따라서 서버에 요청시 헤더 몇 개를 추가하면 HTTP/HTTPS 프로토콜에서 웹 소켓 프로토콜로 변환된다.

```sh
Connection: upgrade
Upgrade: websocket
```

위 헤더를 같이 실어서 보내면 해당 프로토콜이 웹 소켓 프로토콜로 변환된다. (서버에서 지원 해야한다.)

## 설치

socket.io는 node.js 외 환경에서 돌아갈 수 있도록 여러 언어에서 구현된 구현체가 있다. 자바/C++/Swift/Python 등등 여러 언어에서 socket.io 구현체가 있다. 특별히 node.js일 필요는 없지만 여기서는 node.js를 사용한다.

### 서버

```sh
yarn add socket.io express
```

express와 socket.io를 설치한다.

```js
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

// express 초기화
const app = express()
// socket.io 지원을 위해 http 모듈에서 제공하는 메서드로 서버를 초기화한다.
const http = createServer(app)
// 웹 소켓 서버를 초기화한다. 두번째로 서버를 초기화할 때 여러 옵션을 줄 수 있다.
const io = new Server(http, {
  cors: {
    origin: ['http://localhost:8080']
  }
})

const messsags = []

// 앞단에서 요청이 오고 소켓이 생성되면 이벤트를 발생시킨다.
// 두번째 인자인 콜백함수에 생성된 소켓이 담겨져온다.
// 소켓에는 해당 소켓에 연결된 모든 클라이언트들에게 broadcast를 하거나,
// 이벤트를 발생 혹은 수신할 수 있는 메서드가 있다.
io.on('connection', socket => {
  socket.on('send', message => {
    messages.push(message)
    io.emit('messages', messages)
  })
})

// app.listen이 아닌 http.listen를 사용한다.
http.listen(8000, () => {
  console.log('started server')
})
```

서버는 위처럼 구성했다. socket.io 서버를 만들고, 해당 서버의 소켓이 생성되면 이벤트를 바인딩시킨다. `socket.on` 메서드를 사용하여 클라이언트로부터 이벤트를 수신할 수 있고, `socket.emit`을 통해 이벤트를 발생시킬 수 있다. 위 소켓 이벤트에서는 `send` 라는 이벤트를 클라이언트로 수신받아, 쌓인 메세지를 socket.io 서버 내부 모든 소켓에 뿌려준다.

### 클라이언트

브라우저에서 socket.io를 사용할 수 있도록 구현해놓은 라이브러리가 있다.

```sh
yarn add socket.io-client
```

사용법은 서버에서 사용하는 socket.io 서버와 비슷하다.

```vue
<template>
  <div>
    <textarea v-model="message" />
    <button style="display: block;" @click="sendMessage">전송</button>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client'

export default {
  data() {
    return {
      socket: null,
      message: '',
      receivedMessage: []
    }
  },
  async created() {
    // 소켓 서버와 연결한다.
    // 여기서 서버에서 지정해놓은 io.on('connection') 이벤트가 실행된다.
    // 그리고 생성된 소켓을 반환한다.
    this.socket = io('http://localhost:8000')

    this.socket.on('connect', () => {
      // 여기서 소켓이 생성되고 반환될 때에 코드를 적는다.
    })

    this.socket.on('messages', (messages) => {
      // 커스텀 이벤트
      this.receivedMessage = messages
    })
  },
  methods: {
    sendMessage() {
      // 소켓을 통해 서버로 메세지를 보낸다.
      this.socket.emit('send', this.message)
      this.message = ''
    }
  }
}
</script>
```

커스텀 이벤트는 socket.io에서 지정된 이벤트 이름 외에 아무거나 사용 가능하다. 이 경우 서버와 클라이언트 모두 동일한 이름의 이벤트를 핸들링 해야한다. 이벤트를 발생시킬 때 인자는 여러 개를 줄 수 있다. 발생시키는 쪽에서 연달아 인자를 지정하면 되고, 수신하는 쪽에서는 콜백 함수의 인자로 받으면된다.

```js
// 서버 혹은 클라이언트에게 여러 인자를 전달할 수 있다.
io.emit('hello', 1, 2, 3)
// 수신하는 쪽은 콜백 함수의 인자로서 받을 수 있다.
io.on('hello', (num1, num2, num3) => { ... })
```

## 채팅방

소켓 기능을 이용하면 채팅방을 구현할 수 있고, 흉내내는 정도면 난이도가 어렵지 않기 때문에 실 DB를 붙여서 사용하는 것이 아니라면 빠르게 만들어낼 수 있다.

```js
// 클로져를 이용해 채팅방의 메세지를 담아둘 수 있도록 한다.
// add 메서드를 통해 채팅방의 메세지를 추가하고 아이디를 식별하기 위해 소켓 id를 담는다.
function chats() {
  const q = []

  return {
    add(uid, message) {
      q.push({ uid, message })
    },
    getAllChat() {
      return q
    }
  }
}

const chatState = chats()

io.on('connection', socket => {
  socket.on('send', message => {
    chatState.add(socket.id, message)
    io.emit('messages', chatState.getAllChat())
  })
})
```

클로져로 간단한 데이터베이스를 흉내낸다. 배열로 해도 되지만 클로져로 작성하는 것이 깔끔해보여서 이 방법으로 했다. 클라이언트로부터 `send` 이벤트를 수신받으면 메세지를 담아놓고 모든 클라이언트에 모든 채팅 내역을 뿌린다.

```vue
// Socket.vue
<script>
export default {
  created() {
    // 일부만 작성
    this.socket.on('messages', messages => {
      this.receivedMessage = messages
    })
  }
}
</script>
```

앞단에서 `messages` 이벤트를 수신하면 제공된 채팅 내역을 컴포넌트의 데이터로 매핑시킨다. 데이터를 이용해 템플릿을 구성하여 채팅 내역을 보여주면 아주 간단한 채팅방이 완성되었다. 추가적으로 채팅 내역을 저장할 때에 시간을 저장하거나 데이터베이스에서 유저에 대한 값을 같이 저장한다면 좀 더 구체화 된 채팅방이 될 것이다.
