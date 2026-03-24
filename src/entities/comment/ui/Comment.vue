<script lang="ts" setup>
const colorMode = useColorMode()

// 테마가 변경될 때 컴포넌트 전체를 다시 그리기 위해 key를 사용합니다.
const commentContainer = ref<HTMLElement | null>(null)

const renderUtterances = () => {
  if (!commentContainer.value) return

  // 기존 스크립트/아이프레임 제거 (재렌더링 시 중복 방지)
  commentContainer.value.innerHTML = ''

  const script = document.createElement('script')
  const theme = colorMode.value === 'dark' ? 'github-dark' : 'github-light'

  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.setAttribute('repo', 'n2ptune/imkh.dev')
  script.setAttribute('issue-term', 'pathname')
  script.setAttribute('theme', theme)
  script.setAttribute('crossorigin', 'anonymous')

  commentContainer.value.appendChild(script)
}

// 테마나 경로가 바뀔 때마다 다시 렌더링
onMounted(() => {
  renderUtterances()
})

watch(
  () => colorMode.value,
  () => {
    renderUtterances()
  }
)
</script>

<template>
  <div class="utterances-wrapper mt-12 px-4 md:px-0">
    <!-- utterances script가 이 안에 iframe을 생성합니다 -->
    <div ref="commentContainer" class="utterances-container" />
  </div>
</template>

<style lang="postcss">
.utterances {
  max-width: 100% !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.utterances-frame {
  margin: 0 !important;
}
</style>
