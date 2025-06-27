<template>
  <UAlert
    color="error"
    variant="subtle"
    title="주의가 필요합니다."
    icon="i-mdi-alert-circle-outline"
    :description="description"
  />
</template>

<script setup lang="ts">
interface Props {
  date?: string
}

const { date = '' } = defineProps<Props>()
const description = computed(() => {
  if (date) {
    return `해당 게시글은 ${date}에 작성된 게시글입니다. 현재까지 많은 시간이 흘렀으므로 지금은 올바른 정보가 아닐 수 있습니다.`
  } else {
    return '해당 게시을은 작성된지 오래됬으므로 지금은 올바른 정보가 아닐 수 있습니다.'
  }
})
</script>
