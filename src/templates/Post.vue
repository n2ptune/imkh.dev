<template>
  <DefaultLayout>
    <section class="wrapper">
      <!-- <div class="adsense-wrap">
        <Adsense
          style="display:block"
          ad-format="fluid"
          ad-layout-key="-dg+94+1r-oc+12h"
          ad-client="ca-pub-3441377677018772"
          ad-slot="5087184924"
        />
      </div> -->
      <Content :md="$page.post.content" @resolved="generateGallery" />
      <ClientOnly>
        <CommentsPlugin :id="$page.post.id" :path="$page.post.path" />
        <GallerySide :images="images" :index="index" @close="index = null" />
      </ClientOnly>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue'
import Content from '@/components/layouts/post/Content.vue'
import CommentsPlugin from '@/components/utils/CommentsPlugin.vue'
import GallerySide from 'vue-gallery-slideshow'
import Adsense from '@/components/utils/Adsense.vue'

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
    Content,
    CommentsPlugin,
    GallerySide,
    Adsense
  },

  computed: {
    // filterWithoutCurrentPost() {
    //   const current = this.$page.post.id
    //   /** @type {object[]} */
    //   const tags = this.$page.post.tags
    //   const result = []
    //   for (let i = 0; i < tags.length; i++) {
    //     result.push({
    //       id: tags[i].id,
    //       title: tags[i].title,
    //       path: tags[i].path,
    //       node: tags[i].belongsTo.edges.filter(edge => edge.node.id !== current)
    //     })
    //   }
    //   return result.filter(n => n.node.length)
    // }
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
      // 임베디드 삽입 head에 집어 넣든가 바꿔야 함
      const codepen = document.createElement('script')
      codepen.src = 'https://static.codepen.io/assets/embed/ei.js'
      this.$el.appendChild(codepen)
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
.adsense-wrap {
  @apply my-6;
}

.wrapper {
  @apply relative mx-auto mb-64 py-10 px-4 rounded-xl shadow-xl
  bg-elevation-200 text-white-800;

  max-width: 750px;
  top: 10rem;

  @screen md {
    @apply px-6;
  }

  @screen lg {
    @apply px-10;
  }
}
</style>
