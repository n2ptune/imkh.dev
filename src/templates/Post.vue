<template>
  <Layout>
    <section
      class="container flex justify-center mx-auto mb-20 flex-col 2xl:flex-row"
    >
      <div class="post-content mx-2 md:mx-auto">
        <g-image
          v-if="$page.post.cover_image.size.width >= 950"
          :src="$page.post.cover_image"
          class="rounded-t-lg shadow-lg post-cover-image"
          blur="4"
          contain
        />
        <post-functions :path="$page.post.path" :date="$page.origin.date" />
        <post-metadata :post="$page.post" />
        <post-description :des="$page.post.description" />
        <article class="md" v-html="$page.post.content"></article>
      </div>
      <a-side :aside="aside" />
    </section>
    <scrolling v-if="scroll" />
    <ClientOnly>
      <gallery-slide :images="images" :index="index" @close="index = null" />
    </ClientOnly>
  </Layout>
</template>

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

<script>
import Layout from '@/layouts/Default.vue'
import PostLogo from '@/components/post/PostLogo.vue'
import PostMetadata from '@/components/post/PostMetadata.vue'
import PostDescription from '@/components/post/PostDescription.vue'
import PostFunctions from '@/components/post/PostFunctions.vue'
import Scrolling from '@/components/post/Scrolling.vue'
import GallerySlide from 'vue-gallery-slideshow'

export default {
  data: () => ({
    scroll: false,
    index: null,
    images: [],
    aside: []
  }),

  components: {
    Layout,
    PostLogo,
    PostMetadata,
    PostDescription,
    PostFunctions,
    Scrolling,
    GallerySlide,
    ASide: () => import('@/components/post/ASide.vue')
  },

  metaInfo() {
    return {
      title: this.$page.post.title,
      script: [
        {
          src: 'https://static.codepen.io/assets/embed/ei.js'
        }
      ],
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
            ? `https://blog.n2ptune.xyz${this.$page.post.cover_image.src}`
            : ''
        },
        {
          key: 'og:image:width',
          property: 'og:image:width',
          content: this.$page.post.cover_image
            ? this.$page.post.cover_image.size.width
            : ''
        },
        {
          key: 'og:image:height',
          property: 'og:image:height',
          content: this.$page.post.cover_image
            ? this.$page.post.cover_image.size.height
            : ''
        },
        {
          key: 'og:url',
          property: 'og:url',
          content: `https://blog.n2ptune.xyz${this.$page.post.path}`
        }
      ]
    }
  },

  mounted() {
    const postContentTop = document.querySelector('.post-content').offsetTop

    window.addEventListener('scroll', () => {
      if (postContentTop < window.scrollY) {
        this.scroll = true
      } else {
        this.scroll = false
      }
    })

    const allImages = document.querySelectorAll('.post-content img')

    allImages.forEach((img, key) => {
      this.images.push(img.dataset.src)
      img.addEventListener('click', () => {
        this.index = key
      })
    })

    const postContentH2s = document.querySelectorAll('.post-content h2')
    const collection = []

    postContentH2s.forEach(el =>
      collection.push({
        id: el.id,
        title: el.innerText
      })
    )

    this.aside = collection
  }
}
</script>

<style lang="postcss">
.post-content ul,
.post-content ol {
  padding: 0 0 0 20px;
}
.post-content ol {
  list-style-type: decimal;
}
.post-content ul {
  list-style-type: disc;
}
pre[class*='language-'] {
  margin: 0 -1.5rem;
}
.post-cover-image {
  max-height: 500px;
}
.post-content {
  max-width: var(--content-post);
  @apply px-6 pb-16 bg-white-f shadow-md rounded-lg mt-12;
}
.post-content img {
  max-width: calc(100% + 3rem);
  margin-left: -1.5rem;
  cursor: pointer;
}
.full-width {
  max-width: calc(100% + 6rem);
  margin-left: -1.5rem;
  margin-right: -1.5rem;
}
.md a {
  word-break: break-all;
  @apply text-purple-600;
}
.md a:hover {
  @apply text-purple-700 underline;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply my-6 font-bold;
}
h1 {
  @apply text-3xl;
}
h2 {
  @apply text-2xl;
}
h3 {
  @apply text-xl;
}
p {
  @apply my-6;
}
@screen sm {
  .post-content {
    @apply px-12;
  }
  .post-content img {
    max-width: calc(100% + 6rem);
    margin-left: -3rem;
  }
  .full-width {
    max-width: calc(100% + 6rem);
    margin-left: -3rem;
    margin-right: -3rem;
  }
  pre[class*='language-'] {
    margin: 0 -3rem;
  }
}
</style>
