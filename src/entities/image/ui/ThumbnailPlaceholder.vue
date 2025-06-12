<script setup lang="ts">
import NoImage from '~/assets/no-image.svg'
</script>

<template>
  <div
    class="min-h-[200px] relative before:content-['_'] before:absolute before:w-full before:h-full before:bg-neutral-200 dark:before:bg-neutral-800 before:rounded-lg"
  >
    <div
      class="flex w-full h-[200px] items-center justify-center transition-opacity duration-300"
    >
      <NoImage
        class="[&_*:nth-child(2)]:!fill-none z-10 text-6xl text-neutral-500 dark:text-neutral-400"
        :filled="false"
      />
    </div>
  </div>
</template>
