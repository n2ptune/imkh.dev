<script lang="ts" setup>
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface Props {
  content: ParsedContent
}

const props = defineProps<Props>()
</script>

<template>
  <section class="relative prose lg:prose-lg prose-invert mx-auto">
    <ContentRenderer :value="props.content" />
  </section>
</template>
