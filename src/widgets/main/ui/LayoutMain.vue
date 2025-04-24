<script setup lang="ts">
interface Props {
  container?: boolean
}

const { container = true } = defineProps<Props>()
</script>

<template>
  <main
    class="px-4 mt-16 py-16 sm:px-0"
    :class="container && 'container-center'"
  >
    <slot />
  </main>
</template>
