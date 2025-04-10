<script setup lang="ts">
import { LazyImage } from '~/entities/image'
import type { CustomPostCollectionItem } from '~/shared/types'

interface Props {
  post: CustomPostCollectionItem
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
    class="group min-h-[400px] max-h-[400px] rounded-lg cursor-pointer space-y-2 transition-transform will-change-transform hover:-translate-y-3 duration-300"
    @click="onClickCard"
  >
    <LazyImage v-if="post.meta.cover_image" :image="post.meta.cover_image" />

    <h1 class="text-xl font-bold">{{ post.title }}</h1>

    <p class="text-base overflow-hidden line-clamp-3">
      {{ post.description }}
    </p>
  </div>
</template>
