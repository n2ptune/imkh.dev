<template>
  <main class="font-display relative">
    <PostHeader :title="title" :postByTag="postByTag" />
    <slot />
  </main>
</template>

<script>
import PostHeader from '@/components/v2/layouts/PostHeader.vue'

export default {
  components: {
    PostHeader
  },

  props: ['title', 'postByTag']
}
</script>
