<script lang="ts" setup>
import { usePostAction } from '~~/hooks/post'
import { usePageStore } from '~~/store/page'

definePageMeta({
  layout: 'list-layout'
})

const { loadMore, setDelay } = usePostAction()
const pageStore = usePageStore()

function onPostLoadMore() {
  if (!pageStore.canLoadPage) return
  loadMore()
  setDelay()
}
</script>

<template>
  <section class="w-full">
    <Suspense>
      <template #fallback>
        <PostListLoadingPlaceholder />
      </template>
      <PostList @load-more="onPostLoadMore" />
    </Suspense>
  </section>
</template>
