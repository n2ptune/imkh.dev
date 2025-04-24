<script setup lang="ts">
import { ShortContent, useShorts } from '~/entities/short'

definePageMeta({
  layout: 'short'
})

useHead({
  title: '홈 - 메모',
  meta: [{ name: 'description', content: '짧은 글, 메모 리스트' }]
})

const { data: shorts } = useShorts()
</script>

<template>
  <article class="space-y-12">
    <ShortContent
      v-for="(short, index) in shorts"
      :key="short.id"
      :data="short"
      :has-divider="shorts.length - 1 !== index"
      class="col-span-1"
    />
  </article>
</template>
