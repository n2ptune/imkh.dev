<script lang="ts" setup>
const colorMode = useColorMode()
const themeValue = computed(() => colorMode.value)

watch(
  () => themeValue.value,
  value => {
    const iframe = document.querySelector('.utterances-frame')

    if (iframe) {
      ;(iframe as HTMLIFrameElement).contentWindow?.postMessage(
        {
          type: 'set-theme',
          theme: 'github-' + value
        },
        'https://utteranc.es'
      )
    }
  }
)
</script>

<template>
  <component
    is="script"
    repo="n2ptune/imkh.dev"
    issue-term="pathname"
    crossorigin="anonymous"
    :theme="`github-${$colorMode.value}`"
    async
    src="https://utteranc.es/client.js"
  />
</template>

<style lang="postcss">
.utterances {
  margin-top: calc(var(--spacing) * 12);

  &-frame {
    margin: 0 calc(var(--spacing) * 10);
  }
}
</style>
