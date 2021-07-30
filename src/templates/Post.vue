<template>
  <DefaultLayout>
    <section class="wrapper">
      <Header :post="$page.post" />
      <div class="break"></div>
      <div v-if="$page.post.cover_image" class="cover-image">
        <g-image :src="$page.post.cover_image" />
      </div>
      <Content :md="$page.post.content" />
      <!-- <Navigation /> -->
      <ClientOnly>
        <CommentsPlugin :id="$page.post.id" :path="$page.post.path" />
      </ClientOnly>
    </section>
    <template #footer>
      <Footer :relatedPost="filterWithoutCurrentPost" />
    </template>
  </DefaultLayout>
</template>

<script>
import CommentsPlugin from '@/components/utils/CommentsPlugin.vue'
import Content from '@/components/layouts/post/Content.vue'
import DefaultLayout from '@/layouts/Default.vue'
import Header from '@/components/layouts/post/Header.vue'
import Footer from '@/components/layouts/post/Footer.vue'

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
            : ''
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
    CommentsPlugin,
    Content,
    DefaultLayout,
    Header,
    Footer
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
      const MAX_LENGTH = 3

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
      this.images = []
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
    content
    cover_image (width: 1100, blur: 4)
    date (format: "D. MMMM YYYY")
    description
    id
    path
    timeToRead
    title
    headings {
      anchor
      depth
      value
    }
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
  @apply relative mx-auto mb-32 py-10 rounded-none text-white-800 px-4
  overflow-x-hidden;

  max-width: 100%;
  top: 7rem;

  & .cover-image {
    > img {
      @apply mx-auto max-w-full overflow-hidden;
    }
  }
}

@screen md {
  .wrapper {
    @apply px-0;
  }
}

@screen lg {
  .wrapper {
    max-width: 1100px;
  }
}
</style>
