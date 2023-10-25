<script lang="ts" setup>
const colorMode = useColorMode()

function switchTheme(theme: 'dark' | 'light') {
  colorMode.preference = theme
}

interface Props {
  iconSize: string | undefined
}

const props = defineProps<Props>()
</script>

<template>
  <Icon
    v-show="$colorMode.value === 'light'"
    name="ri:sun-line"
    :size="props.iconSize"
    class="clickable-icon"
    @click="() => switchTheme('dark')"
  />
  <Icon
    v-show="$colorMode.value === 'dark'"
    name="ri:moon-fill"
    :size="props.iconSize"
    class="clickable-icon"
    @click="() => switchTheme('light')"
  />
</template>
