---
title: 내 Node.js 애플리케이션을 Docker에 올리기
date: 2021-04-26 12:17:26
published: true
tags: ['nodejs', 'docker', 'typescript']
cover_image:
description: Docker에 Node.js 올리기
---

## Docker 설치

VM을 SSH로 원격 접속하고 그 안에 도커를 설치하는 방법을 정리한다.

### Ubuntu

도커를 공부하기 위해 GCP에서 VM 하나를 샀다. GCP에서는 VM에 SSH로 원격 접속하기 위해 많은 방법을 지원한다. 비공개 키로 접속할 수 있게 해주거나 새로운 크롬 창을 띄워 그 안에서 SSH 환경에 접속할 수 있도록 도와준다. VM에 접속해서 우분투 버전을 확인한다.

```sh
$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 18.04.5 LTS
Release:        18.04
Codename:       bionic
```

꺄르륵. 우분투 18.04가 깔려있고 이제 모든 준비가 끝났다.

### Docker on Ubuntu

이전 버전의 도커가 설치되어 있다면 다음 명령어로 이전 버전의 도커를 깔끔하게 지운다.

```sh
$ sudo apt-get remove docker docker-engine docker.io containerd runc
```

도커 공식 홈페이지에서 제공하는 GPG Key를 다운로드 받는다.

```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

도커와 관련된 패키지를 설치한다.

```sh
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

특정 버전에 대해서 설치할 수 있다.

```sh
sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io
```

### Execute Docker

도커를 실행하기 위해 docker daemon을 실행하는 명령어를 실행한다.

```sh
sudo systemctl start docker
sudo systemctl enable docker
```

도커 컨테이너를 실행한다.

```sh
docker run -it ubuntu bash
```

위 명령어를 실행하면 로컬에서 `ubuntu` 이미지를 찾을 수 없다고 나오는데, 도커가 허브에서 알아서 최신 ubuntu 이미지를 가져와서 로컬에 빌드한다. 다음부터 해당 이미지로 컨테이너를 띄울 때는 허브에서 다운받는 일련의 과정을 거치지 않아도 띄울 수 있다. 그리고 위 `-it` 옵션은 해당 이미지로 들어가서 해당 커맨드를 실행하라는 명령어로 이해를 하면 된다.

모든 준비가 끝났다. 도커를 이용해서 컨테이너를 띄울 수 있다면 이제 모든게 끝났다고 봐도 무방하다.

### Node.js 이미지

도커는 여러 애플리케이션 및 OS가 돌아갈 수 있게 미리 만들어놓은 이미지들이 존재한다. 이 이미지들을 빌드해서 컨테이너를 띄운다. 이 이미지들은 도커에서 공식적으로 제공하는 이미지가 될 수 있으며 다른 사람이 만들어놓은 이미지일 수도 있다.

다른 사람이 만들어놓은 컨테이너 뼈대라고 생각하면 편할 것 같다. 만약 내가 Node.js 컨테이너를 띄우고 싶다고 하면 도커에서 공식적으로 제공하는 Node.js 이미지가 있고 Node.js에 다른 옵션이 필요하다하면 그 다른 옵션까지 포함하는 이미지를 다른 사람이 제공할 수 있으므로 도커 허브에서 찾아서 필요한 이미지를 다운로드할 수 있다.

[노드 도커 리스트](https://hub.docker.com/_/node)를 참조하면 도커에서 공식적으로 노드에 대한 이미지를 제공한다. 여기에서는 `14-alpine`을 사용한다.

## Node.js 프로젝트 구축

```sh
mkdir node-docker-test
yarn init -y
touch Dockerfile
```

해당 디렉토리를 노드 프로젝트로 초기화하고 `Dockerfile` 하나를 작성한다. 여기에서는 해당 프로젝트가 도커에 의해 빌드될 때 다양한 옵션을 지정할 수 있다. 예를 들어 해당 프로젝트가 어떤 이미지를 사용해서 그 이미지 위에 띄어져야 하는지, 컨테이너가 띄어지고 나면 그 후에 실행해야할 명령어, 포트 등 다양한 옵션을 여기서 지정할 수 있다. 그리고 `docker run` 명령어 실행시 해당 파일을 읽어들일 수 있도록 설정할 수 있다.

```docker
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
RUN npm install -g pm2
COPY . .
CMD [ "npm", "run", "start:prod" ]
EXPOSE 3000
```

`FROM`은 이미지를 설정하고, `WORKDIR`은 작업 공간을 의미하며 실제로 이 곳에 우리의 컨테이너가 위치한다. `COPY`는 말 그대로 파일을 복사하는데, 두 번째 인자로 준 경로는 지정된 `WORKDIR`이 된다. 그 다음 `RUN`은 실행할 커맨드를 적는다. 노드 이미지를 사용하기 때문에 `npm`이 기본적으로 설치되어 있는 환경에서 해당 커맨드가 실행된다.

디렉터리의 모든 내용을 작업 공간으로 옮기고 `npm run start:prod` 라는 커맨드를 실행한다. 그리고 포트는 3000번 포트로 해당 애플리케이션을 연다.

### SSH 환경에서 띄우기

위 내용을 모두 `git`에 올리고 SSH 환경에서 모든 내용을 가져온다. 그리고 도커로 이미지를 빌드한다.

```sh
cd node-docker-test && docker build -t app .
```

프로젝트 디렉터리 안 `Dockerfile`을 읽어들인다. 그리고 이미지가 `node:14-alpine`으로 지정되어 있으므로 해당 이미지를 도커 허브에서 다운로드 받은 후 로컬에 저장한다. 그 이미지를 빌드하고 일련의 작업을 거친다. 이 과정은 캐싱되며 변경사항이 없다면 아주 빠르게 진행될 것이고 변경된다면 변경된 부분만 도커에 의해 알아서 처리된다.

```sh
docker run -d app -p 3000:3000
```

해당 이미지로 빌드된 컨테이너가 띄워지고 백그라운드에서 우리의 Node.js 애플리케이션이 돌게된다.
