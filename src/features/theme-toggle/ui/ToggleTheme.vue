<script setup lang="ts">
import { Wrapper } from '~/shared/icon-button'
import { useTheme } from '~/features/theme'

const { isDark, icon } = useTheme()

function onClickSwitch() {
  isDark.value = !isDark.value
}
</script>

<template>
  <Wrapper
    @click="onClickSwitch"
    class="hover:cursor-pointer"
  >
    <Icon :name="icon" class="text-2xl" />
  </Wrapper>
</template>
