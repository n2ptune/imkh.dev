<script setup lang="ts">
import type { WrapperProps as Props } from '../model/type'

type Emits = {
  click: []
}

const {
  cursorPointer = false,
  tooltip = false,
  tooltipText = '',
  to = undefined,
  target = undefined
} = defineProps<Props>()
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const emits = defineEmits<Emits>()
</script>

<template>
  <DefineTemplate>
    <UButton
      :to="to"
      :target="target"
      variant="link"
      color="neutral"
      size="md"
      square
      :class="[cursorPointer && 'cursor-pointer']"
      @click="emits('click')"
    >
      <slot />
    </UButton>
  </DefineTemplate>

  <UTooltip
    v-if="tooltip"
    :text="tooltipText"
    :delay-duration="0"
    disable-closing-trigger
  >
    <ReuseTemplate />
  </UTooltip>

  <ReuseTemplate v-else />
</template>
