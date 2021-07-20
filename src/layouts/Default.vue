<template>
  <main>
    <Header />
    <slot />
    <footer>
      <slot name="footer" />
    </footer>
  </main>
</template>

<script>
import Header from '@/components/layouts/main/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="postcss" scoped>
main {
  overflow-y: hidden;
}
</style>
