<template>
  <div class="relative mt-24">
    <section v-html="md" data-target-content></section>
    <Navigation :content="md" />
  </div>
</template>

<script>
import Navigation from '@/components/layouts/post/Navigation.vue'

export default {
  components: {
    Navigation
  },

  data: () => ({
    galleryImages: []
  }),

  props: {
    md: {
      type: String,
      required: true
    }
  },

  methods: {
    resizingImages() {
      this.$nextTick(() => {
        // initialize galleryImages
        this.galleryImages = []

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
          const lessThanWidthImages = images.filter(
            img => img.width < MAX_WIDTH
          )
          lessThanWidthImages.map(img =>
            img.classList.add('not-overflow-width')
          )
        }
      })
    }
  },

  watch: {
    $route(c, p) {
      if (process.isClient) {
        this.resizingImages()
      }
    }
  },

  mounted() {
    if (process.isClient) {
      this.resizingImages()
    }
  }
}
</script>

<style lang="postcss" scoped>
section {
  @apply break-words;

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
  & >>> img {
    @apply cursor-pointer my-16 mx-auto;
  }
  /* Image End */
}
</style>
