<script lang="ts" setup>
import { usePost, __INDEX_POSTS_PROPS__ } from '@/hooks/post'

definePageMeta({
  layout: 'list-layout'
})

const { params } = useRoute()
// const { data } = await useAsyncData('getPostsByTag', async () =>
//   queryContent('posts')
//     .only(__INDEX_POSTS_PROPS__)
//     .where({ tags: { $in: [params.slug as string] } })
//     .sort({ date: -1 })
//     .find()
// )
const { posts } = await usePost(params.slug as string)
</script>

<template>
  <section class="w-full">
    <section class="mb-24 text-3xl font-black">
      Tags
      <span class="mx-2 text-gray-200 font-light dark:text-gray-700">/</span>
      {{ params.slug }}
    </section>
    <PostList all-loaded :posts="(posts as any[])" />
  </section>
</template>
