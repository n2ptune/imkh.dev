export function useTheme() {
  const cm = useColorMode()
  const isDark = computed({
    get() {
      return cm.value === 'dark'
    },
    set() {
      cm.preference = cm.value === 'dark' ? 'light' : 'dark'
    }
  })

  const icon = computed(() => {
    return isDark.value
      ? 'i-material-symbols:light-mode'
      : 'i-material-symbols:dark-mode'
  })

  console.log(cm)

  return {
    isDark,
    icon
  }
}
