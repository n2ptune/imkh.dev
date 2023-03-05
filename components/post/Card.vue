<script lang="ts" setup>
import { ParsedContent } from '@nuxt/content/dist/runtime/types'
import dayjs from 'dayjs'

interface Props {
  post: Pick<ParsedContent, string>
}

const props = defineProps<Props>()
const goRoutePath = computed(() =>
  (props.post._path as string).replace('/posts', '')
)
const dateFormat = computed(() => dayjs(props.post.date).format('LLL'))
</script>

<template>
  <NuxtLink :to="goRoutePath">
    <div class="min-h-[300px] rounded-lg cursor-pointer space-y-4">
      <div v-if="props.post.cover_image">
        <img
          :src="props.post.cover_image"
          :alt="props.post.cover_image"
          class="transition-transform duration-100 hover:-translate-y-1 object-cover rounded-lg max-h-[150px] w-full"
        />
      </div>
      <div class="space-y-2">
        <div class="text-xs font-light text-slate-700 dark:text-gray-400">
          {{ dateFormat }}
        </div>
        <div class="text-xl font-bold">
          {{ props.post.title }}
        </div>
        <div class="text-base">
          {{ props.post.description }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
