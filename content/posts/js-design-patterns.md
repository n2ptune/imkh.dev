---
title: 자바스크립트 디자인 패턴, 모듈 패턴과 옵저버 패턴 (js design patterns)
date: 2020-10-04 02:41:58
published: true
tags: ['javascript']
cover_image: /images/js-design-pattern.jpg
description: 디자인 패턴 중 2가지, 모듈 패턴과 옵저버 패턴에 대해서 정리하고 자바스크립트로 구현해서 각각의 특징을 알아본다.
---

## 디자인 패턴

흔히 알고있는 디자인 패턴이란 의류 모양의 패턴을 지칭하는 말이기도 하다. 웹 개발에 있어서 디자인 패턴이란 개발 방법론에 대해서 이야기한다. 예를 들어 우리가 코드를 작성할 때, 몇 가지 규칙을 정해놓고 그 규칙의 범주를 벗어나지 않고 코드를 작성해가고 있다면 그것도 그것 나름대로 디자인 패턴이라고 할 수 있다. 대표적인 디자인 패턴으로는 **싱글톤**, **옵저버**, **프록시** 등이 있다.

여기서는 대표적인 것 몇 가지만을 정리하고 알아본다.

## 모듈 디자인 패턴

객체 지향 언어에서는 모듈은 클래스와 똑같다. 클래스는 클래스를 캡슐화하기 좋고, 코드의 재사용성을 높여준다. (잘 설계하면)

### IIFE

대개 모듈 디자인 패턴을 사용하려고 하면 클로져를 사용하여 외부에서 모듈의 멤버 변수, 함수 등에 접근할 수 없게 한다. 아래는 즉시 실행 함수 IIFE (Immediately-Invoked-Function-Expressions)를 사용해서 모듈 디자인 패턴로 구현하는 간단한 예제다.

```js
let ModuleDesign = (function () {
  let grade = 'A'
  let score = 96

  const getGrade = function () {
    return grade
  }
  const getScore = function () {
    return score
  }

  return {
    getMyGrade: getGrade,
    getMyScore: getScore
  }
})()

console.log(ModuleDesign.getMyScore())

// 96
```

이 모듈은 내부적으로 두 가지 변수를 가지고 있다. `grade`와 `score` 변수는 외부에서 참조하지 못한다. `getGrade`와 `getScore`는 각각의 변수를 반환해주는 함수이다. 그리고 마지막으로 함수를 참조할 수 있는 객체를 반환했다. 반환한 객체를 이용해서 모듈 외부에서 모듈이 내보낸 함수를 사용할 수 있다.

이렇게 설계할 경우 모듈을 외부로부터 보호된 환경에서 작성할 수 있어 좀 더 안전하게(외부와 결합도를 낮춘 상태에서) 모듈을 만들 수 있다. 클래스의 개념에서 이 모듈을 바라봤을 때, `getGrade`와 `getScore`는 외부로 내보낸 함수이기 때문에 **public**이라고 볼 수 있다. 그 외 내보내지 않은 변수는 **private** 멤버라고 볼 수 있다.

### ES6 이후 디자인 패턴 구현 방법

ES6 이후에는 많은 문법이 추가되어 모듈 디자인 패턴을 구현하기 좋게 바뀌었다. `export` 키워드를 사용해 모듈을 간단하게 내보낼 수 있게 바뀌어 파일 단위로 모듈을 관리하는 방식으로 많이 구현되었다.

```js
const fetchUser = async id => {
  try {
    return await fetch(process.env.SERVER_URL, { id })
  } catch (error) {
    throw new Error(error)
  }
}

export default fetchUser
```

한 파일에서 이러한 모듈이 있다고 가정하면 `export` 키워드를 이용해 이 모듈을 외부로 내보낸다. `export`에 대해서는 [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export)에 아주 자세하게 설명되어 있다.

```js
import fetchUser './fetch'

const user = fetchUser(id)
```

`export`로 내보낸 모듈은 `import` 키워드로 모듈을 불러와서 모듈이 내보낸 객체, 함수, 변수 등 모든 것을 사용할 수 있다.

### 클래스

ES6 이후엔 클래스 문법을 사용할 수 있기 때문에(정확히는 타 언어에서 사용하는 클래스처럼 만들 수 있는 설탕 문법) 클래스에서 제공하는 기능을 이용하면 외부에서 접근하지 못하는 private 변수를 만들 수 있다.

```js
class Student {
  #grade = 'A'
  #score = 96

  get grade() {
    return this.#grade
  }
  get score() {
    return this.#score
  }
}

const student = new Student()

student.grade // 'A'
student.score // 96
student.#grade // SyntaxError: Private field '#grade' must be declared in an enclosing class
```

클래스에서 변수 앞에 '#'을 붙여넣으면 해당 변수는 private한 변수로 지정된다. 그러므로 외부에서 이 변수에 접근할 수 없다. 대신 getter를 두어 외부에서 접근하게 만든다. 그리고 이전에 나왔던 `export` 키워드를 사용하여 클래스를 내보내면 ES6 이전에 모듈 디자인 패턴을 구현했던 것과는 달리 아주 깔끔하게 코드를 작성할 수 있다.

## 옵저버 디자인 패턴

Vue나 React, Angular에서는 상태 값이 변경될 때마다 컴포넌트를 재렌더링하거나 그 상태 값에 의존하는 모든 값들이 다시 재계산된다. 객체의 변경점을 관찰하고 특정 기능을 할 수 있도록 구현된 것이다. 내부 구현은 어떻게 되어있는지는 모르겠지만, 옵저버 디자인 패턴을 따라 구현하게 되면 쉽게 구현할 수 있다.

```js
function Observer() {
  this.list = []
}

Observer.prototype.registerObserver = function (target) {
  this.list.push(target)
}

Observer.prototype.unregisterObserver = function (targetObserver) {
  this.list = this.list.filter(
    existObserver => existObserver !== targetObserver
  )
}

Observer.prototype.notifyObservers = function (content) {
  this.list.forEach(observer => observer.notify(content))
}

const observer = new Observer()

const target1 = { notify: content => console.log('target1 : ' + content) }
const target2 = { notify: content => console.log('target2 : ' + content) }
const target3 = { notify: content => console.log('target3 : ' + content) }

observer.registerObserver(target1)
observer.registerObserver(target2)
observer.registerObserver(target3)

observer.notifyObservers('hello Observers')
// target1 : hello Observers
// target2 : hello Observers
// target3 : hello Observers

observer.unregisterObserver(target2)

observer.notifyObservers('except target2 in Observers')
// target1 : except target2 in Observers
// target3 : except target2 in Observers
```

배열을 가지는 옵저버 한 개를 두고 이 옵저버가 감시할 대상을 `registerObserver` 메서드를 통해 추가한다. 반대로 감시 대상에서 제외시킬 경우 `unregisterObserver`를 이용해서 배열에서 제외시킨다. 그리고 옵저버에 감시당할 타겟 객체 3개를 만들고 `notify` 메소드를 구현한다. `content`를 인자로 받아 자신의 이름과 인자를 출력하는 간단한 메소드이다.

`registerObserver`로 타겟 객체 3개를 감시 대상에 추가하고, `notifyObservers` 메서드로 감시 대상들의 `notify` 메서드를 호출한다. 감시 대상들의 `notify`가 정상적으로 호출되고 한 개의 감시 대상을 제외시킨다. 그리고 다시 호출하면 제외된 감시 대상 외 모든 감시 대상의 `notify` 메서드가 호출되었다.

```js
class Observer {
  constructor() {
    this.list = []
  }

  registerObserver(target) {
    this.list.push(target)
  }

  unregisterObserver(targetObserver) {
    this.list = this.list.filter(
      existObserver => existObserver !== targetObserver
    )
  }

  notifyObservers(content) {
    this.list.forEach(observer => observer.notify(content))
  }
}

const observer = new Observer()

const target1 = { notify: content => console.log('target1 : ' + content) }
const target2 = { notify: content => console.log('target2 : ' + content) }
const target3 = { notify: content => console.log('target3 : ' + content) }

observer.registerObserver(target1)
observer.registerObserver(target2)
observer.registerObserver(target3)

observer.notifyObservers('hello Observers')
// target1 : hello Observers
// target2 : hello Observers
// target3 : hello Observers

observer.unregisterObserver(target2)

observer.notifyObservers('except target2 in Observers')
// target1 : except target2 in Observers
// target3 : except target2 in Observers
```

클래스 문법을 사용하면 좀 더 깔끔하게 코드를 작성할 수 있다.

## 더 알아볼 패턴

- 싱글톤 디자인 패턴
- 팩토리 디자인 패턴
- 프록시 디자인 패턴
- Iterator 디자인 패턴
- Mediator 디자인 패턴
