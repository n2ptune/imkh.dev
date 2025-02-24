---
description: 테이블 아이템에 여백을 주는 여러가지 방법
cover_image:
tags: ['css', 'html5']
published: true
date: 2020-06-04 14:00:58
title: 테이블 아이템에 여백을 주는 여러가지 방법 (css-table-margin)
---

## 테이블 아이템에 여백

테이블 아이템(행)과 아이템 사이에 여백을 주려고 할 때, 일반적으로 생각할 수 있는 아래와 같은 스타일이 적용되지 않는다.

```css
table tbody tr {
  margin: 1rem 0;
  padding: 1rem 0;
}
```

CSS 1 및 CSS 2에서는 마진과 패딩을 테이블 이외에 모든 요소에 사용할 수 있었으나 CSS 3에 오면서 테이블 행(tr)에 대한 마진과 패딩 지원이 삭제되었다고 한다. 최근에는 테이블을 이용해서 요소를 표현하는 경우는 많지 않지만 아직도 테이블을 이용해서 레이아웃을 구성하는 페이지가 많다.

테이블의 행에 여백을 줄 수 있는 여러가지 편법을 정리한다.

## border-spacing

```css
table {
  border-collapse: separate;
  border-spacing: 0 1rem;
}
```

테이블 전체의 테두리를 서로 분리하고 `border-spacing` 속성을 이용해서 거리를 조절한다. 해당 속성의 값은 **[가로][세로]**길이를 주면 된다.

위 방법은 테이블 전체에 영향을 줄 수 있는 방법이기 때문에 많이 쓰이질 않을 것 같은 방법이다.

## line-height / height

줄과 줄 사이의 간격을 조절하는 `line-height` 속성을 이용해서 테이블 행의 높이를 조절할 수 있다. 기존에 줄 간격에 사용하는 것 처럼, 테이블의 행에 사용하면 된다.

```css
table tbody tr {
  line-height: 3rem;
}
```

비슷한 방법으로 테이블 행에 높이를 지정하면 여백이 생긴 것 처럼 보이게 할 수 있다.

```css
table tbody tr {
  height: 150px;
}
```

## border

위 테두리와 아래 테두리를 두껍게 해주고, 반투명 색깔인 `transparent` 값을 주면 여백이 있는 것 처럼 보인다.

```css
table tbody tr td {
  border-top: 1rem solid;
  border-bottom: 1rem solid;
  border-color: transparent;
}
```

위의 방법들과 다른점은, 행에 스타일을 입히는 것이 아니라 한 행에 포함된 열들에 스타일을 입힌다.

![table margin](/images/table-margin-example1.png)

실제로는 행에 있는 아이템들의 위 아래 테두리 두께를 조정하는 것이므로 빨갛게 칠한다면 위의 사진과 같이 표시된다.
