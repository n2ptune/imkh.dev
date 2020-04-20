<template>
  <PostLayout :title="$page.post.title" :postByTag="filterWithoutCurrentPost">
    <section class="wrapper">
      <div
        class="head-wrap border-b-4 border-t-4 border-gray-300 border-dashed py-6 text-center"
      >
        <div class="text-2xl font-bold">
          {{ $page.post.title }}
        </div>
        <div class="text-sm text-gray-700 mb-1">
          {{ $page.post.date }}
        </div>
        <div class="text-base text-gray-700">
          {{ $page.post.description }}
        </div>
        <div class="flex mt-3 justify-center">
          <g-link
            v-for="tag in $page.post.tags"
            :to="tag.path"
            :key="tag.id"
            class="py-1 px-2 mr-2 bg-purple-200 rounded-lg cursor-pointer transition-colors duration-500 hover:bg-purple-300"
          >
            #{{ tag.title }}
          </g-link>
        </div>
      </div>
      <PostContent
        :navi="headings"
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
    images: [],
    headings: []
  }),

  components: {
    PostContent,
    GallerySide
  },

  computed: {
    filterWithoutCurrentPost() {
      const current = this.$page.post.id
      /** @type {object[]} */
      const tags = this.$page.post.tags
      const result = []

      for (let i = 0; i < tags.length; i++) {
        result.push({
          id: tags[i].id,
          title: tags[i].title,
          path: tags[i].path,
          node: tags[i].belongsTo.edges.filter(edge => edge.node.id !== current)
        })
      }

      return result.filter(n => n.node.length)
    }
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
    },
    parseHeading() {
      const domParser = new DOMParser()
      const _document = domParser.parseFromString(
        this.$page.post.content,
        'text/html'
      )

      const headings = Array.from(_document.querySelectorAll('h2, h3'))
      const result = headings.map(heading => {
        return {
          path: heading.id,
          title: heading.innerText,
          level: heading.tagName.toLowerCase() === 'h2' ? 0 : 1
        }
      })

      this.headings = result
    }
  },

  mounted() {
    if (process.isClient) {
      this.parseHeading()
      require('intersection-observer')
    }
  },

  beforeUpdate() {
    this.parseHeading()
  }
}
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    id
    title
    path
    date (format: "YYYY년 MM월 DD일", locale: "ko")
    timeToRead
    tags {
      id
      title
      path
      belongsTo {
        edges {
          node {
            ...on Post {
              id
              title
              path
              date (format: "YYYY년 MM월 DD일", locale: "ko")
            }
          }
        }
      }
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

  /* overflow-x: hidden; */
  overflow-wrap: break-word;
  max-width: var(--contents-max-width);
  padding-top: 2rem;
  top: 3rem;
  @apply relative mx-auto px-3;
}
</style>
