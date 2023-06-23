<script lang="ts" setup>
definePageMeta({
  layout: 'post-layout'
})
</script>

<template>
  <Suspense>
    <template #fallback>
      <PostLoadingPlaceholder />
    </template>
    <PostAsyncWrapper />
  </Suspense>
</template>
