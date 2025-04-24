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

useHead({
  title: '홈 - 포스트',
  meta: [{ name: 'description', content: '긴 글, 포스트 리스트' }]
})
</script>

<template>
  <SortTabs v-model="sortTabIndex" class="mb-12" />

  <PostGrid>
    <PostCard v-for="post in sortedData" :key="post.id" :post="post" />
  </PostGrid>
</template>
