<script lang="ts" setup>
definePageMeta({
  layout: 'post-layout'
})
</script>

<template>
  <!-- 여기 Suspense 감싸는 걸로 바꿔야함 하위 모든 컴포넌트를 감싸는 wrapper 컴포넌트 필요 -->
  <Suspense>
    <template #fallback>
      <PostLoadingPlaceholder />
    </template>
    <PostAsyncWrapper />
  </Suspense>
</template>
