<script setup lang="ts">
interface Props {
  container?: boolean
}

const { container = true } = defineProps<Props>()
</script>

<template>
  <main
    class="px-4 mt-16 py-16 xl:px-8"
    :class="container && 'container-center'"
  >
    <slot />
  </main>
</template>
