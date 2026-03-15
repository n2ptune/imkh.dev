<script setup lang="ts">
import { ShortContent, useShort } from '~/entities/short'

const { data, error } = useShort()

watch(
  () => error.value,
  err => {
    if (err) throw new Error('error while get short collection')
  }
)

definePageMeta({
  layout: 'short'
})

const route = useRoute()
const shortUrl = computed(() => `https://imkh.dev/s/${route.params.id}`)

useHead({
  link: [
    {
      rel: 'canonical',
      href: () => shortUrl.value
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => {
        if (!data.value) return null
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Note',
          headline: data.value.title,
          description: data.value.description,
          datePublished: data.value.date,
          author: {
            '@type': 'Person',
            name: 'n2ptune'
          },
          url: shortUrl.value
        })
      })
    }
  ]
})

useServerSeoMeta({
  title: () => data.value?.title || '메모',
  ogTitle: () => data.value?.title || 'imkh.dev 메모',
  description: () => data.value?.description || '짧은 생각과 메모',
  ogDescription: () => data.value?.description || '짧은 생각과 메모',
  ogType: 'article',
  ogUrl: () => shortUrl.value,
  twitterCard: 'summary'
})
</script>

<template>
  <ShortContent v-if="data" :data="data" />
</template>
