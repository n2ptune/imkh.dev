<script lang="ts" setup>
definePageMeta({
  layout: 'list-layout'
})

useSeoMeta({
  title: 'Home',
  description: '프론트엔드 개발자의 개발 블로그',
  ogTitle: () => withTitleTemplate('Home'),
  ogDescription: '프론트엔드 개발자의 개발 블로그',
  ogUrl: 'https://imkh.dev'
})

const { data: posts } = await useAsyncData(() => queryCollection('post').all())
</script>

<template>
  <section class="w-full">
    <PostList v-if="posts" :posts="posts" />
  </section>
</template>
