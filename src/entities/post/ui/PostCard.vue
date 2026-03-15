<script setup lang="ts">
import type { PostCollectionItem } from '@nuxt/content'
import { LazyImage, ThumbnailPlaceholder } from '~/entities/image'
import { TagGroup } from '~/entities/tag'
import { truncate } from '~/shared/utils'
import { useDayjs } from '~/shared/composables/useDayjs'

interface Props {
  post: PostCollectionItem
}

const { post } = defineProps<Props>()
const dayjs = useDayjs()

const formattedDate = computed(() => {
  if (!post.date) return ''
  return dayjs(post.date).format('YYYY년 MM월 DD일')
})

function onClickCard() {
  return navigateTo({
    name: 'id',
    params: {
      id: post.stem
    }
  })
}
</script>

<template>
  <article
    class="group flex flex-col h-full cursor-pointer transition-all duration-300"
    @click="onClickCard"
  >
    <!-- 썸네일 영역 -->
    <div
      class="relative overflow-hidden rounded-2xl mb-4 aspect-video bg-neutral-100 dark:bg-neutral-800"
    >
      <div
        class="w-full h-full transition-transform duration-500 group-hover:scale-105"
      >
        <LazyImage v-if="post.cover_image" :image="post.cover_image" />
        <ThumbnailPlaceholder v-else :post="post" />
      </div>
      
      <!-- 호버 시 나타나는 오버레이 (선택사항) -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
    </div>

    <!-- 컨텐츠 영역 -->
    <div class="flex flex-col flex-grow px-1">
      <!-- 상단 메타 (태그 & 날짜) -->
      <div class="flex items-center justify-between mb-3">
        <TagGroup :tags="post.tags" />
        <span class="text-[13px] text-neutral-400 dark:text-neutral-500 font-medium">
          {{ formattedDate }}
        </span>
      </div>

      <!-- 제목 -->
      <h2
        class="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-50 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200"
      >
        {{ truncate(post.title, 50, true) }}
      </h2>

      <!-- 설명 -->
      <p
        class="text-[15px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4"
      >
        {{ post.description }}
      </p>
    </div>
  </article>
</template>

<style scoped>
/* 추가적인 미세 조정이 필요한 경우 */
</style>
