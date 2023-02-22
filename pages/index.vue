<script lang="ts" setup>
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

definePageMeta({
  layout: 'list-layout'
})

const postSkip = ref(0)
const query = queryContent('posts')
const posts = ref<Pick<ParsedContent, string>[]>([])

async function getPosts() {
  const queryPosts = await query
    .limit(10)
    .skip(postSkip.value)
    .only(['title', 'id', 'excerpt'])
    .sort({ created_at: -1 })
    .find()
  posts.value = queryPosts
}

getPosts()
</script>

<template>
  <section class="w-full">
    <PostList :posts="posts" />
  </section>
</template>
