<script lang="ts" setup>
const colorMode = useColorMode()

function switchTheme(theme: 'dark' | 'light') {
  colorMode.preference = theme
}
</script>

<template>
  <Icon
    v-if="colorMode.value === 'light'"
    name="ri:sun-line"
    size="32"
    class="clickable-icon"
    @click="() => switchTheme('dark')"
  />
  <Icon
    v-else-if="colorMode.value === 'dark'"
    name="ri:moon-fill"
    size="32"
    class="clickable-icon"
    @click="() => switchTheme('light')"
  />
</template>
