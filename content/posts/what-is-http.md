---
description: HTTP에 대한 이해와 정리
cover_image:
tags: ['internet', 'http', 'web']
published: true
date: 2020-03-29
title: HTTP에 대한 이해와 정리 (what-is-http)
---

## 정의

한 나라에서 살아가려면 그 나라의 언어를 익혀 그 나라의 사람과 대화를 하면서 생활하는 것이 일반적이다. 물론 나라의 언어에 익숙치 않다면 몸짓으로 표현하는 등의 행위로 다른 사람과 소통을 할 수 있다. 월드 와이드 웹이라는 세상에서도 정보를 주고 받기 위해 어떠한 규칙으로 대화하자고 정해놓은 약속이 있다. 이 약속이 바로 **HTTP**(**H**yper**T**ext **T**ransfer **Protocol**)이다.

이 HTTP라는 것을 이용해서 클라이언트는 서버로부터 파일에 대한 요청이나 경로에 의한 요청의 응답을 받게된다. 서버의 주소, 파일의 위치 등은 URL에 실어서 서버에 보낸다.

### URL

서버는 리소스를 고유한 식별자로 지정하고 위치시킨다. 이 개념이 URI(Uniform Resource Identifier, 통합 자원 식별자)다. 이 URI를 형태로 만든 것이 URL((Uniform Resource Locator, 통합 자원 지시자)다. 이 URL은 우리가 실생활에서 자주 쓰였던 것이다. 예를 들어 네이버에 접속한다고 했을 때, 브라우저 주소창에 naver.com을 입력한다. 이 것이 바로 URL다.

기본적으로 naver.com이라는 URL을 주소창에 입력시켜 서버에 요청을 하면 많은 일들이 일어난다. 브라우저는 기본적으로 http 요청을 보내며 https가 적용되어 있다면 https로 리다이렉션 시킬 것이고 경로에 대해 기본 제공 파일이 존재한다면 기본 파일을 제공할 것이다. naver.com은 기본적으로 index.html을 제공한다. 실제로 naver.com으로 접속했을 때와 naver.com/index.html로 접속했을 때의 응답이 똑같다.

이렇듯 URL 경로에 대해 기본적으로 제공할 파일을 서버에서 결정할 수 있다. 그리고 이 HTML파일 안에 HTML파일을 좀 더 꾸며주기 위한 스타일 시트 파일이나, 자바스크립트 파일이나 다양한 이미지 파일들이 존재할 것이다. 브라우저는 이런 파일들을 HTML문서에서 만나게 되면 서버에 이 파일들을 요청하게 되고 요청이 들어온 URL에 맞는 자원을 내보낸다.

## 역사

하이퍼텍스트라는 용어는 테드 넬슨이라는 사람이 1965년에 만들었으며 팀 버너스 리와 그의 팀이 HTTP를 발명했다. 이 사람은 1989년에 월드와이드웹 프로젝트를 1989년에 제안했으며 이 것이 우리가 사용하고 있는 인터넷 상의 공간인 월드 와이드 웹(www)이다. 여기서 사용되는 프로토콜은 최초 한 개의 메소드(GET)와 서버로부터의 응답은 무조건 HTML문서 하나 뿐이였었다.

문서화 된 최초 버전은 1991년 HTTP 0.9버전으로 발표했다. 1995년 12월 당시 개발중인 HTTP/1.1이 많은 브라우저 개발자들에 의해 채택됬고, 다음 해 3월에 이 프로토콜을 채택한 많은 브라우저들이 나왔다. 이후 많은 개정을 통해 HTTP이 발달했으며 현재 HTTP/2 등 많은 발달이 이루어졌다.

```bash
# curl -I www.example.com
HTTP/1.1 200 OK
Content-Encoding: gzip
Accept-Ranges: bytes
Age: 252175
Cache-Control: max-age=604800
Content-Type: text/html; charset=UTF-8
Date: Sun, 29 Mar 2020 13:10:31 GMT
Etag: "3147526947"
Expires: Sun, 05 Apr 2020 13:10:31 GMT
Last-Modified: Thu, 17 Oct 2019 07:18:26 GMT
Server: ECS (nyb/1D11)
X-Cache: HIT
Content-Length: 648
```

위는 cURL을 이용한 HTTP 요청 테스트다. 서버에 대한 응답 헤더로 위와 같은 것이 왔다.

## 요청 메소드

클라이언트는 서버로 어떤 동작에 대해 지정해서 요청할 수 있다. 대표적으로 `GET`과 `POST`가 있다. 단순하게 표현하자면 클라이언트가 서버로부터 가져와, 보내 등의 말을 지정한다고 보면 된다. 서버는 동작에 대해 데이터를 내보낸다거나 클라이언트로부터 받은 데이터를 데이터베이스에 저장시킨다거나 하는 동작을 할 수 있다. 그리고 이러한 동작으로부터 클라이언트에게 적절한 메세지를 섞어 응답할 수 있다.

다음과 같은 메소드들이 있다.

- GET 서버의 자원을 요청
- POST 서버에 데이터를 보냄
- HEAD 응답 본문을 포함 X (GET과 동일)
- PUT 식별자에 대한 데이터 수정 & 생성
- DELETE 서버 자원 삭제
- CONNECT 서버와 클라이언트의 터널을 염 (TCP 스트림)
- OPTIONS 서버의 통신 옵션 설명
- TRACE
- PATCH

아래는 `OPTIONS`의 예제

```bash
# curl -X OPTIONS http://example.org -i
HTTP/1.1 200 OK
Allow: OPTIONS, GET, HEAD, POST
Cache-Control: max-age=604800
Content-Type: text/html; charset=UTF-8
Date: Sun, 29 Mar 2020 13:44:53 GMT
Expires: Sun, 05 Apr 2020 13:44:53 GMT
Server: EOS (vny/0453)
Content-Length: 0
```

Allow에 보면 `GET`, `POST`, `HEAD`를 허용하는 걸 볼 수 있다.

## 응답 메세지

응답 메세지는 아래와 같은 것들이 포함된다.

- 상태표시 행(응답 코드 + 결과 메세지)
- 응답 헤더
- 빈 줄
- 기타 메세지

상태표시 행은 HTTP/1.1 200 OK와 같은 응답에 대한 상태를 표시한다.

응답 헤더는 요청에 대한 설명? 같은 것이 들어있는 헤더다. `Access-Control-Allow-Origin`, `Connection`, `Date`, `Content-Type` 등 많은 헤더가 있으며 요청이 온 데이터에 대해 설명할 수도 있다.

### 응답 코드

서버는 클라이언트의 요청에 세자리 수로 된 응답 코드로 응답한다. 100번대와 500번대까지 다양한 응답 코드가 존재한다. 이런 응답 코드는 의미하는 바가 모두 제각각이다. 응답의 유형에 따라 5가지로 나눈다.

#### 1xx (정보)

정보에 대한 응답을 한다. 서버에 프로토콜 전환 요청을 했을 경우 서버는 이를 승인하고 있음을 나타내는 **101**코드를 응답할 수 있다.

HTTP/1.0 이래로 한번도 응답 코드가 추가되지 않았으며 **100, 101, 102**를 제외한 100번대 응답코드는 절대로 클라이언트에게 보내면 안된다.

#### 2xx (성공)

요청에 대해 정상적으로 처리했을 경우 200번대 코드들을 응답한다. 대표적으로 단순하게 처리를 완료했다는 의미로 **200**번 코드가 제일 많이 쓰이고, 성공적으로 처리되었고 새 자원이 작성되었다면 **201**코드를 응답한다.

#### 3xx (리다이렉션)

예를 들어 https를 강제하기 위해 서버가 http로 오는 요청을 https로 리다이렉션 시킬 때 이 코드가 쓰인다. 주로 영구히 이동이라는 뜻의 **301**코드가 많이 쓰인다. 300번대 코드들은 클라이언트가 요청을 마치기 위해 추가적인 동작을 취해야 한다는 의미를 담고 있다.

#### 4xx (오류 - 요청)

400번대와 500번대 코드들은 요청에 대해 실패했다고 응답하는 코드들이다. 그 중 400번대 코드들은 클라이언트에 오류가 있음을 알리는 코드다. 대표적으로 없는 자원을 요청할 경우 **404**코드가 응답된다. 많이 경험해봤던 404 Not Found는 자원을 찾을 수 없다는 소리다.

```bash
# curl -X GET example.com/wrong-path -i
HTTP/1.1 404 Not Found
Cache-Control: max-age=604800
Content-Type: text/html; charset=UTF-8
Date: Sun, 29 Mar 2020 14:04:54 GMT
Expires: Sun, 05 Apr 2020 14:04:54 GMT
Server: EOS (vny/044F)
Vary: Accept-Encoding
Content-Length: 1256
```

없는 경로에 요청할 때 위와 같이 404 응답 코드를 받았다.

그 외 인증에 관련되서 요청에 오류가 있음을 표시하는 **401**과 **403**이 있다. 401은 흔히 로그인이 필요한 페이지에 로그인을 하지 않고 들어갔을 때 볼 수 있고, 403은 해당 페이지에 권한이 없을 때 주로 응답받는다.

```bash
# curl https://mail.naver.com/ -I
HTTP/1.1 403 Forbidden
Server: nginx
Date: Sun, 29 Mar 2020 14:09:30 GMT
Content-Type: text/html
Content-Length: 162
Connection: keep-alive
Keep-Alive: timeout=15
P3P: CP="ALL CURa ADMa DEVa TAIa OUR BUS IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC OTC"
Vary: User-Agent,Accept-Encoding
```

로그인이 되지 않은 채로 네이버 메일 페이지에 접근했더니 위와 같이 403 코드를 응답받았다.

#### 5xx (오류 - 서버)

요청을 수행하지 못하고 서버에 오류가 발생했을 때 500번대 코드를 응답한다. 주로 서버 내부에 오류가 발생했을 때 **500**번 코드를 응답한다. 요청에 대한 기능을 수행할 수 없을 때 **501**코드를 응답하지만 500번대의 오류들은 거의 본적이 없고 500번만 많이 본듯하다.

모든 상태 코드는 [위키백과](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)에서 확인이 가능하다.

## 참고

- [https://developer.mozilla.org/ko/docs/Glossary/Response_header](https://developer.mozilla.org/ko/docs/Glossary/Response_header)
- [https://mygumi.tistory.com/139](https://mygumi.tistory.com/139)
- [https://httpstatuses.com/401](https://httpstatuses.com/401)
