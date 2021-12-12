<template>
  <div class="mb-0 mt-24 mx-auto" style="max-width: 750px">
    <Disqus
      ref="disqus"
      shortname="imkh-dev"
      :identifier="id"
      :url="'https://imkh.dev' + path"
    />
  </div>
</template>

<script>
import { Disqus } from 'vue-disqus'

export default {
  props: ['id', 'path'],

  components: {
    Disqus
  },

  watch: {
    path(v) {
      this.$refs.disqus.reset(window.DISQUS)
    }
  }
}
</script>
