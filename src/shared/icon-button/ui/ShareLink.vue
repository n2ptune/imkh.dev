<script lang="ts" setup>
import Wrapper from './Wrapper.vue'

const { copy } = useClipboard()

interface Props {
  link: string
}

const { link } = defineProps<Props>()
const timeout = ref<ReturnType<typeof setTimeout> | null>(null)

const runTimeout = () => {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
  timeout.value = setTimeout(() => {
    timeout.value = null
  }, 10000)
}

const onClickShareLink = () => {
  copy(link)
  runTimeout()
}
</script>

<template>
  <Wrapper
    tooltip
    tooltip-text="링크 공유하기"
    cursor-pointer
    @click="onClickShareLink"
  >
    <Icon
      :data-state="timeout && 'copied'"
      name="i-tabler-flag-filled"
      class="text-2xl hover:text-green-500 data-[state=copied]:text-green-500 transition-colors duration-300"
    />
  </Wrapper>
</template>
