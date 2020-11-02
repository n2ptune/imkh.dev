<template>
  <DefaultLayout>
    <section class="wrapper">
      <Header :post="$page.post" />
      <div class="break"></div>
      <Content :md="$page.post.content" @resolved="generateGallery" />
      <ClientOnly>
        <CommentsPlugin :id="$page.post.id" :path="$page.post.path" />
        <GallerySide :images="images" :index="index" @close="index = null" />
      </ClientOnly>
    </section>
    <div class="mt-12 mb-6">
      <ins
        class="adsbygoogle"
        style="display: block; text-align: center"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-3441377677018772"
        data-ad-slot="6314058533"
      />
    </div>
    <ClientOnly>
      <RelatedPosts v-if="filterWithoutCurrentPost.length" :posts="related" />
    </ClientOnly>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue'
import Header from '@/components/layouts/post/Header.vue'
import GallerySide from 'vue-gallery-slideshow'
import Content from '@/components/layouts/post/Content.vue'
import CommentsPlugin from '@/components/utils/CommentsPlugin.vue'
import RelatedPosts from '@/components/layouts/post/RelatedPosts.vue'

export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          conetnt: this.$page.post.description
        },
        {
          key: 'og:title',
          property: 'og:title',
          content: this.$page.post.title
        },
        {
          key: 'og:description',
          property: 'og:description',
          content: this.$page.post.description
        },
        {
          key: 'og:image',
          property: 'og:image',
          content: this.$page.post.cover_image
            ? `https://imkh.dev${this.$page.post.cover_image.src}`
            : `https://imkh.dev${require('@/assets/default-thumbnail.jpg')}`
        },
        {
          key: 'og:image:width',
          property: 'og:image:width',
          content:
            this.$page.post.cover_image !== null
              ? this.$page.post.cover_image.size.width
              : 900
        },
        {
          key: 'og:image:height',
          property: 'og:image:height',
          content:
            this.$page.post.cover_image !== null
              ? this.$page.post.cover_image.size.height
              : 400
        },
        {
          key: 'og:url',
          property: 'og:url',
          content: `https://imkh.dev${this.$page.post.path}`
        }
      ]
    }
  },

  data: () => ({
    index: null,
    images: []
  }),

  components: {
    DefaultLayout,
    Header,
    Content,
    CommentsPlugin,
    GallerySide,
    RelatedPosts
  },

  computed: {
    filterWithoutCurrentPost() {
      const current = this.$page.post.id
      const tags = this.$page.post.tags
      const result = []

      for (let i = 0; i < tags.length; i++) {
        result.push(
          tags[i].belongsTo.edges.filter(edge => edge.node.id !== current)
        )
      }

      // 합치기
      if (result.length > 1) {
        for (let i = 1; i < result.length; i++) {
          result[0].push(...result[i])
        }
      }

      // 중복 제거
      const filter = result[0].filter(
        (edge, index) =>
          result[0].findIndex(
            innerEdge => innerEdge.node.id === edge.node.id
          ) === index
      )

      return result.length ? filter : []
    },
    related() {
      /** @type {Array<any>} */
      const list = this.filterWithoutCurrentPost

      // 최대 배열 길이, 관련 포스트 최대 갯수
      const MAX_INDEX = list.length
      const MAX_LENGTH = 6

      // 배열 길이가 갯수 이하일 경우 내보냄
      if (MAX_INDEX <= MAX_LENGTH) {
        return list.slice(0, MAX_LENGTH)
      }

      const randPool = []
      const rand = max => Math.floor(Math.random() * max)

      let flag = 0

      while (flag < MAX_LENGTH) {
        const _temp = rand(MAX_INDEX)

        if (randPool.indexOf(_temp) === -1) {
          flag++
          randPool.push(_temp)
        } else {
          continue
        }
      }

      const result = []

      randPool.forEach(i => result.push(list[i]))

      return result
    }
  },

  watch: {
    $route(c, p) {
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
      if (!IntersectionObserver in window) {
        console.warn('import intersection observer polyfill')
        require('intersection-observer')
      }

      // adsense
      const adsense = document.querySelector(
        'script[data-ad-client=ca-pub-3441377677018772]'
      )

      if (adsense === null) {
        const script = document.createElement('script')

        script.src =
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        script.async = true
        script.dataset.adClient = 'ca-pub-3441377677018772'

        document.head.appendChild(script)
      }
    }
  }
}
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    id
    title
    path
    date (format: "D. MMMM YYYY")
    timeToRead
    tags {
      id
      title
      path
      belongsTo {
        edges {
          node {
            ...on Post {
              cover_image (width: 800, height: 300, blur: 4)
              date (format: "D. MMMM YYYY")
              description
              id
              path
              title
              timeToRead
              excerpt
              tags {
                id
                title
                path
              }
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
.adsense-wrap {
  @apply my-6;
}

.wrapper {
  @apply relative mx-auto mb-32 py-10 px-4 rounded-none text-white-800
  bg-elevation-200;

  max-width: 750px;
  top: 7rem;

  @screen md {
    @apply px-6 rounded-xl;
  }

  @screen lg {
    @apply px-10;
  }

  & .break {
    @apply absolute left-0 w-full;

    border-bottom: 1px solid theme('colors.elevation.500');
  }
}
</style>
