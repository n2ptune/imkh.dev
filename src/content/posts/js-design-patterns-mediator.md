---
title: 자바스크립트 디자인 패턴 (중재자 패턴, js-mediator-pattern)
date: 2020-10-11 02:43:33
published: true
tags: ['javascript']
cover_image: /images/mediator-pattern-thumbnail.jpg
description: 자바스크립트 디자인 패턴 중 하나인 중재자 패턴에 대해서 알아보고 예시를 작성하여 정리하기
---

## 디자인 패턴

[앞서 살펴본 모듈 패턴과 옵저버 패턴](https://imkh.dev/js-design-patterns/)과 같이 디자인 패턴은 자바스크립트로 코드를 작성할 때 어떤 디자인에 맞춰 코드를 작성하는지에 대한 개념을 제시한다. 이번엔 중재자(Mediator) 디자인 패턴의 개념을 알아보고 예시로 작성한다.

### Mediator 패턴의 개념

예를 들어 설명하자면 채팅방이 아주 좋은 예시이다. 채팅방에 참여하는 모든 인원은 중재자로부터 메세지를 전달받고 화면에 표시한다. 역으로 메세지를 보낼 때에는 참여자 1에서 참여자 2로 다이렉트로 메세지를 전송하는게 아니라 중재자를 거쳐 참여자 1에서 중재자, 그리고 중재자에서 참여자 2로 메세지가 전달된다.

![Mediator Pattern Diagram](/images/mediator-pattern-diagram.png)

간단한 다이어그램 예시로 보면 위의 사진과 같은 형태로 구현된다.

### Mediator 패턴을 적용시킨 간단한 예시

```js
class Participant {
  constructor(name) {
    this.name = name
    this.chatRoom = null
    this.messages = []
  }

  send(message, to) {
    this.chatRoom.send(message, this, to)
  }

  receive(message, from) {
    this.messages.push({ message, from })
  }

  showMessages() {
    console.log(this.messages)
  }
}

class ChatRoom {
  constructor() {
    this.participants = {}
  }

  enter(participant) {
    this.participants[participant.name] = participant
    participant.chatRoom = this
  }

  send(message, participant, to) {
    this.participants[to.name].receive(message, participant)
  }
}

const chatRoom = new ChatRoom()

const user1 = new Participant('user1')
const user2 = new Participant('user2')
const user3 = new Participant('user3')

chatRoom.enter(user1)
chatRoom.enter(user2)
chatRoom.enter(user3)

user1.send('Hello', user2)
user2.send('Nice meet to you', user1)
user3.send('Boring....', user1)

user1.showMessages()
user2.showMessages()
user3.showMessages()

/* Result
[
  {
    message: 'Nice meet to you',
    from: Participant {
      name: 'user2',
      chatRoom: [ChatRoom],
      messages: [Array]
    }
  },
  {
    message: 'Boring....',
    from: Participant { name: 'user3', chatRoom: [ChatRoom], messages: [] }
  }
]
[
  {
    message: 'Hello',
    from: Participant {
      name: 'user1',
      chatRoom: [ChatRoom],
      messages: [Array]
    }
  }
]
[]
*/
```

참여자 클래스와 `ChatRoom` 클래스를 만들어 참여자가 채팅방에 참여하는 형식의 코드를 만든다. 채팅방에 참여자가 입장(`enter`)하고 참여자끼리 대화를 하면 대화가 `message` 배열에 쌓인다. 이 때, 참여자끼리 주고 받는 메세지는 `Mediator`인 `ChatRoom` 클래스에 의해 전달된다.

중재자는 모든 참여자로부터 메세지를 전달받고 올바른 대상에게 전달해야 하는 의무를 가진다. 또한 그 권한을 가진다. 이렇게 되면 참여자끼리 서로 상호작용하는 방식을 캡슐화 할 수 있다. 이 중재자 패턴은 간단하고 단순한 어플리케이션을 제작할 때에는 그다지 효용성을 가지지 못하는 반면 복잡한 어플리케이션, 개체와 개체끼리 서로 상호작용 하는 상황에서 개체의 상태가 복잡하게 변할 수 있다면 이 중재자 패턴이 유용하게 쓰일 수 있다고 한다.
