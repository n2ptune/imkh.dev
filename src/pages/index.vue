<script lang="ts" setup>
import { usePostAction } from '~~/hooks/post'
import { usePageStore } from '~~/store/page'
// 2
definePageMeta({
  layout: 'list-layout'
})

useSeoMeta({
  title: 'Home',
  description: '프론트엔드 개발자의 개발 블로그',
  ogTitle: () => withTitleTemplate('Home'),
  ogDescription: '프론트엔드 개발자의 개발 블로그',
  ogUrl: 'https://imkh.dev'
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
