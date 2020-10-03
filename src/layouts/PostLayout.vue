<template>
  <main>
    <Header :title="title" :postByTag="postByTag" />
    <slot />
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/layouts/post/Header.vue'
import Footer from '@/components/layouts/post/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },

  props: ['title', 'postByTag']
}
</script>

<style lang="postcss" scoped>
main {
  @apply relative overflow-hidden;
}
</style>
