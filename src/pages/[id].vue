<script setup lang="ts">
import { usePost } from '~/entities/post'

const { data } = usePost()

definePageMeta({
  layout: 'post'
})
</script>

<template>
  <ContentRenderer
    v-if="data"
    :value="data"
    class="prose prose-zinc dark:prose-invert"
  />
</template>
