<template>
  <main>
    <PostHeader :title="title" :postByTag="postByTag" />
    <slot />
    <PostFooter />
  </main>
</template>

<script>
import PostHeader from '@/components/v2/layouts/PostHeader.vue'
import PostFooter from '@/components/v2/layouts/PostFooter.vue'

export default {
  components: {
    PostHeader,
    PostFooter
  },

  props: ['title', 'postByTag']
}
</script>

<style lang="postcss" scoped>
main {
  @apply font-display relative overflow-hidden;
}
</style>
