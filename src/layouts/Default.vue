<template>
  <div class="font-display">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="postcss">
html,
body {
  @apply bg-gray-300;
}
</style>
