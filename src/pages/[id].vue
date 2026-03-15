<script setup lang="ts">
import { usePost } from '~/entities/post'
import { ContentRender, OutdatedAlert } from '~/features/content-render'
import { InPostAd } from '~/widgets/ad'
import { PostSummary } from '~/widgets/sidebar'
import { SkeletonBlock } from '~/widgets/loading'
import { useDayjs } from '~/shared/composables/useDayjs'

const { data, status } = usePost()
const dayjs = useDayjs()

const isOutdated = computed(() => {
  if (!data.value?.date) return false
  return dayjs().diff(dayjs(data.value.date), 'year') >= 3
})

definePageMeta({
  layout: 'post'
})

useHead({
  title: () => (data.value ? `${data.value.title} | imkh.dev` : '로딩 중...'),
  meta: [
    {
      name: 'description',
      content: () => data.value?.description || '포스트 상세 페이지'
    }
  ]
})
</script>

<template>
  <div v-if="status === 'pending'">
    <!-- 포스트 로딩 스켈레톤 -->
    <div
      class="space-y-6 pb-12 mb-12 border-b border-neutral-100 dark:border-neutral-800"
    >
      <SkeletonBlock class="w-3/4 h-12" />
      <div class="flex gap-4">
        <SkeletonBlock class="w-32 h-6" />
        <SkeletonBlock class="w-48 h-6" />
      </div>
    </div>
    <div class="space-y-4">
      <SkeletonBlock class="w-full h-4" />
      <SkeletonBlock class="w-full h-4" />
      <SkeletonBlock class="w-5/6 h-4" />
      <SkeletonBlock class="w-full h-4" />
      <SkeletonBlock class="w-4/5 h-4" />
      <SkeletonBlock class="w-3/4 h-4" />
    </div>
  </div>

  <div v-else-if="data" class="max-w-none prose dark:prose-invert">
    <!-- 1. 본문 상단 헤더 (제목, 날짜, 태그 등) -->
    <PostSummary />

    <!-- 2. 오래된 포스트 알림 (있는 경우) -->
    <OutdatedAlert v-if="isOutdated" :date="data.date" class="mb-8" />

    <!-- 3. 메인 콘텐츠 -->
    <ContentRender :data="data" />

    <InPostAd place="bottom" />
  </div>

  <div v-else class="py-20 text-center text-neutral-500">
    포스트를 찾을 수 없습니다.
  </div>
</template>

<style scoped>
/* 본문 폰트 및 가독성 최적화 */
:deep(.prose) {
  max-width: none;
  line-height: 1.8;
  font-size: 1.05rem;
}
</style>
