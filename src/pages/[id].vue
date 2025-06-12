<script setup lang="ts">
import { usePost } from '~/entities/post'
import { ContentRender } from '~/features/content-render'
import { InPostAd } from '~/widgets/ad'
import { TypeDivider } from '~/widgets/divider'
import { LoadingShield, SkeletonBlock } from '~/widgets/loading'
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

  <LoadingShield :condition="!!data">
    <ContentRender :data="data" />

    <template #loading>
      <div class="space-y-16">
        <div class="space-y-2">
          <SkeletonBlock class="w-full h-[30px]" />
          <SkeletonBlock class="ml-8 h-[30px]" />
          <SkeletonBlock class="w-[calc(100%-120px)] h-[30px]" />
          <SkeletonBlock class="mr-8 h-[30px]" />
        </div>
        <div class="space-y-2">
          <SkeletonBlock class="w-full h-[30px]" />
          <SkeletonBlock class="mr-8 h-[30px]" />
          <SkeletonBlock class="w-[calc(100%-40px)] h-[30px]" />
          <SkeletonBlock class="ml-8 h-[30px]" />
        </div>
      </div>
    </template>
  </LoadingShield>
</template>
