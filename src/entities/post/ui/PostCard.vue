<script setup lang="ts">
import type { PostCollectionItem } from '@nuxt/content'
import { LazyImage, ThumbnailPlaceholder } from '~/entities/image'
import { TagGroup } from '~/entities/tag'
import { truncate } from '~/shared/utils'

interface Props {
  post: PostCollectionItem
}

const { post } = defineProps<Props>()

function onClickCard() {
  return navigateTo({
    name: 'id',
    params: {
      id: post.stem
    }
  })
}
</script>

<template>
  <div
    class="group min-h-[400px] max-h-[400px] rounded-lg cursor-pointer space-y-2 transition-transform will-change-transform hover:-translate-y-1.5 duration-300"
    @click="onClickCard"
  >
    <LazyImage v-if="post.cover_image" :image="post.cover_image" />
    <ThumbnailPlaceholder v-else />

    <TagGroup :tags="post.tags" class="!mt-3" />

    <h1 class="text-xl font-bold break-all">
      {{ truncate(post.title, 50, true) }}
    </h1>

    <p class="text-base overflow-hidden line-clamp-3">
      {{ post.description }}
    </p>
  </div>
</template>
