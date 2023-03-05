<script lang="ts" setup>
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface Props {
  content: ParsedContent
}

const props = defineProps<Props>()
</script>

<template>
  <section
    class="relative prose lg:prose-lg dark:prose-invert mx-auto prose-pre:bg-gray-50 dark:prose-pre:bg-black prose-pre:!rounded-lg"
  >
    <ContentRenderer :value="props.content" />
  </section>
</template>
