<script lang="ts" setup>
import type { PostCollectionItem } from '@nuxt/content'

interface Props {
  posts: PostCollectionItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="grid grid-cols-1 gap-y-24 md:grid-cols-2 md:gap-8 md:gap-y-8 xl:grid-cols-4 xl:gap-4 xl:gap-y-8"
  >
    <PostCard v-for="post in props.posts" :key="post.id" :post="post" />
  </div>
</template>
