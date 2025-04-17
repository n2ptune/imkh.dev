<script setup lang="ts">
import type { ShortCollectionItem } from '@nuxt/content'
import { TagGroup } from '~/entities/tag';

interface Props {
  data: ShortCollectionItem
}

const { data } = defineProps<Props>()
const dayjs = useDayjs()
</script>

<template>
  <div class="space-y-2">
    <TagGroup :tags="data.tags" class="mb-4" />
    
    <h1 class="text-4xl font-bold">{{ data.title }}</h1>
    <p class="text-base text-neutral-500 dark:text-neutral-400">
      <span>{{ data.description }}</span>
      <span v-if="data.description" class="mx-2 text-neutral-300 dark:text-neutral-600">|</span>
      <span>{{ dayjs().to(data.date) }}</span>
    </p>
  </div>
</template>
