<script setup lang="ts">
import { usePost } from '~/entities/post'

const route = useRoute()
const { data } = usePost(route.params.id as string)

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
