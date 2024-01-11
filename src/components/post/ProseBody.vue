<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface Props {
  content: ParsedContent
}

const props = defineProps<Props>()
</script>

<template>
  <section
    class="break-words break relative prose lg:prose-lg dark:prose-invert mx-auto prose-pre:bg-gray-50 dark:prose-pre:bg-black prose-pre:!rounded-lg prose-img:mx-auto prose-img:rounded"
  >
    <ContentRenderer :value="props.content" />
    <PostToc :toc="props.content.body!.toc" />
  </section>
</template>

<style lang="postcss" scoped>
.prose {
  :deep() {
    code {
      &::before,
      &::after {
        content: '';
      }
    }
  }
}
</style>
