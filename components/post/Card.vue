<script lang="ts" setup>
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface Props {
  post: Pick<ParsedContent, string>
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    {{ props.post.title }}
  </div>
</template>
