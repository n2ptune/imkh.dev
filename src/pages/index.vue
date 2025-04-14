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
</script>

<template>
  <SortTabs v-model="sortTabIndex" class="mb-12" />

  <PostGrid>
    <PostCard v-for="post in sortedData" :key="post.id" :post="post" />
  </PostGrid>
</template>
