<template>
  <div>{{ data }}</div>
</template>

<script lang="ts" setup>
import { getMarkdown } from '../lib/file'

const route = useRoute()

const { data, pending } = useAsyncData('getMarkdown', () =>
  getMarkdown(route.path)
)
</script>
