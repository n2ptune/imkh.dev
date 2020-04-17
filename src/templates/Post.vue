<template>
  <PostLayout :title="$page.post.title">
    <section class="wrapper">
      <div class="title">
        {{ $page.post.title }}
      </div>
      <div class="description">
        {{ $page.post.description }}
      </div>
      <!-- <div v-html="$page.post.content" class="content" /> -->
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
    this.$emit('test', this.$page.post.title)
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
