<script lang="ts" setup>
import type { PostCollectionItem } from '@nuxt/content'

interface Props {
  posts: PostCollectionItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 gap-y-24 lg:grid-cols-3 lg:gap-12 lg:gap-y-24">
    <PostCard v-for="post in props.posts" :key="post._id" :post="post" />
  </div>
</template>
