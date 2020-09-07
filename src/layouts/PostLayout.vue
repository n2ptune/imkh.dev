<template>
  <main class="font-display relative">
    <PostHeader :title="title" :postByTag="postByTag" />
    <Adsense
      ad-slot="5087184924"
      ad-format="fluid"
      ad-client="ca-pub-3441377677018772"
      ad-layout-key="-fb+5w+4e-db+86"
      style="display:block;top:3;rem;position:relative;text-align:center;"
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
