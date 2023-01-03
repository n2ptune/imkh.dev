<template>
  <div>
    <ContentRenderer v-if="post" :value="post" />
  </div>
</template>

<script lang="ts" setup>
import { useContentByPath } from '../lib/content'

definePageMeta({ layout: 'post-layout' })

const post = useContentByPath()
</script>
