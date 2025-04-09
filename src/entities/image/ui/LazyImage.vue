<script setup lang="ts">
import { useLazyImage } from '../model/composable'

interface Props {
  image: string
}

const { image } = defineProps<Props>()

const container = ref<HTMLElement | null>(null)
const { imageLoaded } = useLazyImage(container, image)
</script>

<template>
  <div
    ref="container"
    class="min-h-[200px] relative before:content-['_'] before:absolute before:animate-pulse before:w-full before:h-full before:bg-neutral-200 dark:before:bg-neutral-800 before:rounded-lg"
    :class="imageLoaded && ['before:hidden']"
  >
    <div
      class="transition-opacity duration-300"
      :class="!imageLoaded && 'opacity-0'"
    >
      <img
        v-if="imageLoaded"
        :src="image"
        :alt="image"
        class="w-full object-cover max-h-[200px] rounded-lg"
      />
    </div>
  </div>
</template>
