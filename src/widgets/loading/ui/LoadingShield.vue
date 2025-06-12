<script setup lang="ts">
interface Props {
  condition: any
}

const { condition } = defineProps<Props>()
</script>

<template>
  <template v-if="!!condition">
    <slot />
  </template>

  <template v-else>
    <slot name="loading" />
  </template>
</template>
