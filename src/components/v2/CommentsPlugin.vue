<template>
  <div class="comments mt-12 mb-24">
    <vue-disqus
      ref="disqus"
      shortname="imkh-dev"
      :identifier="id"
      :url="'https://imkh.dev' + path"
    />
  </div>
</template>

<script>
export default {
  props: ['id', 'path'],

  watch: {
    path(v) {
      this.$refs.disqus.reset(window.DISQUS)
    }
  }
}
</script>
