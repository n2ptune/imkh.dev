---
description: 응답과 요청에 부가적인 정보를 넣을 수 있는 "헤더"에 관한 내용을 이해하고 정리하기
cover_image:
tags: ['http', 'web', 'internet']
published: true
date: 2020-05-20
title: HTTP HEADER에 대한 정리
---

## HTTP 헤더

클라이언트가 서버로 요청을 할 때 혹은 서버가 클라이언트에 응답할 때 부가적인 정보를 담는 곳이 **헤더**라는 곳이다. 자바스크립트 객체와 비슷하게 키와 값이 쌍을 이루는 값으로 이루어져 있다. 예를 들어 키에는 `Content-Type` 라는 키와 값에는 `application/json` 등이 온다. 이 둘을 콜론으로 구분한다. 최종적으로는 `Content-Type: application/json`과 같은 꼴이 된다.

헤더는 문맥에 따라 종류를 나눌 수 있다. 대표적으로 요청과 응답에 모두 실어나를 수 있는 **General Header**가 있고, 클라이언트 자체 정보 등을 담는 **Request Header**, 서버의 자체 정보 등을 담는 **Response Header**, 컨텐츠 길이 혹은 MIME 타입에 관한 정보를 담는 **Entity Header**로 나눌 수 있다.

## General Header

HTTP 공통 헤더라고도 불린다. HTTP 통신을 하는 서버와 클라이언트측에서 모두 사용할 수 있는 헤더를 말한다. 이 공통 헤더는 일반적인 목적으로 사용되며 가장 기본적인 정보 등을 담는 헤더들이 있다.

### Date

HTTP 메세지를 생성한 일시를 뜻한다. (참고: [RFC1123](https://tools.ietf.org/html/rfc1123))

키는 **Date**로 사용되며 자바스크립트의 **Date** 객체를 `toGMTString` 메소드로 반환되는 문자열 방식을 쓴다. 예를 들어 `Date: Wed, 20 May 2020 02:44:49 GMT` 꼴로 쓴다.

### Connection

이 헤더는 HTTP 통신이 완료된 후에 네트워크 접속을 유지할지 말지를 결정하는 헤더다. 값으로는 `close`와 `keep-alive` 두 개가 있으며 `close`의 경우 통신이 완료된 후에 바로 연결을 끊겠다는 의미로, HTTP/1.0에서는 이 값이 기본 값이였다. 반대로, `keep-alive`의 경우에는 연결을 열린 상태로 유지하는 것을 나타낸다. HTTP/1.1에서 기본 값이다.

이 부분의 경우 이해하려면 시간이 조금 필요한 것 같아서 [참고 자료](https://developer.mozilla.org/ko/docs/Web/HTTP/Connection_management_in_HTTP_1.x)를 읽어 보아야 할 것 같다.

### Cache-control

서버와 클라이언트 요청 응답간의 캐싱 매커니즘을 위해 정의하는 헤더, 키:값으로 이루어진 헤더에서 '값'을 '디렉티브'라는 명칭으로 쓰인다.

이 디렉티브에는 매우 다양한 값이 올 수 있으며 주로 쓰이는 것 몇 가지만 정리한다.

- `max-age=[seconds]` 리소스가 최신 상태라고 판다할 최대 시간을 지정하는 디렉티브, 요청 시간과 관련이 있다.
- `no-store` 어떠한 요청과 응답에 대한 정보를 캐시하지 않는다.
- `no-transform` 응답에 대해 변형이나 변환이 일어나면 안된다. 컨텐츠의 헤더는 프록시에 의해 수정되면 안된다고 명시하고 이를 허용하지 않는다.
- `no-cache` 캐시된 복사본을 보여주기 전에, 재검증을 위한 요청을 서버로 보내도록 강제한다. (이 부분은 조금 더 찾아봐야 할 듯)
- `public` 응답은 어떠한 캐시에 의해서든 캐시될 수 있다.
- `private` 응답은 공유 캐시에 의해 저장되지 않아야 한다.

## Entity Header

주로 컨텐츠의 정보를 담기 위한 헤더이다. Content- 로 시작하는 헤더 키들이 있다.

### Content-Type

응답하는 컨텐츠가 어떤 유형인지 알려주는 헤더, 디렉티브에는 **media-type**, **charset**, **boundary** 등이 온다.

media-type이란 말 그대로 컨텐츠의 유형을 [MIME Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)으로 작성하면 된다. 주로 사용되는 `application/json`, `text/html`, `font/woff`, `image/jpeg`, `image/png`, `video/mp4` 등이 있다.

HTML의 폼에서 서버로 요청할 때, Content-Type은 form의 enctype 속성에 의해 결정된다. form에서는 여러 종류의 파일을 서버로 보낼 수 있는데, 이 때 사용하는 속성이 `multipart/form-data`다. form의 데이터를 여러 부분으로 나누어 전송하는 것을 서버에게 알려준다. form에서 서버로 전송한 컨텐츠의 갯수 만큼 이 컨텐츠에 대한 헤더를 작성할 수 있다.

### Content-Length

바이트 단위의 컨텐츠 길이를 보낸다. [명세 RFC 7230](https://tools.ietf.org/html/rfc7230#section-3.3.2)

### Content-Location

컨텐츠의 대체 위치를 가리킨다. 이 위치는 상대적인 주소가 될 수도 있으며 절대적인 주소가 될 수도 있다. (리다이렉션의 대상을 가리키는 Location 헤더와는 다르다) `Content-Location: https://example.com/index.html` 꼴로 쓰인다.

### Content-Range

컨텐츠의 부분 위치를 알려준다. 예를 들어 총 67800bytes 크기를 가지는 컨텐츠를 부분적으로 보낸다면 `Content-Range: bytes 100-1000/67800` 꼴로 나타낼 수 있다. 이 헤더는 응답으로 내보낸 컨텐츠가 총 컨텐츠 길이는 67800bytes이고, 그 중 100bytes에서 1000bytes 까지의 컨텐츠다. 라고 알려주는 헤더다.

[명세 RFC 7233](https://tools.ietf.org/html/rfc7233#section-4.2)

## Request Header

요청에 실리는 헤더들이다. 주로 클라이언트의 자체 정보를 담는 것들이 있다.

### Host

요청을 하는 주체에 대한 정보를 담는 헤더, HTTP/1.1 이후 이 헤더는 필수 항목이 되었다. `Host: developers.facebook.com`과 같이 쓰인다.

### User-Agent

클라이언트의 정보를 담는다. 여기에는 브라우저 엔진, 버전, 운영체제 등이 담길 수 있다. `User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0` 꼴로 쓰인다.

### Accept

클라이언트가 어떤 컨텐츠 타입을 이해할 수 있는지에 대한 정보를 담는 헤더, MIME 타입으로 작성할 수 있으며 서버는 이 헤더를 참고해서 적절하게 응답할 수 있다. (Accept 헤더로 클라이언트가 이해할 수 있는 컨텐츠 타입을 나열하고, 서버는 그 중 하나를 선택해 Content-Type 헤더에 컨텐츠 타입을 내보낸다.)

`[MIME_Type]/[MIME_Subtype]`, `[MIME_TYPE]/*`, `*/*`, `;q=` 등으로 지정하는데, `text/html` 혹은 `application/json`과 같은 Type/Subtype을 지정해서 요청할 수도 있고 `text/*`과 같이 text라는 MIME Type을 가진 모든 컨텐츠를 요청할 수 있다. 그 뒤에 `;q=0.8`과 같이 부가 정보를 붙일 수 있는데, 이 부분은 이해하기가 어려워 MDN을 참고했다.

> 사용되는 모든 값들은 weight라고 부르는 상대적인 품질 값을 사용하여 표현되는 선호 순서로 대체됩니다. (q-인자 가중치에 대한 설명)

`Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8`과 같은 꼴로 헤더에 작성할 수 있다.

### Accept-Language

만약 다국어를 지원해야 하는 서비스를 운영하고 있을 경우 도메인을 다르게 해 각국의 언어로 작성된 페이지를 보여줄 수 있는데, 이런 방법을 사용하지 않는다면 클라이언트가 서버에게 직접 이해할 수 있는 언어를 헤더에 실어서 보낼 수 있다.

`Accept-Language: ko-KR, ko;q=0.5`과 같이 쓰인다.

### Accept-Encoding

요청해서 응답 받을 데이터의 압축 방식을 지정하는 헤더다. 크롬에서는 기본값으로 gzip으로 요청하는 것 같고, 그 외에 compress, deflate, br, identity 등을 사용할 수 있다.

### Authorization

주로 인증 토큰을 보낼 때 쓰는 헤더다. 다양한 언어에서 구현된 JWT 라이브러리로 만들어진 토큰을 이 헤더에 실어서 서버에 보낼 수 있다. 주로 `Authorization: Type Token` 꼴로 쓰인다.

일반적으로는 Type에 Bearer를 쓰고, Token에 Access Token을 담아서 서버에 보낸다. 서버는 이러한 토큰을 받아 검증하고 검증된 토큰이면 자원을 내보내고 그렇지 않다면 적절한 응답을 할 수 있다.

### Referer

이 헤더는 현재 요청된 페이지에서 이전에 방문한, 그러니까 내가 지금 보고있는 페이지를 어디로부터 들어오게 되었는지를 표시하는 헤더다. 다양한 애널리틱스 서비스에서는 이러한 헤더를 통해 사이트가 어디로부터 유입되었는지 정보를 얻어낸다.

> 사실 이 단어는 Referrer가 맞는 단어인데, 철자를 빠뜨렸다고 한다. 옳은 단어는 Referrer

이 헤더는 사생활과 관련된 브라우징 히스토리에 관한 정보를 노출할 가능성이 있다고 한다. 그리고 두 가지의 경우 서버로 전송되지 않는다.

1. 참조된 리소스가 로컬 파일인 경우와 데이터의 URI인 경우 (자바스크립트 파일 요청이나 CSS 파일 요청 등)
2. HTTP 요청이 사용되고 참조하는 페이지가 HTTPS를 사용할 경우

`Referer: https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Content-Range` 과 같이 쓰인다.

## Response Header

서버 자체의 정보를 담는 헤더, 컨텐츠에 대한 정보를 담을 수도 있다.

### Server

기본적인 서버의 정보를 담는 헤더다. 너무 많은 서버의 정보를 담게 되면 공격을 받을 수 있으므로 세부적으로 작성하는 건 피해야한다. 요청을 처리하는 서버측이 어떠한 소프트웨어를 사용하고 있는지 혹은 하위 제품에 대한 내용을 담는다.

`server: Netlify`과 같이 쓰인다.

### Access-Control-Allow-Origin

해당 Origin(주소)으로부터 오는 요청을 허용한다는 정보를 알려주는 헤더, `access-control-allow-origin: *`과 같이 쓰이는데, 와일드 카드 \*가 오게되면 모든 Origin을 허용한다는 의미다.

그렇지 않고 Origin을 적게 되면 그 Origin으로 오는 요청만 허용한다는 의미다. 만약 허용되는 Origin이 아닌 다른 곳에서 요청이 오게 된다면 브라우저에서 CORS 오류를 뿜는다.

이 값은 하나의 Origin만 명시할 수 있으며 다양한 서버 사이드 언어에서 다양한 Origin을 허용할 수 있는 구현 방법이 있으니 참고하면 될 것 같다.

### Expires

리소스가 지정된 일시까지 유효하다고 나타내는 헤더. 캐시와 관련이 있으며 리소스에 대한 캐시가 언제 만료되는지를 알려주는 헤더다.

**Date**객체의 `toGMTString` 메소드로 반환되는 문자열을 값으로 사용하면 된다.

### ETag

HTTP 컨텐츠가 바뀌었는지에 대한 검증을 할 수 있는 태그다. 응답 본문이 변하지 않는다면 항상 똑같은 값을 내뱉고 변한다면 다른 값을 내뱉기 때문에 이로 인해 컨텐츠가 바뀌었는지 검증이 가능하며 만약 바뀌게 된다면 캐시를 지우고 새로 내려받게 된다.

## 참고

- [https://www.zerocho.com/category/HTTP/post/5b594dd3c06fa2001b89feb9](https://www.zerocho.com/category/HTTP/post/5b594dd3c06fa2001b89feb9)
- [https://gmlwjd9405.github.io/2019/01/28/http-header-types.html](https://gmlwjd9405.github.io/2019/01/28/http-header-types.html)
- [https://developer.mozilla.org/ko/docs/Glossary/Request_header](https://developer.mozilla.org/ko/docs/Glossary/Request_header)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Access-Control-Allow-Origin](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Accept-Encoding](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Accept-Encoding)
