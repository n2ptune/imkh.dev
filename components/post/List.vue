<script lang="ts" setup>
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface Props {
  posts: Pick<ParsedContent, string>[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="">
    <PostCard v-for="post in props.posts" :key="post._id" :post="post" />
  </div>
</template>
