<script lang="ts" setup>
definePageMeta({
  layout: 'list-layout'
})

const __PAGE_SIZE__ = 12
const __INDEX_POSTS_PROPS__ = [
  'cover_image',
  'date',
  'description',
  'published',
  'tags',
  'title',
  '_path'
]

const { data } = await useAsyncData('getPosts', () =>
  queryContent('posts').only(__INDEX_POSTS_PROPS__).sort({ date: -1 }).find()
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
