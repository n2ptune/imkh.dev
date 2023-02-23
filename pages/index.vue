<script lang="ts" setup>
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

definePageMeta({
  layout: 'list-layout'
})

const __PAGE_SIZE__ = 10

const { data } = await useAsyncData('getPosts', () =>
  queryContent('posts')
    .only(['title', 'id', 'excerpt', 'date'])
    .sort({ date: -1 })
    .find()
)

const currentPage = ref(0)
const posts = computed(() => {
  const start = 0
  const end = currentPage.value * __PAGE_SIZE__ + __PAGE_SIZE__
  return data.value?.slice(start, end)
})
const allLoaded = computed(() => {
  if (!data.value) return false

  return data.value.length / __PAGE_SIZE__ - 1 <= currentPage.value
})

function getPosts() {
  if (allLoaded.value) return
  currentPage.value++
}
</script>

<template>
  <section class="w-full">
    <PostList :posts="(posts as any[])" />
    <button v-if="!allLoaded" @click="getPosts">load more</button>
  </section>
</template>
