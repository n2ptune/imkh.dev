<template>
  <main class="font-display">
    <PostHeader :title="title" />
    <slot />
  </main>
</template>

<script>
import PostHeader from '@/components/v2/layouts/PostHeader.vue'

export default {
  components: {
    PostHeader
  },

  props: ['title']
}
</script>
