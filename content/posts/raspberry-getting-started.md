---
title: 라즈베리 파이 4 Model B 환경 구성하기(시작하기)
date: 2021-08-28T08:56:30.523Z
published: true
tags: ['raspberrypi']
cover_image: ./images/raspberrypi-getting-started-thumbnail.jpg
description: 라즈베리 파이 4 Model B SSH 환경 구성과 HDMI 없이 라즈베리 파이 4 제어하기
---

# 라즈베리 파이 4 시작하기

라즈베리 파이 4 Model B (스타터 키트) 구입처: 쿠팡

## OS 설치

동봉되어 있는 SD 카드에 OS를 설치해주면 된다. [Imager](https://www.raspberrypi.org/software/)를 이용해 [OS](https://www.raspberrypi.org/software/operating-systems/)를 설치해주면 된다.

## SSH 연결

스타터 키트에 HDMI to Micro HDMI 선이 동봉되어 있지만 모니터 문제인지 선 문제인지 모니터가 꺼졌다 켜졌다를 반복하길래 한번 내려치니 HDMI 핀이 박살... 모니터를 연결해서 GUI를 보지 않고 SSH 연결을 가능케하는 방법이 있다.

### WI-FI 자동 연결

라즈베리 파이에 꽂혀 있던 SD카드를 다시 해제하고 노트북에 연결시킨다. OS 드라이브로 들어가 `wpa_supplicant.conf` 파일을 작성한다.

```conf
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=KR

network={
 ssid="WI-FI 네트워크 이름"
 psk="WI-FI 네트워크 비밀번호"
}
```

라즈베리 파이 3B+ 모델 이후 `country` 속성이 필수라고 한다. 여기서는 KR로 적는다. 이 파일을 작성하면 라즈베리 파이가 부팅될 때 해당 네트워크를 자동으로 잡는다.

### SSH 구성

`ssh` 라는 이름의 파일 하나만 생성하면 자동으로 SSH 연결에 필요한 구성을 해준다.

### SSH 연결

PuTTY 같은 SSH 클라이언트를 사용해서 SSH 연결을 시도한다. 호스트 네임은 `raspberrypi`로 접속하면 되고, 기본 아이디와 패스워드는 각각 `pi`, `raspberry`로 입력한다.

> 초기에 부팅할 때 패스워드를 이미 지정했다면 그 패스워드를 입력하면 된다. 내 경우 한번 부팅을 시도해서 패스워드를 입력하고 그 뒤로 안했기 때문에 초기 패스워드가 기본값으로 되어있지 않다.

## 원격 데스크톱 연결 (Windows)

윈도우의 원격 데스크톱 연결이라는 어플리케이션을 통해 GUI를 보면서 초기 구성을 진행할 수 있다. 먼저 라즈베리 파이 쉘에서 아래 명령어로 `xrdp`를 설치한다.

```sh
sudo apt-get install xrdp
```

그런 뒤 원격 데스크톱 연결 어플리케이션을 구동해서 호스트 네임에 `raspberrypi`를 입력하면 GUI를 보고 진행할 수 있다.
