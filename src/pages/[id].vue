<script setup lang="ts">
import { usePost } from '~/entities/post'
import { ContentRender, OutdatedAlert } from '~/features/content-render'
import { InPostAd } from '~/widgets/ad'
import { PostSummary } from '~/widgets/sidebar'

const { data, status } = usePost()

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
  <div v-if="status === 'pending'" class="py-20">
    <!-- 로딩 상태 UI (필요시 추가) -->
  </div>

  <div v-else-if="data" class="max-w-none prose dark:prose-invert">
    <!-- 1. 본문 상단 헤더 (제목, 날짜, 태그 등) -->
    <PostSummary />

    <!-- 2. 오래된 포스트 알림 (있는 경우) -->
    <OutdatedAlert class="mb-8" />

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
