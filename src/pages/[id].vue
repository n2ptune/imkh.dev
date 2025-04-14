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
    class="prose prose-zinc dark:prose-invert prose-pre:bg-neutral-50 dark:prose-pre:bg-neutral-950 prose-headings:prose-a:no-underline prose-headings:prose-a:hover:underline prose-headings:before:content-[''] prose-headings:before:block prose-headings:before:h-32 prose-headings:before:-mt-32 prose-headings:before:invisible max-w-full prose-p:prose-code:before:content-[''] prose-p:prose-code:after:content-['']"
  />
</template>
