<template>
  <PostLayout :title="$page.post.title">
    <section class="wrapper">
      <div class="head-wrap border-b-4 border-gray-300 pb-6 text-center">
        <div class="text-2xl font-bold mb-1">
          {{ $page.post.title }}
        </div>
        <div class="text-sm text-gray-700 mb-1">
          {{ $page.post.date }} / 읽는데
          <span class="font-bold">{{ $page.post.timeToRead }}</span
          >분!
        </div>
        <div class="text-base text-gray-700">
          {{ $page.post.description }}
        </div>
      </div>
      <PostContent
        :contentHTML="$page.post.content"
        @resolved="generateGallery"
      />
      <ClientOnly>
        <GallerySide :images="images" :index="index" @close="index = null" />
      </ClientOnly>
    </section>
  </PostLayout>
</template>

<script>
import PostContent from '@/components/v2/layouts/PostContent.vue'
import GallerySide from 'vue-gallery-slideshow'

export default {
  data: () => ({
    index: null,
    images: []
  }),

  components: {
    PostContent,
    GallerySide
  },

  watch: {
    $route(c, p) {
      if (process.isClient) {
        ;(function(overlay) {
          if (overlay) overlay.click()
        })(document.querySelector('.overlay'))
      }

      this.index = null
      this.images = []
    }
  },

  methods: {
    /**
     * @param {HTMLElement[]} data
     */
    generateGallery(data) {
      data.images.map((img, key) => {
        this.images.push(img.dataset.src)
        img.addEventListener('click', () => (this.index = key))
      })
    }
  },

  mounted() {
    if (process.isClient) {
      require('intersection-observer')
    }
  }
}
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "D. MMMM. YYYY")
    timeToRead
    tags {
      id
      title
      path
    }
    description
    content
    cover_image
  }
  origin: post (id: $id) {
    date
  }
}
</page-query>

<style lang="postcss" scoped>
.wrapper {
  --contents-max-width: 800px;

  overflow-x: hidden;
  overflow-wrap: break-word;
  max-width: var(--contents-max-width);
  padding-top: 2rem;
  top: 3rem;
  @apply relative mx-auto px-3;
}
</style>
