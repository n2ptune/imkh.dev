<script lang="ts" setup>
import { usePost } from '~~/hooks/post'

definePageMeta({
  layout: 'list-layout'
})

const { postsWithPaging, allLoaded, loadMore } = await usePost()
</script>

<template>
  <section class="w-full">
    <PostList :posts="(postsWithPaging as any[])" />
    <button v-if="!allLoaded" @click="loadMore">load more</button>
  </section>
</template>
