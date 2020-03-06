<template>
  <div></div>
</template>

<script>
export default {
  created() {
    const { slug } = this.$route.params
    const splited = slug.split('-')
    const result = []

    splited.splice(0, 3)

    /**
     * @param {string} str
     */
    const removeKoreanFromString = function(str) {
      let temp = []
      for (const char of str) {
        const code = char.charCodeAt()
        if (code >= 0 && code <= 125) {
          temp.push(char)
        }
      }
      if (temp.length) {
        result.push(...temp, '-')
      }
      temp = []
    }

    splited.forEach(removeKoreanFromString)

    const relay = result.join('')
    const len = relay.length - 1
    const route = relay.slice(0, len)

    if (route === 'github-pages') {
      this.$router.push('/github-pages-subtree/')
    } else if (route === 'vue-postcss-css') {
      this.$router.push('/vue-post-css-css/')
    } else {
      this.$router.push(`/${route}/`)
    }
  }
}
</script>
