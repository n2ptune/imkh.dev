<template>
  <main class="font-display relative">
    <PostHeader :title="title" :postByTag="postByTag" />
    <Adsense
      ad-layout="in-article"
      ad-slot="2"
      ad-format="fluid"
      ad-responsive="true"
    />

    <slot />
    <PostFooter />
  </main>
</template>

<script>
import PostHeader from '@/components/v2/layouts/PostHeader.vue'
import PostFooter from '@/components/v2/layouts/PostFooter.vue'
import Adsense from '@/components/v2/utils/Adsense.vue'

export default {
  components: {
    PostHeader,
    PostFooter,
    Adsense
  },

  props: ['title', 'postByTag']
}
</script>
