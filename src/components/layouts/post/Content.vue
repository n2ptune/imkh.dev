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
    },
    embed() {
      const dom = new DOMParser()
      const html = dom.parseFromString(this.md, 'text/html')
      const isCodepen = html.querySelector('.codepen-embed')

      if (isCodepen !== null) {
        const codepen = document.head.querySelector(
          'script[data-codepen-embed]'
        )

        if (codepen !== null) {
          window.__CpEmbed()
        } else {
          const script = document.createElement('script')

          script.async = true
          script.setAttribute(
            'src',
            'https://static.codepen.io/assets/embed/ei.js'
          )

          document.head.appendChild(script)
        }
      }
    }
  },

  watch: {
    $route(c, p) {
      if (process.isClient) {
        this.resizingImages()
        this.embed()
      }
    }
  },

  mounted() {
    this.embed()

    if (process.isClient) {
      this.resizingImages()
    }
  }
}
</script>

<style lang="postcss" scoped>
section {
  @apply break-words text-white-800;

  font-size: 1rem;

  @screen lg {
    font-size: 1.1rem;
  }

  @screen xl {
    font-size: 1.15rem;
  }

  /* Blockquote */

  & >>> blockquote {
    @apply px-4 py-2 my-12 border-l-4 border-elevation-300 text-white-600
    italic;

    & p {
      @apply m-0;

      &::before {
        @apply mr-1;

        content: open-quote;
      }

      &::after {
        @apply ml-1;

        content: close-quote;
      }
    }
  }

  /* Link */

  & >>> a {
    @apply text-purple-300 underline;

    &:hover {
      @apply text-purple-400;
    }
  }

  /* Code */

  & >>> code:not([class*='language-']) {
    @apply text-sm p-1 bg-elevation-200 font-mono !important;
  }

  & >>> pre[class*='language-'],
  & >>> code[class*='language-'] {
    font-size: 0.95rem;

    @apply font-mono !important;
    @apply text-white-f;
  }

  & >>> pre[class*='language-'] {
    overflow: auto;
    position: relative;
    padding: 2rem 1.5rem;

    @apply bg-elevation-400 rounded-lg;
  }

  /* List */

  & >>> ul,
  & >>> ol {
    padding: 0 0 0 20px;
    list-style-position: inside;

    & a {
      @apply no-underline;
    }
  }

  & >>> ol {
    list-style-type: decimal;
  }

  & >>> ul {
    list-style-type: disc;
  }

  /* Typography */

  & >>> h1,
  & >>> h2 {
    &:not(:first-child)::before {
      content: '· · ·';

      @apply block my-16 text-xl font-black text-center text-white-400;
    }
  }

  & >>> h1,
  & >>> h2,
  & >>> h3,
  & >>> h4 {
    @apply font-bold text-white-900 my-6;
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

  & >>> p {
    @apply my-6;
  }

  /* Image */

  & >>> img {
    @apply cursor-pointer my-16 mx-auto;
  }
}
</style>
