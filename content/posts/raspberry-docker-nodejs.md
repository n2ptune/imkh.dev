---
title: 라즈베리 파이 4에 Docker를 설치하고 Node.js 어플리케이션 실행하기
date: 2021-08-29T17:19:13.008Z
published: true
tags: ['raspberrypi']
cover_image:
description: 라즈베리 파이에 Docker를 설치하고 백엔드 어플리케이션(Node.js)를 실행해보기
---

## Docker 설치

도커를 설치하는 과정은 라즈베리 파이에 국한되지 않고 데비안 기반 OS에서 아래와 같은 방법으로 설치할 수 있다.

```sh
sudo apt-get update
curl -fsSL https://test.docker.com -o test-docker.sh | bash
```

만약 해당 OS에서 Docker를 설치할 수 없다면 다른 방법으로 우회해서 설치하도록 한다.

설치한 이후 매번 `root` 권한으로 `docker` 명령어를 실행해야 하는 번거로움이 있으므로 현재 계정을 docker group에 포함시킨다.

```sh
sudo usermod -aG docker pi
docker -v

Docker version 20.10.8, build 3967b7d
```

정상적으로 docker 설치를 완료하였다.

## Network

외부 IP 주소를 통해 들어오는 요청은 공유기에 의해 어떤 내부 IP의 포트로 처리할 지 공유기에서 정할 수 있다. 이렇게 처리하는 방법을 지정하는 것을 포트포워딩이라고 한다. 일반적으로 공유기 설정 페이지에서 매우 간단하게 설정할 수 있다. 직접 LAN을 물리고 있든, 무선 네트워크를 사용하고 있든 내부 IP 주소가 있기 때문에 외부에서 들어오는 특정 포트의 요청을 라즈베리 파이의 내부 IP 주소를 통해 처리되도록 설정한다.

## Node.js (Nest)

Node.js 어플리케이션을 도커 컨테이너 안에서 실행할 수 있도록 환경을 구성한다. 여기서는 백엔드 프레임워크인 Nest를 사용하여 프로젝트를 구성한다.

### Dockerfile

서버 한 대를 임대받았다고 생각하고 평소에 하던 것처럼 구성하면 된다.

```dockerfile
FROM node:14-alpine
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build
RUN yarn global add pm2

EXPOSE 3000

CMD ["pm2-runtime", "start", "./dist/main.js", "--env", "production"]
```

패키지 매니저로 `yarn`을 사용하므로 `yarn`을 기준으로 명령어를 작성한다. `pm2`를 사용하는데, 기본 `pm2` 명령어는 인스턴스를 실행하고 바로 프로세스가 종료되기 때문에 터미널이 자동으로 종료된다. 이런 이슈를 방지하기 위해 `pm2-runtime`으로 실행한다.

### run

```sh
docker build . -t pm2-nest
docker run -d --name nest -p 80:3000 pm2-nest
```

프로젝트 의존성을 설치하고 몇 분이 지나면 프로젝트를 빌드하고 `pm2-runtime`이 백엔드 어플리케이션을 실행할 수 있는 컨테이너가 구성된다. 이 컨테이너를 구동시켜 확인해본다.

```sh
docker ps

fef0733e46c2   pm2-nest   "docker-entrypoint.s…"   20 minutes ago   Up 20 minutes   8080/tcp, 0.0.0.0:80->3000/tcp, :::80->3000/tcp   nest
```

매우 잘 되고 있는 것을 확인할 수 있다.

## 정리

- 라즈베리 파이라고 해서 도커를 사용하는 방식은 바뀌지 않는다.
- 기존의 웹 서버를 띄웠던 것처럼 하면 문제 없다.
- 가끔 32bit OS 문제로 이미지 빌드가 안되는데 해당 이미지의 레포지터리로 가서 Dockerfile을 복사한 뒤 라즈베리 파이 OS에서 이미지를 한번 더 빌드해준다.
