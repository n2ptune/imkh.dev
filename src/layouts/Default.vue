<template>
  <main class="font-display">
    <Header />
    <slot />
    <Footer />
  </main>
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
