<script setup lang="ts">
import { usePost } from '~/entities/post'
import { ContentRender } from '~/features/content-render'
import { InPostAd } from '~/widgets/ad'
import { TypeDivider } from '~/widgets/divider'
import { usePostSeo } from '~/widgets/seo'
import { PostSummary } from '~/widgets/sidebar'

const { data } = usePost()

usePostSeo()

definePageMeta({
  layout: 'post'
})

useHead({
  title: () => data.value?.title
})
</script>

<template>
  <ClientOnly>
    <section class="px-4 xl:px-8">
      <InPostAd place="top" />
    </section>
  </ClientOnly>

  <PostSummary class="block xl:hidden" />

  <TypeDivider class="block xl:hidden my-12" type="horizontal" />

  <ContentRender :data="data" />
</template>
