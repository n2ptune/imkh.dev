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
    class="prose prose-zinc dark:prose-invert prose-pre:bg-neutral-50 dark:prose-pre:bg-neutral-950 prose-headings:prose-a:no-underline prose-headings:prose-a:hover:underline"
  />
</template>
