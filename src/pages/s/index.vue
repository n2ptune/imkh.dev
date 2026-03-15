<script setup lang="ts">
import { ShortContent, useShorts } from '~/entities/short'

definePageMeta({
  layout: 'short'
})

useServerSeoMeta({
  title: '메모',
  ogTitle: 'imkh.dev - 짧은 생각과 메모',
  description: '개발 과정에서 배운 것들과 짧은 생각들을 기록하는 공간입니다.',
  ogDescription: '개발 과정에서 배운 것들과 짧은 생각들을 기록하는 공간입니다.',
  ogUrl: 'https://imkh.dev/s',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

const { data: shorts } = useShorts()
</script>

<template>
  <article class="space-y-12">
    <ShortContent
      v-for="(short, index) in shorts"
      :data="short"
      :has-divider="shorts.length - 1 !== index"
      class="col-span-1"
    />
  </article>
</template>
