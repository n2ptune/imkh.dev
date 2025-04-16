<script setup lang="ts">
import { Comment } from '~/entities/comment'
import type { CustomPostCollectionItem } from '~/shared/types'

interface Props {
  data: CustomPostCollectionItem | null
}

const { data } = defineProps<Props>()
</script>

<template>
  <ContentRenderer
    v-if="data"
    :value="data"
    class="prose prose-zinc dark:prose-invert prose-pre:bg-neutral-50 prose-pre:dark:bg-neutral-950 prose-headings:prose-a:no-underline prose-headings:prose-a:hover:underline prose-headings:before:content-[''] prose-headings:before:block prose-headings:before:h-32 prose-headings:before:-mt-32 prose-headings:before:invisible max-w-full prose-p:prose-code:before:content-[''] prose-p:prose-code:after:content-[''] prose-img:ml-auto prose-img:mr-auto"
  />

  <ClientOnly>
    <Comment />
  </ClientOnly>
</template>
