<script setup lang="ts">
import type { DividerType } from '../model/type'

interface Props {
  type?: DividerType
}

const { type = 'horizontal' } = defineProps<Props>()
const typeClass = computed(() => {
  return type === 'horizontal' ? 'h-px w-full' : 'w-px h-full'
})
</script>

<template>
  <div class="bg-neutral-200 dark:bg-neutral-800" :class="typeClass"></div>
</template>
