<script setup lang="ts">
import { usePost } from '~/entities/post'
import { TagGroup } from '~/entities/tag'
import { ShareLink, LikePost } from '~/shared/icon-button'
import { LoadingShield, SkeletonBlock } from '~/widgets/loading'

const { data } = usePost()
const dayjs = useDayjs()

const formattedDate = computed(() => {
  if (!data.value?.date) return '알 수 없음'
  return dayjs(data.value.date).format('YYYY년 MM월 DD일')
})

const relativeDate = computed(() => {
  if (!data.value?.date) return ''
  return dayjs().to(dayjs(data.value.date))
})

const link = computed(() => {
  if (!data.value) return ''
  return `https://imkh.dev${data.value.path}`
})
</script>

<template>
  <LoadingShield :condition="!!data">
    <header
      class="space-y-6 pb-12 mb-12 border-b border-neutral-100 dark:border-neutral-800"
    >
      <!-- 포스트 제목 -->
      <h1
        class="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight"
      >
        {{ data?.title }}
      </h1>

      <!-- 메타 정보 (날짜, 태그, 액션) -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div
          class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400"
        >
          <!-- 날짜 -->
          <div class="flex items-center gap-2" :title="formattedDate">
            <Icon name="i-tabler-calendar" class="text-lg" />
            <span class="font-medium">{{ relativeDate }}</span>
          </div>

          <!-- 태그 -->
          <div class="flex items-center gap-2">
            <Icon name="i-tabler-tags" class="text-lg" />
            <TagGroup :tags="data?.tags || []" />
          </div>
        </div>

        <!-- 소셜 액션 -->
        <div class="flex items-center gap-2">
          <ShareLink :link="link" />
          <LikePost />
        </div>
      </div>
    </header>

    <template #loading>
      <div class="space-y-4 pb-12 mb-12">
        <SkeletonBlock class="w-3/4 h-12" />
        <div class="flex gap-4">
          <SkeletonBlock class="w-32 h-6" />
          <SkeletonBlock class="w-48 h-6" />
        </div>
      </div>
    </template>
  </LoadingShield>
</template>
