---
title: 5분만에 매우 간단한 영상(비디오) 스트리밍 서버 만들기 (nodejs video streaming server)
date: 2020-03-02
published: true
tags: ['nodejs']
cover_image: /images/nodejs-video-streaming-thumbnail.png
description: nodejs의 내장 모듈 'fs'와 외장 모듈인 'express', 'ejs' 등을 통해 간단한 영상을 스트리밍하는 매우 간단하고 기초적인 비디오 스트리밍 서버를 만든다.
---

## 구조

간단한 비디오 스트리밍 서버를 만들기에 앞서 어떤 구조로 만들지 생각해보자. 먼저 view단은 간단하게 제목과 `video` 태그로 나타내자. `video` 태그 안 `source` 태그의 src는 서버에 동적으로 전해주는 변수에 의해 결정되고, src의 요청에 따라 `express`는 요청에 맞는 응답을 한다.

서버의 변수를 HTML 문서에 할당하기 위해 view engine으로 `ejs`를 사용한다. HTML 골격을 최대한 유지하면서 새로운 문법을 배우는 것 같지 않는 이질감을 주기 위해서 `pug` 혹은 `jade` 대신 `ejs`를 사용하는 것으로 한다.

다음은 `ejs`와 `pug`의 문법적인 차이점이다.

```html
# ejs (default html5 template)

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello World</title>
  </head>
  <body>
    <div>Hello World</div>
  </body>
</html>
```

---

```pug
# pug

doctype html
html(lang="ko")
  head
    title Hello World
    meta(charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0")
  body
    div Hello World
```

사실 무얼 쓰든지는 만드는 사람 마음이다.

## 알아야될 것

비디오를 스트리밍 해준다는 것은 요청이 있는 비디오의 영상 용량만큼 nodejs가 읽어야한다. 가령 용량이 10GB가 넘는 비디오가 있다면, 그 영상을 읽는데에만 시간이 꽤나 걸릴 것이며 그만큼 사용자가 대기해야할 것이다.

하지만 nodejs는 이벤트 드리븐(Event-Driven), 논-블로킹 I/O(Non-Blocking)이라는 패러다임 위에 설계된 런타임이다. 그렇기 때문에 비디오 스트리밍같은 대용량 파일을 읽어서 응답하는 서비스에 있어서는 nodejs가 매우 유리한 장점을 가지고 시작하는 것이다.

nodejs의 내장 모듈 `fs`에 대해서는 조금 알아야할 것 같다. `fs` 모듈은 로컬의 파일을 읽어들여 어떠한 동작을 하는 모듈이다. `fs` 모듈 기능중에 `stream`이 있다. `stream`은 데이터 전체를 다 읽거나 쓰지 않고도 중간에 어떠한 동작을 해줄 수 있게 만든다.

정리하자면 아래와 같을 것이다.

- nodejs의 `fs` 모듈
- HTTP 206
- Content-Range 응답 헤더

HTTP 206은 요청 헤더에 데이터 범위를 지정한 헤더가 있을 경우 그 범위에 대한 요청이 성공적으로 응답이 되어 바디에 그 데이터가 있다는 것을 알려주는 번호다.

`fs`의 `stream`은 대용량 파일을 잘게 쪼개어 그 부분만 내보내기 때문에 파일 사이즈에 대한 범위 지정이 필요하다. 따라서 잘게 쪼갠 부분에 대한 응답은 206 코드를 사용한다.

다음은 HTTP 206에 대한 [MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/206) 예제이다.

```bash
HTTP/1.1 206 Partial Content
Date: Wed, 15 Nov 2015 06:25:24 GMT
Last-Modified: Wed, 15 Nov 2015 04:58:08 GMT
Content-Range: bytes 21010-47021/47022
Content-Length: 26012
Content-Type: image/gif

... 26012 bytes of partial image data ...
```

위는 응답이 단일 범위를 가지고 있는 경우의 응답 내용이다.

```bash
HTTP/1.1 206 Partial Content
Date: Wed, 15 Nov 2015 06:25:24 GMT
Last-Modified: Wed, 15 Nov 2015 04:58:08 GMT
Content-Length: 1741
Content-Type: multipart/byteranges; boundary=String_separator

--String_separator
Content-Type: application/pdf
Content-Range: bytes 234-639/8000

...the first range...
--String_separator
Content-Type: application/pdf
Content-Range: bytes 4590-7999/8000

...the second range
--String_separator--
```

위는 응답이 여러 범위를 가지고 있는 경우의 응답 내용. `Content-Range`의 내용을 주의 깊게 봐야한다.
`Content-Range` 헤더는 전체 바디 메세지에 속한 부분 메시지의 위치를 알려주는 헤더이다.

`Content-Range: <단위> <start>-<end>/<size>` 꼴로 쓴다.

## 서버 만들기

```bash
.
├── index.js
├── package.json
├── videos
│   ├── 01.mp4
│   ├── 10.mp4
│   ├── 11.mp4
│   ├── 12.mp4
│   ├── 13.mp4
│   ├── 14.mp4
│   ├── 15.mp4
│   ├── 16.mp4
│   └── example.mp4
├── views
│   └── video.ejs
└── yarn.lock
```

최종적으로 만들 폴더의 구조는 위와 같을 것이다.

`express`와 `ejs`가 필요하기 때문에 두개 다 설치한다. 그 전에 폴더를 초기화 한다.

```bash
yarn init -y

...

yarn add express ejs
mkdir videos views
touch index.js
```

videos 폴더는 스트리밍 해줄 동영상들이 담긴 폴더이고, views는 직접적으로 보여줄 화면단 `ejs` 템플릿이나 HTML 문서들을 작성할 곳.

`index.js`를 수정한다.

```js
// index.js

const fs = require('fs')
const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))

app.get('/video/:fileName', (req, res) => { ... })

app.listen(3000)
```

필요한 모듈을 불러와 변수에 할당하고 ejs를 지정하고 views안의 파일들을 사용할 수 있게 했다. `/video/:fileName` 꼴로 요청이 오면 요청을 해결하기 위한 코드를 작성할 것이고, 화면단에서는 `source` 태그를 통해 이러한 요청을 하게 될 것이다.

`views/video.ejs`로 파일을 작성하고 수정한다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Video Streaming</title>
  </head>
  <body>
    <h1>Video Streaming <%= title %></h1>
    <video width="75%" height="auto" autoplay controls>
      <source src="<%= videoSource %>" type="video/mp4" />
    </video>
  </body>
</html>
```

`video` 태그를 구성한다. 여기서는 총 2개의 `title`과 `videoSource`라는 서버 변수를 받는다. 서버는 약 10개의 `.mp4` 확장자 동영상이 있으며 `/video/example` 꼴로 요청이 오면, videos 폴더의 example.mp4를 찾아 스트림을 만드는 구조다.

먼저 `/view/:fileName` 꼴로 요청이 왔을 때 `ejs`를 뿌려주도록 수정한다.

```js
app.get('/view/:fileName', (req, res) => {
  const { fileName } = req.params

  res.render('video', {
    title: fileName,
    videoSource: `../video/${fileName}`
  })
})
```

이제 `videoSource` 변수는 `ejs`에서 `../video/fileName` 꼴로 치환된다. 이제 `/video/:fileName` 요청 부분을 만든다.

```js
const { fileName } = req.params
const fullPath = `videos/${fileName}.mp4`
const fileStat = fs.statSync(fullPath)
const { size } = fileStat
const { range } = req.headers
```

요청 파라미터에 파일 이름 부분을 가져와서 파일 경로에 대한 변수를 만든다. 파일 경로를 토대로 파일에 대한 정보를 가져온다. 그 후에 요청 헤더 범위에 대한 정보를 `range` 변수에 담아둔다.

```js
// 범위에 대한 요청이 있을 경우
if (range) {
  // bytes= 부분을 없애고 - 단위로 문자열을 자름
  const parts = range.replace(/bytes=/, '').split('-')
  // 시작 부분의 문자열을 정수형으로 변환
  const start = parseInt(parts[0])
  // 끝 부분의 문자열을 정수형으로 변환 (끝 부분이 없으면 총 파일 사이즈에서 - 1)
  const end = parts[1] ? parseInt(parts[1]) : size - 1
  // 내보낼 부분의 길이
  const chunk = end - start + 1
  // 시작 부분과 끝 부분의 스트림을 읽음
  const stream = fs.createReadStream(fullPath, { start, end })
  // 응답
  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${size}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunk,
    'Content-Type': 'video/mp4'
  })
  // 스트림을 내보냄
  stream.pipe(res)
} else {
  // 범위에 대한 요청이 아님
  res.writeHead(200, {
    'Content-Length': size,
    'Content-Type': 'video/mp4'
  })
  // 스트림을 만들고 응답에 실어보냄
  fs.createReadStream(fullPath).pipe(res)
}
```

범위에 대한 요청이 있을 경우와 없는 경우 2가지로 나눈다. 범위가 있으면 시작과 끝 부분을 나누고 그 부분의 스트림을 만들어 응답에 실어 보낸다. (헤더도 같이)

## 결과

아래 사진은 `views/example`로 접속한 결과

![nodejs-video-streaming](/images/nodejs-video-streaming-thumbnail-2.png)

정상적으로 요청과 206 응답이 완료되었고 매우 간단한 영상 하나를 스트리밍해서 내보낼 수 있게 되었다.

## 참고

- ejs 사용 설명서 [https://yahohococo.tistory.com/43](https://yahohococo.tistory.com/43)
- [https://medium.com/better-programming/video-stream-with-node-js-and-html5-320b3191a6b6](https://medium.com/better-programming/video-stream-with-node-js-and-html5-320b3191a6b6)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Content-Range](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Content-Range)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Status/206](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/206)
- [https://javafa.gitbooks.io/nodejs_server_basic/content/chapter11.html](https://javafa.gitbooks.io/nodejs_server_basic/content/chapter11.html)
