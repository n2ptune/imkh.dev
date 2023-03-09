<script lang="ts" setup>
import { usePost } from '~~/hooks/post'
import { usePageStore } from '~~/store/page'

definePageMeta({
  layout: 'list-layout'
})

const { postsWithPaging, allLoaded, loadMore, setDelay } = await usePost()
const pageStore = usePageStore()

function onPostLoadMore() {
  if (!pageStore.canLoadPage) return
  loadMore()
  setDelay()
}
</script>

<template>
  <section class="w-full">
    <PostList
      :all-loaded="allLoaded"
      :posts="(postsWithPaging as any[])"
      @load-more="onPostLoadMore"
    />
  </section>
</template>
