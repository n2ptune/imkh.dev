<script lang="ts" setup>
import { usePostAction } from '~~/hooks/post'
import { usePageStore } from '~~/store/page'

definePageMeta({
  layout: 'list-layout'
})

useHeadSafe({
  title: 'Home',
  meta: [
    {
      property: 'og:title',
      content: 'Home | imkh.dev'
    },
    {
      property: 'og:description',
      content: '프론트엔드 개발자의 개발 블로그'
    },
    {
      property: 'description',
      content: '프론트엔드 개발자의 개발 블로그'
    },
    {
      property: 'og:url',
      content: 'https://imkh.dev'
    }
  ]
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
