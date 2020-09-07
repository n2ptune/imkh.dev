<template>
  <main class="font-display relative">
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
