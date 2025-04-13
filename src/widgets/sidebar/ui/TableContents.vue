<script setup lang="ts">
import { usePost } from '~/entities/post'

const { data } = usePost()
const toc = computed(() => {
  if (!data.value) return null

  return data.value.body.toc?.links || []
})
</script>

<template>
  <div v-if="toc">
    {{ toc }}
  </div>
</template>
