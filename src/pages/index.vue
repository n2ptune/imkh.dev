<script setup lang="ts">
import { PostCard, PostGrid, SortTabs, usePosts } from '~/entities/post'
import type { SortOption } from '~/shared/types'

const sortTabIndex = ref('0')
const sortOptionByTabIndex = computed(() => {
  return ({
    '0': 'latest',
    '1': 'name'
  }[sortTabIndex.value] || 'latest') as SortOption
})
const { sortedData, changeSort } = usePosts()

watch(
  () => sortOptionByTabIndex.value,
  sortOption => {
    changeSort(sortOption)
  }
)

useServerSeoMeta({
  title: '홈',
  ogTitle: 'imkh.dev - 포스트',
  description: '개발 지식과 경험을 공유하는 개인 기술 블로그입니다.',
  ogDescription: '개발 지식과 경험을 공유하는 개인 기술 블로그입니다.',
  ogUrl: 'https://imkh.dev',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <SortTabs v-model="sortTabIndex" class="mb-12" />

  <PostGrid>
    <PostCard v-for="post in sortedData" :key="post.id" :post="post" />
  </PostGrid>
</template>
