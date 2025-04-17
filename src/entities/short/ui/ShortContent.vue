<script setup lang="ts">
import type { ShortCollectionItem } from '@nuxt/content'
import { ContentRender } from '~/features/content-render'
import ShortSummary from './ShortSummary.vue'

interface Props {
  data: ShortCollectionItem
}

const { data } = defineProps<Props>()
</script>

<template>
  <ShortSummary :data="data" class="mb-12" />

  <ContentRender :data="data" />
</template>
