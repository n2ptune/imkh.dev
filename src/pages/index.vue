<script lang="ts" setup>
import type { SortOption } from '~/types/post'

definePageMeta({
  layout: 'list-layout'
})

useSeoMeta({
  title: 'Home',
  description: '프론트엔드 개발자의 개발 블로그',
  ogTitle: () => withTitleTemplate('Home'),
  ogDescription: '프론트엔드 개발자의 개발 블로그',
  ogUrl: 'https://imkh.dev'
})

const { data: posts } = await useAsyncData(() => queryCollection('post').all())
const sortOption = ref<SortOption>('newer')
const sortedPosts = computed(() => {
  const copy = posts.value?.slice(0) || []
  
  if (sortOption.value === 'newer') {
    copy.sort((a, b) => {
      const ad = a.meta.date as string
      const bd = b.meta.date as string

      return new Date(bd).getTime() - new Date(ad).getTime()
    })
  } else if (sortOption.value === 'older') {
    copy.sort((a, b) => {
      const ad = a.meta.date as string
      const bd = b.meta.date as string

      return new Date(ad).getTime() - new Date(bd).getTime()
    })
  }

  return copy
})

function onChangeSort(sort: SortOption) {
  sortOption.value = sort
}
</script>

<template>
  <section class="w-full">
    <PostSortedTab v-model="sortOption" @sort="onChangeSort" />
    <PostList v-if="posts" :posts="sortedPosts" />
  </section>
</template>
