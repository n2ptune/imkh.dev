---
title: "Nodejs v17 이상 버전에서 OpenSSL 관련 에러 해결하기"
date: 2023-12-28 00:20:00
published: true
tags: ['nodejs']
cover_image:
description: "Nodejs v17 이상 버전에서 OpenSSL 관련 에러 해결하는 방법에 대해서 정리하고 기록하기 Error: error:0308010C:digital envelope routines::unsupported"
---

## Nodejs OpenSSL

[OpenSSL](https://www.openssl.org/)은 현존하는 대부분의 대칭/비대칭 암호화 프로토콜을 구현한 오픈 소스 라이브러리다. 대표적으로 SSL/TLS과 관련된 기능들을 제공하며 Nodejs 내부 패키지 **crypto**, **https** 등에서 관련 기능을 자주 사용한다.

OpenSSL은 1998년 12월 0.9.1 버전을 처음으로 2021년 9월까지 3.0.0 버전까지 공개되었다. OpenSSL 구현은 C언어로 되어 있지만, Nodejs에서 이를 사용할 수 있도록 바인딩을 제공한다. Nodejs 버전 17 미만 버전까지는 OpenSSL의 1.x.x 버전을 사용했지만, 2021년 9월 OpenSSL 버전 3이 등장함에 따라 Nodejs 버전 17부터 OpenSSL 3 버전을 기본적으로 사용하기에 구버전의 API를 사용하려고 하는 내부 패키지에 의해서 `Error: error:0308010C:digital envelope routines::unsupported` 요런 에러가 뜰 수 있다.

이 글에서는 해당 에러를 우회하기 위한 방법을 정리하고 기록한다.

### NODE_OPTIONS 수정

제일 간단하게 사용할 수 있는 방법은 `NODE_OPTIONS` 라는 매개변수에 값을 추가하는 것이다. Nodejs가 실행될 때 Nodejs에 관련된 옵션이나, V8 엔진에 대한 옵션을 설정할 수 있는 매개변수다. Nodejs 버전 8부터 추가됬으므로 버전 8부터 사용이 가능한 방법이다.

`--openssl-legacy-provider` 옵션은 레거시로 간주되는 API 사용시 에러를 발생시키지 않고, [레거시에 대응하는 구현](https://www.openssl.org/docs/man3.0/man7/OSSL_PROVIDER-legacy.html)을 사용하도록 지시하는 옵션이다.

#### bash / zsh 기반 OS

```sh
export NODE_OPTIONS="--openssl-legacy-provider"
```

설정 후 `echo $NODE_OPTIONS` 으로 확인한다.

#### Windows (CMD)

```sh
set NODE_OPTIONS="--openssl-legacy-provider"
```

설정 후 `echo %NODE_OPTIONS` 으로 확인한다.

#### Windows (Powershell)

```sh
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

설정 후 `echo $env:NODE_OPTIONS` 으로 확인한다.

### Nodejs 다운그레이드

해당 이슈는 Nodejs 버전 17 이상을 사용하면 발생되는 걸로 확인했는데, [릴리즈 노트](https://nodejs.org/en/blog/release/v17.0.0) 확인시 OpenSSL 3.0을 포함한다고 적혀있는 걸로 보아, 정확히 Nodejs v17.0.0 버전부터 해당 문제가 발생할 수 있을 거라 생각된다. 따라서 다운그레이드로 이 문제를 해결하려고 하면, 17버전 미만으로 다운그레이드하면 이슈를 우회할 수 있다.

하지만, 다운그레이드는 그다지 올바르지 않은 방법인 것 같다.
