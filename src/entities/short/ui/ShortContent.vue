<script setup lang="ts">
import type { ShortCollectionItem } from '@nuxt/content'
import { ContentRender } from '~/features/content-render'
import ShortSummary from './ShortSummary.vue'
import { TypeDivider } from '~/widgets/divider'

interface Props {
  data: ShortCollectionItem
  hasDivider?: boolean
}

const { data, hasDivider = false } = defineProps<Props>()
</script>

<template>
  <ShortSummary :data="data" class="mb-12" />

  <ContentRender :data="data" />

  <TypeDivider v-if="hasDivider" type="horizontal" class="my-24" />
</template>
