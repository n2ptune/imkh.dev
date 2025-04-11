<script setup lang="ts">
interface Props {
  cursorPointer?: boolean
  tooltip?: boolean
  tooltipText?: string
}

const { cursorPointer = false } = defineProps<Props>()
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <UButton
    variant="link"
    color="neutral"
    size="md"
    square
    :class="[cursorPointer && 'cursor-pointer']"
  >
    <slot />
  </UButton>
</template>
