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

useHead({
  title: () => data.value?.title,
  meta: [{ name: 'description', content: data.value?.description }]
})
</script>

<template>
  <ShortContent v-if="data" :data="data" />
</template>
