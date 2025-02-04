---
description: 오픈소스 저장소 관리 시스템인 Nexus를 통해 사내 혹은 팀 내부적인 공통 라이브러리 및 의존성, 아티팩트를 공유하는 방법에 대해 학습하고 정리하기
cover_image: /images/nexus-cover-unsplash.jpg
tags: ['javascript']
published: true
date: 2025-02-05 01:52:00
title: Nexus로 npm registry를 구축해서 팀 내부 의존성 및 프론트엔드 라이브러리 공유하기
---

## Nexus란

[Sonatype](https://www.sonatype.com/)이라는 곳에서 개발한 오픈소스 저장소 관리 시스템을 말한다. Nexus를 이용하면 다양한 패키지를 제공할 수 있는 환경을 쉽게 구축할 수 있으며 보안 기능을 제공하고, 공식 레지스트리를 미러링할 수 있는 프록시 기능도 제공한다.

이 글에서는 Nexus에 npm repository를 구축하여 npm 프로젝트를 공유하고 사용할 수 있는 방법에 대해서 정리한다. (Nexus가 npm만을 지원하는 것은 아니고 메이븐, 도커, NuGet 등 다양한 패키지 형태도 제공한다.)

## Nexus 설치

(Nexus 서버 구축에 관련된 내용은 도커 허브에서 Sonatype이 제공한 이미지를 그대로 사용했으므로 참고)

```sh
docker run -d -p 40001:8081 --name nexus sonatype/nexus:oss
```

공식 도커 레지스트리에 Sonatype이 제공하는 Nexus 이미지로 손쉽게 서버를 구축할 수 있다. 데이터 휘발성에 관련된 내용도 있으나 이 글에서는 중요하지 않기 때문에 따로 설정하지 않는다.

```sh
docker logs -f nexus
```

컨테이너 실행 후 잘 실행이 되었나 확인하기 위해 컨테이너 로그를 출력한다.

```sh
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
exec /bin/sh: exec format error
```

당연하게도 에러가 났고, 이미지 빌드를 한 플랫폼이 linux/amd64고 실행하려는 라즈베리파이 환경이 linux/arm64/v8 환경이라 실행되지 않는 것 같다. 이런 경우 Nexus를 실행하려는 환경에 맞게 이미지를 재빌드 해야한다.

```sh
git clone https://github.com/sonatype/docker-nexus3
```

이미지 재빌드를 위해 깃 레포지터리를 클론한다.

```sh
cd docker-nexus3
docker build --rm=true --platform=linux/arm64/v8 --tag=sonatype/nexus3 .
```

`--platform` argument에 현재 호스트 플랫폼의 정보를 넣고 이미지를 빌드한다.

```sh
ERROR [4/7] RUN curl -L https://download.sonatype.com/nexus/3/nexus-3.70.1-02-unix.tar.gz --output nexus-3.70.1-02-${JAVA_VERSION}-unix.tar.gz     && echo "29952f663982bd9781d5bc352471727826943452cfe
```

마찬가지로 에러에 봉착했다.

```sh
rm Dockerfile
mv Dockerfile.java11 Dockerfile
docker build --rm=true --tag=sonatype/nexus3 --platform=linux/arm64/v8 .
```

자바 버전이 문제인 것 같아서 `JAVA_VERSION` 환경 변수가 지정되어 있는 이미지 파일로 교체 후 다시 빌드를 진행한다.

```sh
[+] Building 269.5s (11/11) FINISHED                                                                                                                                                                docker:default
 => [internal] load build definition from Dockerfile                                                                                                                                                          0.0s
 => => transferring dockerfile: 4.18kB                                                                                                                                                                        0.0s
 => [internal] load metadata for registry.access.redhat.com/ubi8/ubi-minimal:latest                                                                                                                           1.0s
 => [internal] load .dockerignore                                                                                                                                                                             0.1s
 => => transferring context: 2B                                                                                                                                                                               0.0s
 => CACHED [1/7] FROM registry.access.redhat.com/ubi8/ubi-minimal:latest@sha256:d16d4445b1567f29449fba3b6d2bc37db467dc3067d33e940477e55aecdf6e8e                                                              0.0s
 => [2/7] RUN microdnf update -y     && microdnf --setopt=install_weak_deps=0 --setopt=tsflags=nodocs install -y     java-11-openjdk-headless tar procps shadow-utils gzip     && microdnf clean all     &  111.5s
 => [3/7] WORKDIR /opt/sonatype                                                                                                                                                                               0.5s
 => [4/7] RUN curl -L https://download.sonatype.com/nexus/3/nexus-3.70.1-02-java11-unix.tar.gz --output nexus-3.70.1-02-java11-unix.tar.gz     && echo "38c6f81d78c2f6ae461f491d9321d36e98ff2e19eee365270d  113.7s
 => [5/7] RUN sed -i '/^-Xms/d;/^-Xmx/d;/^-XX:MaxDirectMemorySize/d' /opt/sonatype/nexus/bin/nexus.vmoptions                                                                                                  3.3s
 => [6/7] RUN echo "#!/bin/bash" >> /opt/sonatype/start-nexus-repository-manager.sh     && echo "cd /opt/sonatype/nexus" >> /opt/sonatype/start-nexus-repository-manager.sh     && echo "exec ./bin/nexus ru  2.1s
 => [7/7] RUN microdnf remove -y shadow-utils                                                                                                                                                                 5.9s
 => exporting to image                                                                                                                                                                                       30.8s
 => => exporting layers                                                                                                                                                                                      30.7s
 => => writing image sha256:1d88dc70d82e03040c80989530b01b45105b4e98f08db2d1d97fe783de483a98                                                                                                                  0.0s
 => => naming to docker.io/sonatype/nexus3
```

이미지 빌드에 성공했다. 자바 버전에 대한 문제가 맞았던 것 같다. 기본 이미지 파일에는 `JAVA_VERSION`에 대한 변수 지정이 없어서 명령어에 치환이 안됬던 것 같은 느낌이 든다. 아니면, 기본적으로 자바 8을 다운로드 받는데, 이 문제일 수도 있을 것 같다.

```sh
docker container rm nexus
docker run -d -p 40001:8081 --name nexus sonatype/nexus3:latest
```

기존 지원되지 플랫폼 이미지로 생성된 컨테이너를 지우고 새로 빌드한 이미지로 컨테이너를 실행시킨다.

```sh
curl http://localhost:40001/nexus/service/local/status
curl: (56) Recv failure: Connection reset by peer
```

curl 호출시 에러가 난다. 40001 포트를 쓰고 있나 싶었지만 아무데도 쓰고 있는 곳이 없었고 내부 포트를 잘못 지정했나 싶은데, 어플리케이션 세팅 로그를 보니 호스트도 `0.0.0.0`이고 포트도 8081로 잘 설정되어 있었다.

```sh
2025-02-04 15:33:51,260+0000 INFO  [jetty-main-1] *SYSTEM org.sonatype.nexus.siesta.SiestaServlet - Initialized
2025-02-04 15:33:51,344+0000 INFO  [jetty-main-1] *SYSTEM org.sonatype.nexus.repository.httpbridge.internal.ViewServlet - Initialized
2025-02-04 15:33:51,639+0000 INFO  [jetty-main-1] *SYSTEM org.eclipse.jetty.server.handler.ContextHandler - Started o.e.j.w.WebAppContext@68cc4eab{Sonatype Nexus,/,null,AVAILABLE}
2025-02-04 15:33:52,224+0000 INFO  [jetty-main-1] *SYSTEM org.eclipse.jetty.server.AbstractConnector - Started ServerConnector@2427db47{HTTP/1.1, (http/1.1)}{0.0.0.0:8081}
2025-02-04 15:33:52,227+0000 INFO  [jetty-main-1] *SYSTEM org.eclipse.jetty.server.Server - Started @534580ms
2025-02-04 15:33:52,245+0000 INFO  [jetty-main-1] *SYSTEM org.sonatype.nexus.bootstrap.jetty.JettyServer -
-------------------------------------------------

Started Sonatype Nexus OSS 3.70.1-02

-------------------------------------------------
```

공식 문서를 다시 뒤져보니 구축된 서버가 켜지는데 오랜 시간이 소요된다고 한다. 서버가 켜지지 않았는데 계속 curl 호출을 하고 있었다.

![completed install nexus](/images/nexus-1.png)

Nexus 설치 및 구축이 모두 완료되었다.

## Nexus 사용

```sh
dokcer exec -it nexus /bin/sh
cat /nexus-data/admin.password
```

최초 admin 계정은 비밀번호가 해당 디렉터리에 텍스트 형태로 저장되어 있다. 도커 허브에는 admin / admin123 이라 적혀있는데 낚인 것 같다.

![Nexus login admin account](/images/nexus-2.png)

admin 계정으로 로그인하면 비밀번호 재설정 및 익명 계정 접근 여부를 설정하게 되며 마무리할 수 있다.

### Blob Store 만들기

![Create blob store](/images/nexus-3.png)

Blob Store라는 개념은 파일 시스템으로 치면 디렉터리와 같은 느낌이라고 볼 수 있다. 디렉터리 하위에 레포지터리가 있고, 그 레포지터리를 모은 느낌이라고 생각하면 될듯싶다. 문서에 따르면 서버의 파일 시스템이 될 수도 있고, 네트워크 디렉터리도 될 수 있다고 한다.

### Realms 설정

![nexus-realms](/images/nexus-realms.png)

보안 관련해서, npm Bearer Token 방식에 대한 Realms을 활성화 시켜야 한다. 해당 메뉴에서 npm Bearer Token Realm를 Active 메뉴에 이동시키고 저장한다.

### 유저 만들기

![nexus-user](/images/nexus-user.png)

레포지터리를 접근할 수 있는 계정을 만든다. 계정마다 접근할 수 있는 레포지터리를 제한하거나, 레포지터리 내에서도 특정 권한만 오픈하거나 그런 기능을 제공한다.

### 레포지터리 만들기

![nexus-create-repository](/images/nexus-create-repository.png)

팀 내 라이브러리를 실질적으로 업로드하는 곳이 레포지터리다. 레포지터리 패키지 형태를 반드시 정해서 생성해야 하며, 여기서는 npm (hosted)을 선택해서 생성한다. 글 초반에 서술했듯 공식 레지스트리를 미러링할 수 있는 프록시 기능도 제공한다.

![nexus-create-repository-2](/images/nexus-create-repository-2.png)

레포지터리를 URL 형태로 접근하기 때문에 이름은 URL에 들어갈 수 있는 형태로 작성해야 한다.

레포지터리 종류 중 npm (group) 처럼 그룹 레포지터리가 있는데, 이 레포지터리는 호스트 레포지터리 혹은 프록시 레포지터리를 묶어 단일 URL 엔드포인트로 제공할 수 있다. 예를 들어 A, B, C 레포지터리가 전부 호스트 레포지터리고 각기 다른 패키지 및 라이브러리가 저장되어 있다면 이 A, B, C 레포지터리를 묶어 D 그룹 레포지터리를 생성할 수 있다.

D 그룹 레포지터리에 접근하여 어떤 라이브러리 다운로드를 요청할 때 그룹 내 모든 레포지터리에서 라이브러리를 찾는다.

### 롤 설정

![nexus-role](/images/nexus-role.png)

위에서 계정을 생성할 때, 모든 권한을 다 줘버렸는데 실제로 모든 권한을 주는 것이 아닌 계정마다 부분적으로 권한을 주는 전략을 취한다. 특정 레포지터리에 특정 권한만 주거나, 특정 레포지터리의 모든 권한을 부여할 수 있다.

### NPM 프로젝트 퍼블리싱하기

```sh
mkdir nexus-test
cd nexus-test
npm init -y
```

npm 프로젝트를 초기화한 후, 몇 가지 설정을 해야한다. 이 프로젝트를 아까 만든 fe-repo 레포지터리에 퍼블리싱할 예정이다.

![nexus-repo](/images/nexus-repo.png)

그 전에 먼저 레포지터리 상세 화면으로 들어오게 되면, URL란에 해당 레포지터리의 주소가 나와있는데, 이 부분을 복사한다.

```json
{
  "name": "nexus-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "publishConfig": {
    "registry": "http://{repository_url}/repository/fe-repo"
  }
}
```

`publishConfig` 아래, `registry` 키에 아까 복사했던 레포지터리 URL을 작성한다.

```sh
npm login --registry=http://{repository_url}/repository/fe-repo
Username: imkh
Password:

Logged in on http://{repository_url}/repository/fe-repo.
```

프로젝트를 퍼블리싱하기 위해서 Nexus에 로그인 해줘야한다. 그리고 레포지터리에 퍼블리싱 하려면 계정에 레포지터리 접근 권한이 있어야 하므로 로그인 과정이 필수적이다. `--registry` argument에 레포지터리 URL을 준 것에 유의하자.

```sh
...
npm notice Publishing to http://{repo}/repository/fe-repo with tag latest and default access
npm error code E403
npm error 403 403 Forbidden - PUT http://{repo}/repository/fe-repo/nexus-test
npm error 403 In most cases, you or one of your dependencies are requesting
npm error 403 a package version that is forbidden by your security policy, or
npm error 403 on a server you do not have access to.
npm error A complete log of this run can be found in:
```

해당 계정에 권한이 없어 퍼블리싱이 실패하는 메시지다. 아까 권한을 부여했지만 한 개 더 권한 추가가 필요하다.

![nexus-privileges](/images/nexus-privileges.png)

체크한 권한도 해당 계정에 부여한 뒤 다시 퍼블리싱을 시도한다.

```sh
...
npm notice filename: nexus-test-1.0.0.tgz
npm notice package size: 333 B
npm notice unpacked size: 337 B
npm notice shasum: 01bbaa0a209e6e20ca612caff63fc0a641b9f48d
npm notice integrity: sha512-/LLQj3UwQa+gi[...]/p8+H5Laq1a/w==
npm notice total files: 2
npm notice
npm notice Publishing to http://{repo}/repository/fe-repo with tag latest and default access
+ nexus-test@1.0.0
```

퍼블리싱에 성공했다.

![nexus-repo-browse](/images/nexus-repo-browse.png)

Nexus UI에서도 정상적으로 업로드된 것을 확인할 수 있다.

### 퍼블리싱한 프로젝트 설치하기

이제 레포지터리에 공통 라이브러리 및 프라이빗한 프로젝트를 퍼블리싱할 수 있다는 것을 알게되었다. 공유하는 것도 중요하지만 설치해서 직접 사용할 수 있어야하는 것도 중요하다. 마찬가지로 해당 레포지터리의 패키지가 익명으로 모두에게 제공되는 형태가 아니라면, 설치하기 위해서도 인증 정보가 필요하다.

```sh
mkdir nexus-use-test
cd nexus-use-test
npm init -y
npm install nexus-test

npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/nexus-test - Not found
npm error 404
npm error 404  'nexus-test@*' is not in this registry.
```

npm은 기본적으로 공식 레지스트리에서 의존성을 설치하므로 우리가 퍼블리싱한 의존성을 찾지 못한다. 따라서, **특정 의존성은 특정 레지스트리에서 찾도록 설정**해야한다.

```sh
touch .npmrc
```

`.npmrc` 파일의 내용을 `nexus-test:registry=http://{repo}/repository/fe-repo` 형태로 작성해야만 할 것 같다. 그런데 실제로 이렇게 작성한 뒤 `npm i nexus-test` 실행시 공식 레지스트리에서 의존성을 찾는데, 단일 의존성을 특정 레지스트리에서 찾는게 불가능하다. (불확실하지만 npm 버전 11.1.0 기준 방법을 도통 모르겠다.)

따라서, 프로젝트의 스코프를 지정해줘야한다. 예를 들어 nexus-test 프로젝트의 경우 일반적으로 앞에 @ 문자와 조직명 혹은 팀명으로 시작하는 이름으로 변경해줘야 한다. @fe/nexus-test

```sh
cd ../nexus-test
```

nexus-test의 package.json에서, 프로젝트 이름을 @fe/nexus-test로 변경한 뒤 다시 퍼블리싱을 진행한다.

![nexus-repo-browse-2](/images/nexus-repo-browse-2.png)

Nexus UI상에는 이렇게 하위 디렉터리에 프로젝트가 저장된다. 다시 의존성을 설치하는 프로젝트로 돌아가 `.npmrc` 파일을 수정한다.

```sh
@fe:registry=http://{repo}/repository/fe-repo
```

@fe로 시작하는 의존성은 모두 입력한 레지스트리에서 먼저 찾으라는 설정값이다.

```sh
npm i @fe/nexus-test

added 1 package, and audited 2 packages in 1s

found 0 vulnerabilities
```

정상적으로 설치된다. 다만 정상적으로 설치되는 이유는 퍼블리싱을 진행했을 때 `npm login` 명령어로 해당 레포지터리에 로그인했기 때문이다. 레포지터리에 익명을 허용하는 설정을 따로 하지 않았기 때문에 아무나 레포지터리에 접근할 수 없다.

```sh
npm logout --registry=http://{repo}/repository/fe-repo
npm i @fe/nexus-test
npm error code E401
npm error Unable to authenticate, need: BASIC realm="Sonatype Nexus Repository Manager"
```

로그아웃 후 레포지터리에 접근시 권한 문제로 막히는 것을 볼 수 있다.

## 정리

간단하게 Nexus를 사용해 보았는데, 글에서 정리한 것 외에도 Nexus는 많은 기능을 제공하고 있다. 특히 보안 관련해서 많은 기능을 제공하는 걸 확인했는데, 많이 다뤄보지 못해 아쉬운 것 같다.

아무튼, [Verdaccio](http://verdaccio.org/)라는 대안 솔루션도 있지만 Nexus 쪽이 좀 더 오래되고 다양한 패키지 형태를 제공하여 국내에서도 많은 기업에서 사용하는 것 같다. 자바 진영 의존성 매니저인 메이븐만 지원하는 걸로 알고 있었어서 멀리 했었는데, 이번 기회에 npm registry 역할도 대신 할 수 있는 걸 알게됬다. 그리고 그 외 다양한 기능들도 제공하고 있는 걸 확인했다. 다음에는 권한, 프록시 레지스트리 미러링에 대한 내용을 학습하고 정리하면 좋을 것 같다.
