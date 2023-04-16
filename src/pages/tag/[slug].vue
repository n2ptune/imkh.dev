<script lang="ts" setup>
import { useHeadSafe } from 'unhead'

definePageMeta({
  layout: 'list-layout'
})

const { params } = useRoute()

useHeadSafe({
  title: `Tag (${params.slug})`
})
</script>

<template>
  <section class="w-full">
    <section class="mb-24 text-3xl font-black">
      Tags
      <span class="mx-2 text-gray-200 font-light dark:text-gray-700">/</span>
      {{ params.slug }}
    </section>
    <PostList :tag="(params.slug as string)" />
  </section>
</template>
