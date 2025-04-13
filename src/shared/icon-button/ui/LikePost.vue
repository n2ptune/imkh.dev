<script setup lang="ts">
import Wrapper from './Wrapper.vue'
import { Motion } from 'motion-v'

const pressed = ref(false)
</script>

<template>
  <Wrapper
    cursor-pointer
    tooltip
    tooltip-text="이 글이 도움이 되었어요"
    @click="pressed = !pressed"
  >
    <div class="text-2xl space-x-1">
      <Motion
        as-child
        :while-hover="{ color: 'var(--color-red-500-rgb)', scale: 1.1 }"
        :transition="{ type: 'spring', stiffness: 500 }"
      >
        <Icon
          :name="
            pressed
              ? 'i-material-symbols-favorite'
              : 'i-material-symbols-favorite-outline'
          "
          class="text-2xl"
          :class="pressed && '!text-red-500'"
        />
      </Motion>
    </div>
  </Wrapper>
</template>
