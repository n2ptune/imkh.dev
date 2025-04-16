<script setup lang="ts">
import { usePost } from '~/entities/post'
import { ContentRender } from '~/features/content-render'
import { usePostSeo } from '~/widgets/seo'

const { data } = usePost()
usePostSeo()

definePageMeta({
  layout: 'post'
})
</script>

<template>
  <ContentRender :data="data" />
</template>
