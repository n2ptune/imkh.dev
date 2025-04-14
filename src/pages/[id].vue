<script setup lang="ts">
import { usePost } from '~/entities/post'
import { ContentRender } from '~/features/content-render'

const { data } = usePost()

definePageMeta({
  layout: 'post'
})
</script>

<template>
  <ContentRender :data="data" />
</template>
