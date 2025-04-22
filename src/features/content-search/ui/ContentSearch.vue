<script setup lang="ts">
const value = defineModel({ type: String, default: '' })
const focused = ref(false)

const onFocus = (_: FocusEvent) => {
  focused.value = true
}

const onBlur = (_: FocusEvent) => {
  console.log('focusout')
  focused.value = false
}

const variants = {
  active: {
    minWidth: '350px'
  },
  inactive: {
    minWidth: '250px'
  }
}
</script>

<template>
  <Motion
    as-child
    initial="inactive"
    :variants="variants"
    :animate="focused ? 'active' : 'inactive'"
    :exit="{ minWidth: '250px' }"
    while-focus="active"
  >
    <UInput
      v-model="value"
      size="xl"
      variant="soft"
      leading-icon="i-tabler-search"
      placeholder="무엇을 찾고싶으신가요?"
      @focus.native="onFocus"
      @focusout.native="onBlur"
      @blur.native="onBlur"
    />
  </Motion>
</template>
