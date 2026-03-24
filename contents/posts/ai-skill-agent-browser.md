---
title: AI 에이전트에게 눈을 달아줄 수 있는 스킬, agent-browser
published: true
date: 2026-03-24T05:40:56.199Z
cover_image:
description: AI 에이전트에게 프론트엔드 코드로 구현된 어플리케이션을 실제 브라우저상에서 확인 시키는 agent-browser
tags: ['ai']
---

## AI 에이전트에게 눈을 달아줄 수 있는 스킬, agent-browser

LLM을 통해 프론트엔드 코드를 생성하여 프로젝트에 적용하면 코드는 완벽하지만, 때로 시각적인 요소가 원하는대로 적용되지 않을 때가 많다. 물론 지침을 매우 정확하게 주면 그에 맞는 코드를 생성해주겠지만, 이는 경험상 그리 쉬운 일이 아니다. LLM이 생성된 코드를 적용한 후에 실제 브라우저에서 시각적인 요소까지 검토시키면 어떨까? 기존에는 이런 아이디어에 Playwright MCP를 종종 떠올리곤 했었다. LLM에 Playwright MCP를 연결시켜 Playwright 가 지원하는 여러 툴을 사용하여 코드 생성-브라우저 검토 단계를 자동화한다.

다만, Playwright 같은 것들에서 가져오는 데이터의 양이 어마무시하며 이는 곧 심각한 컨텍스트 토큰 낭비로 이어진다. agent-browser 는 방대한 메타데이터를 무분별하게 주되, LLM이 화면의 핵심 요소만 즉각적으로 파악할 수 있도록하는 참조 시스템을 제공한다. 따라서, Playwright MCP를 사용하는 것보다 훨씬 토큰을 절약할 수 있으며 효율적이다.

### agent-browser 특징

Playwright MCP가 브라우저의 모든 정보를 날것 그대로 LLM에게 쏟아붓는다면, agent-browser는 이를 시맨틱하게 요약한다. 불필요한 레이아웃 정보는 쳐내고, AI가 상호작용해야 할 핵심 요소들만 추출하여 전달한다. 실제 벤치마크에 따르면 일반적인 브라우저 도구 대비 컨텍스트 사용량을 최대 93%까지 절약할 수 있어, 훨씬 긴 대화 흐름 속에서도 시각적 검토를 수행할 수 있다. - **압도적인 토큰 절약 가능**

가장 인상적인 부분은 바로 @e1, @e2와 같은 참조 시스템이다. 화면의 스냅샷을 찍을 때 각 요소에 짧은 ID를 부여합니다. LLM은 "두 번째 버튼을 클릭해"라고 생각하는 대신, 그냥 click @e2라는 간결한 명령만 내리면 된다. 이 과정에서 발생하는 토큰 소모는 단 몇 바이트 수준이다. - **참조 시스템**

단순히 텍스트 데이터만 줄이는 것이 아니라, 스크린샷과 메타데이터를 결합하여 LLM이 화면의 실제 상태를 다각도로 파악하게 한다. snapshot -i 명령어를 통해 상호작용 가능한 요소들만 추려낸 '인터랙티브 스냅샷'을 제공하면, LLM은 마치 숙련된 QA 엔지니어처럼 화면의 논리적 구조와 시각적 배치를 동시에 이해하고 코드를 수정할 수 있다. - **시각적인 요소에 대한 피드백 가능**

Node.js 기반의 무거운 자동화 도구들과 달리, agent-browser는 Rust로 작성된 CLI를 통해 구동된다. 덕분에 실행 속도가 매우 빠르고 가벼우며, 별도의 복잡한 MCP 서버 설정 없이도 npm install 하나로 즉시 프로젝트에 투입할 수 있다는 강점이 있음. - **접근성 좋고 Rust 기반의 가벼운 런타임**

### 설치 방법

```sh
npm i -D agent-browser
```

OS에 맞는 Rust로 컴파일된 바이너리가 알아서 설치된다.

```sh
agent-browser install
```

Chrome 브라우저 관련 의존성을 설치한다. (최초 1회)

```sh
agent-browser open example.com
agent-browser snapshot -i
```

브라우저에서 example.com 을 열고, 스냅샷을 찍는다. 이 시점에서 출력으로 참조 시스템이 엘리먼트를 참조하는 값을 출력해준다.

```sh
agent-browser click @e2
agent-browser screenshot page.png
agent-browser close
```

각 명령어들이 매우 직관적이고 쉽게 설계되어 있다.

```sh
agent-browser open <url>              # Navigate (aliases: goto, navigate)
agent-browser click <sel>             # Click element (--new-tab to open in new tab)
agent-browser dblclick <sel>          # Double-click
agent-browser fill <sel> <text>       # Clear and fill
agent-browser type <sel> <text>       # Type into element
agent-browser press <key>             # Press key (Enter, Tab, Control+a) (alias: key)
agent-browser keyboard type <text>    # Type at current focus (no selector needed)
agent-browser keyboard inserttext <text>  # Insert text without key events
agent-browser keydown <key>           # Hold key down
agent-browser keyup <key>             # Release key
agent-browser hover <sel>             # Hover element
agent-browser focus <sel>             # Focus element
agent-browser select <sel> <val>      # Select dropdown option
agent-browser check <sel>             # Check checkbox
agent-browser uncheck <sel>           # Uncheck checkbox
agent-browser scroll <dir> [px]       # Scroll (up/down/left/right, --selector <sel>)
agent-browser scrollintoview <sel>    # Scroll element into view
agent-browser drag <src> <dst>        # Drag and drop
agent-browser upload <sel> <files>    # Upload files
agent-browser screenshot [path]       # Screenshot (--full for full page)
agent-browser screenshot --annotate   # Annotated screenshot with numbered element labels
agent-browser screenshot --screenshot-dir ./shots    # Save to custom directory
agent-browser screenshot --screenshot-format jpeg --screenshot-quality 80
agent-browser pdf <path>              # Save page as PDF
agent-browser snapshot                # Accessibility tree with refs
agent-browser eval <js>               # Run JavaScript
agent-browser connect ​​port|url​​      # Connect to browser via CDP
agent-browser close                   # Close browser (aliases: quit, exit)
```

이외에도 매우 많은 명령어가 준비되어 있고, [여기](https://agent-browser.dev/commands)에서 명령어를 참고할 수 있다.

### 에이전트에게 스킬 가르치기

에이전트 스킬이란, 특정 상황에 사용에 에이전트가 사용할 수 있는 지침을 의미한다. 예를 들어 문제 풀이 전용 에이전트가 있다고 가정하면, 에이전트에게 수학 문제에 대한 질문이 들어오면, 수학 문제 풀이 전용 스킬이 발동되어 답변에 좀 더 세부적이고 자세하게 적는다거나, 적힌 지치메 따라서 아예 다른 일을 하게끔 할 수 있다.

```sh
npx skills add vercel-labs/agent-browser
```

스킬 설치시 원하는 스킬을 선택하여 각 코딩 에이전트 플랫폼이 지원하는 디렉터리에 SKILL과 관련된 지침 파일이 자동으로 생성된다. 이후 에이전트에게 "이 오류 고치고, agent-browser를 통해서 실제로 오류가 고쳐졌는지까지 확인해줘." 라고 프롬프트를 입력하면 해당 스킬을 사용하여 명령을 수행하는 것을 볼 수 있다.
