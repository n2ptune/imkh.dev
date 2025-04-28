---
title: MySQL 사용자 계정 추가 및 관리
date: 2023-05-06 18:11:00+09
published: true
tags: ['mysql']
cover_image: /images/mysql-user-thumbnail.jpg
description: MySQL에서 데이터베이스에 접근할 수 있는 사용자 계정을 추가할 수 있는 방법과 다양한 관리 방법에 대해서 정리하고 학습한다.
---

## MySQL User

MySQL에서 데이터베이스에 접근할 수 있는 사용자 계정을 추가할 수 있는 방법과 다양한 관리 방법에 대해서 정리하고 학습한다.

## 사용자 계정 추가하기

```sh
CREATE USER 'user_name'@'localhost' IDENTIFIED BY 'user_password';
```

`user_name` 이라는 사용자 계정을 생성하고, 비밀번호는 `user_password`로 생성한다. 단, 이 사용자 계정은 `localhost` 환경에서만 접근이 가능하다. 즉 데이터베이스 서버에서만 접근가능한 계정이다.

## 사용자 계정 권한 추가하기

사용자 계정 추가시 기본적으로, 데이터베이스 접근 권한이 없는데 추가 SQL을 작성해 계정 권한을 관리할 수 있다.

```sh
GRANT ALL PRIVILEGES ON user_databsae.* to 'user_name'@'localhost';
```

이전에 생성했던 `user_name` 계정은 `user_database` 라는 데이터베이스의 모든 테이블을 접근할 수 있도록 권한 설정한다. `*`은 **모든**의 의미를 가지고 있으며 `*.*` 형태로 작성될 경우, 모든 데이터베이스의 모든 테이블에 접근 가능하다는 의미로 볼 수 있다.

### 부분 권한 부여

권한 추가 부분의 `GRANT ALL PRIVILEGES`는 모든 권한을 부여한다는 의미인데, `user_database.*`에 `ALL PRIVILEGES`를 적용해주었다면, 해당 계정은 `user_database` 데이터베이스에서 모든 테이블에 SQL을 사용할 수 있게된다. 계정에 대해 부분적인 권한만 주고싶을 경우 아래와 같이 작성한다.

```sh
GRANT SELECT, INSERT ON user_databsae.* to 'user_name'@'localhost';
```

해당 계정은 `user_database` 데이터베이스 내 테이블에서 `SELECT`, `INSERT` SQL만 수행할 수 있다.

### 권한 취소

계정에 부여했던 권한은 `REVOKE`를 통해 권한을 취소할 수 있다.

```sh
REVOKE ALL PRIVILEGES ON user_databsae.* to 'user_name'@'localhost';
REVOKE SELECT, INSERT ON user_databsae.* to 'user_name'@'localhost';
```

## 사용자 계정 비밀번호 수정

사용자 계정의 비밀번호를 수정하는 방법은 여러가지 있다.

```sh
SET PASSWORD FOR 'user_name'@'localhost' = PASSWORD('user_password2');
```

여기서는 `SET`을 이용하여 변경한다.

## 사용자 계정 삭제하기

`DROP`을 사용해서 사용자 계정을 삭제한다.

```sh
DROP USER 'user_name'@'localhost';
```

## 사용자 계정 확인하기

기본적으로 `mysql` 데이터베이스 내 `user` 테이블에 사용자 계정 정보가 담겨있다.

```sh
SELECT * from mysql.user;

+--------------+-----------+-------------------------------------------+
| HOST         | USER      | PASSWORD                                  |
+--------------+-----------+-------------------------------------------+
| localhost    | root      |                                           |
| 6fabc82b4bdb | root      |                                           |
| 127.0.0.1    | root      |                                           |
| ::1          | root      |                                           |
+--------------+-----------+-------------------------------------------+
```
