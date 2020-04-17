<template>
  <section v-html="contentHTML"></section>
</template>

<script>
export default {
  data: () => ({
    galleryImages: []
  }),

  props: {
    contentHTML: {
      type: String,
      required: true
    }
  },

  mounted() {
    // get max width variable of content wrapper
    const MAX_WIDTH = parseInt(
      getComputedStyle(document.querySelector('.wrapper'))
        .getPropertyValue('--contents-max-width')
        .replace('px', '')
    )
    const images = [...this.$el.getElementsByTagName('img')]
    this.galleryImages.push(...images)
    // emit event to parent component after loaded all images
    this.$emit('resolved', {
      images: this.galleryImages
    })

    // add class 'not-overflow-width' if image's width
    // less than max width(content wrapper)
    if (images.length) {
      const lessThanWidthImages = images.filter(img => img.width < MAX_WIDTH)
      lessThanWidthImages.map(img => img.classList.add('not-overflow-width'))
    }
  }
}
</script>

<style lang="postcss" scoped>
section {
  /* Heading Start */
  @for $i from 1 to 6 {
    & >>> h$(i) {
      @apply my-6 font-bold;
    }
  }
  & >>> h1 {
    @apply text-3xl;
  }
  & >>> h2 {
    @apply text-2xl;
  }
  & >>> h3 {
    @apply text-xl;
  }
  & >>> h4 {
    @apply text-lg;
  }
  /* Heading End */
  /* List Start */
  & >>> ul,
  & >>> ol {
    padding: 0 0 0 20px;
  }
  & >>> ol {
    list-style-type: decimal;
  }
  & >>> ul {
    list-style-type: disc;
  }
  /* List End */
  /* Typography Start */
  & >>> p {
    @apply my-6;
  }
  /* Typography End */
  /* Image Start */
  & >>> img.not-overflow-width {
    margin: 0 auto;
  }
  & >>> img {
    @apply cursor-pointer;
  }
  /* Image End */
}
</style>
