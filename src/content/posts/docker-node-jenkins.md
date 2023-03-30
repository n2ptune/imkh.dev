---
title: Node.js와 Docker 그리고 Jenkins.
date: 2021-05-22 01:12:16
published: true
tags: ['devops', 'nodejs', 'docker']
cover_image: /images/docker-thumbnail.jpg
description: Node.js 애플리케이션을 Docker 컨테이너 형태로 Github과 연동해서 Jenkins로 자동 빌드하기
---

## 도커와 Node.js 그리고 Jenkins

![flow-image](/images/atlassian-marketplace.png)

DevOps의 흐름을 잘 표현해주는 이미지가 있다. 기업에서 서비스를 개발할 때 이미지와 비슷한 흐름을 가진다. 이 흐름을 이해하고자 도커와 Node.js 그리고 Jenkins를 이용해서 개발하고, Github 특정 브랜치에 push가 일어날 때마다 자동으로 배포가 될 수 있도록 설정하며 공부한 내용을 기록한다.

## Jenkins 설치

Jenkins는 Github으로 부터 Webhook을 수신받아 push가 일어나면 저장소의 내용을 긁어와서 자동으로 배포한 후 이미지를 빌드하고 컨테이너 형태로 띄워주는 역할로 사용한다. 기본적인 흐름은 다음과 같다.

1. 이벤트 수신 -> 저장소 pull
2. 빌드 명령어 실행 (이미지 빌드 및 컨테이너 실행)
3. 빌드 후 알림 (슬랙 등)

우분투 기준으로 Jenkins(이하 젠킨스)를 설치하는 방법은 그다지 어렵지않다.

```sh
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```

repository 키를 설정하고 젠킨스를 설치한다. 위는 LTS 버전을 기준으로 다운로드 되며 가장 최신 버전을 다운로드 받고 싶다면 아래와 같이 repository 키를 수정해야 한다.

```sh
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
```

젠킨스 설치까지 완벽하게 끝났다면 자바를 설치해야 한다.

```sh
sudo apt search openjdk
```

openjdk에 관련된 패키지를 검색하고 다운로드 받을 수 있는 패키지를 설치한다. 공식 홈페이지에 권장 버전은 11이라고 나와있다.

```sh
sudo apt install openjdk-11-jdk
java -version

openjdk version "11.0.9.1" 2020-11-04
OpenJDK Runtime Environment (build 11.0.9.1+1-post-Debian-1deb10u2)
OpenJDK 64-Bit Server VM (build 11.0.9.1+1-post-Debian-1deb10u2, mixed mode, sharing)
```

젠킨스를 구동하기 위한 모든 준비가 끝났다.

### 젠킨스 기본 포트 설정하기

아무것도 설정하지 않고 젠킨스를 구동하면 기본 포트로 설정되어 있는 8080번 포트에 젠킨스 서버가 열린다. 이를 수정하기 위해서는 `/etc/default/jenkins` 파일을 수정하면 된다.

```sh
sudo vim /etc/default/jenkins

# port for HTTP connector (default 8080; disable with -1)
HTTP_PORT=9999
```

`HTTP_PORT` 부분을 설정하고 싶은 포트로 설정한다. 그 외 여기서 젠킨스 기본 설정과 관련된 옵션을 조작할 수 있다.

### 도커 접근 권한 설정

젠킨스에서 도커 `/var/run/docker.sock` 파일을 접근하려고 하면 Permisson Denied 에러가 날 수 있다. 젠킨스가 해당 파일을 접근할 수 있게 권한을 쥐어주면 된다.

```sh
sudo usermod -aG docker jenkins
```

### 젠킨스 시작

우분투 환경이라면 자바 설치 후 젠킨스를 설치하면 자동으로 젠킨스 서버가 실행될 수도 있다. 기본 포트는 8080이지만 다른 포트를 사용하고 싶다면 젠킨스 서비스를 다시 시작해야 될 것이다.

```sh
sudo systemctl status jenkins
```

`systemctl` 명령어로 젠킨스 서버의 상태를 확인한다. 아직 젠킨스가 구동되어 있지 않다면 시작한다. 그 전에 젠킨스 서버 포트를 개방한다.

```bash
sudo ufw allow 9999
sudo ufw enable
sudo ufw status

Status: active

To                         Action      From
--                         ------      ----
3306                       ALLOW       Anywhere
9999                       ALLOW       Anywhere
9999 (v6)                  ALLOW       Anywhere (v6)
```

포트까지 개방됬다면 젠킨스 서비스를 시작한다.

```sh
sudo systemctl start jenkins
```

정상적으로 열었다면 아이피와 포트를 브라우저에 입력한 후에 접속을 시도하면 젠킨스 모듈 설치에 관련된 페이지가 뜬다. 여기서 젠킨스에서 필요로한 여러가지 설치 프로그램을 다운로드 받고 설치한다.

```sh
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

첫 시도시 젠킨스에서 비밀번호를 물어보는데, 위 경로에 첫 접근에 필요한 관리자 비밀번호가 적혀있다. 이 부분을 참고해서 입력하면 된다.

### 젠킨스 설정

대시보드에서, 새로운 Item을 클릭하여 우리의 프로젝트를 추가한다. 프로젝트 이름은 아무거나 하고 Freestyle project를 선택한다. 프로젝트에 관한 설정을 할 수 있는 구성탭에서 설정한다.

1. General 탭에서 GitHub project 부분을 체크하고 우리 프로젝트 URL을 입력한다.
2. 소스 코드 관리 Git을 체크하고 마찬가지로 저장소 URL을 입력한 후 Credentials를 입력한다. (아이디 및 비밀번호를 입력할 수 있고 SSH도 사용할 수 있다.)
3. 브랜치 타겟을 지정한다.
4. 빌드 유발 탭에서 `GitHub hook trigger for GITScm polling`에 체크한다.
5. 빌드 탭에서, 도커 이미지 빌드 및 컨테이너 실행에 관련된 명령어를 지정한다.
6. 맨 마지막 저장을 누른 뒤 구성 설정을 종료한다.

젠킨스에서 Github으로 부터 Webhook을 수신받을 준비는 끝났다.

## Github Webhook 설정

Github 프로젝트 URL에서 Settings 탭에 들어간다. Webhooks 부분이 나오는데, 이 부분을 클릭하고 Add webhook이라는 버튼을 클릭해서 추가한다. Payload URL에 젠킨스 서버 URL을 입력한다. `http://0.0.0.0:9999/github-webhook/` 이런식으로 작성하면 된다. `Content-Type`은 `application/json`으로 설정하고, `Just the push event.`에 체크한 후 Webhook을 추가한다.

### 테스트

테스트 삼아 저장소에 push를 날려본다. 젠킨스에 도커와 관련된 명령어를 빌드 스텝에 지정해놓았으므로 도커 파일이 있어야 정상적으로 빌드 명령어가 실행된다. 아니면 그냥 Webhook이 정상적으로 수신되는지에 대한 테스트를 진행하려면 그냥 저장소에 push한다. 젠킨스 대시보드에 빌드 히스토리가 작성된다면 정상적으로 Webhook이 수신되고 있다.

기존에 실행중인 컨테이너에 대한 삭제 처리는 처음 컨테이너를 실행할 때 컨테이너 이름을 지정함으로써 다음 빌드시 컨테이너 이름으로 해당 컨테이너를 종료시킨다. 이런 방식으로 하면 되지않을까 싶은데 다른 오케스트레이션 도구를 사용할 때에는 어떨지 모르겠다.

## Node.js와 Dockerfile

`express`를 설치해서 `/` 경로에 간단한 json을 주는 웹 애플리케이션을 작성한다. (테스트용) 그 후 pm2로 프로세스를 관리한다. [pm2에 관련된 이미지가 있고 가이드](https://hub.docker.com/r/keymetrics/pm2)가 있으니 참고 바란다.

```ts
import * as express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

app.listen(process.env.PORT, () => {
  console.log('started at', process.env.PORT)
})
```

서버를 하나 만들고 환경 변수를 pm2에서 읽어들이기 위한 혹은 pm2에 관련된 설정을 지정하는 파일을 하나 만든다.

```json
{
  "name": "server-test",
  "script": "src/app.ts",
  "instances": "2",
  "env_production": {
    "NODE_ENV": "production",
    "PORT": 5000
  }
}
```

`pm2.json`으로 지정하고 Dockerfile을 작성한다.

```docker
FROM keymetrics/pm2:14-alpine

# Bundle APP files
COPY . src/
COPY package.json .
COPY pm2.json .

# Install app dependencies
# ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn

# Show current folder structure in logs
# RUN ls -al -R

EXPOSE 5000

RUN pm2 install typescript

CMD [ "pm2-runtime", "start", "pm2.json", "--env", "production" ]
```

타입스크립트를 사용하기 위해 `pm2 install typescript` 명령어를 사용하고, 마지막 pm2를 실행할 때 `--env` 옵션으로 `production` 모드인 걸 지정하는 걸 빼면 가이드에서 나와있는 대로다. 이제 저장소에 push를 때려 빌드가 정상적으로 되는지 확인한다.

이 방법은 Node.js 뿐만이 아니라 어떤 언어, 프레임워크가 와도 컨테이너 형태로 운영하면 되기 때문에 Node.js에 국한되지 않는다. 어떤 언어든 상관없다.
