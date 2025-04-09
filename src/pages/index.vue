<script setup lang="ts">
import { PostCard, PostGrid, usePosts } from '~/entities/post'

const { sortedData } = usePosts()
</script>

<template>
  <PostGrid>
    <PostCard v-for="post in sortedData" :key="post.id" :post="post" />
  </PostGrid>
</template>
