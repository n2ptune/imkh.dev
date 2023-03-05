<script lang="ts" setup>
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface Props {
  posts: Pick<ParsedContent, string>[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 gap-y-24 lg:grid-cols-3 lg:gap-12">
    <PostCard v-for="post in props.posts" :key="post._id" :post="post" />
  </div>
</template>
