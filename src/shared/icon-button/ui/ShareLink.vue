<script lang="ts" setup>
import Wrapper from './Wrapper.vue'

const { copy } = useClipboard()

interface Props {
  link: string
}

const { link } = defineProps<Props>()
</script>

<template>
  <Wrapper cursor-pointer @click="copy(link)">
    <Icon name="i-tabler-flag-filled" class="text-2xl" />
  </Wrapper>
</template>
