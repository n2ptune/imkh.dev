<template>
  <Layout>
    <transition name="fade" appear>
      <section class="container flex justfiy-center mx-auto mb-32 flex-col">
        <div class="post-content mx-3 md:mx-auto">
          <post-metadata :post="$page.post" />
          <article v-html="$page.post.content"></article>
        </div>
      </section>
    </transition>
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
}
</page-query>

<script>
import Layout from '@/layouts/Default.vue'
import PostLogo from '@/components/post/PostLogo.vue'
import PostMetadata from '@/components/post/PostMetadata.vue'

export default {
  components: {
    Layout,
    PostLogo,
    PostMetadata
  },
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
          content: this.$page.post.cover_image.src
            ? `https://blog.n2ptune.xyz${this.$page.post.cover_image.src}`
            : ''
        },
        {
          key: 'og:image:width',
          property: 'og:image:width',
          content: '700'
        },
        {
          key: 'og:url',
          property: 'og:url',
          content: `https://blog.n2ptune.xyz${this.$page.post.path}`
        }
      ]
    }
  }
}
</script>

<style lang="postcss">
.fade-enter-active {
  transition: opacity 0.44s ease-in;
}
.fade-enter {
  opacity: 0;
}
ul,
ol {
  list-style-type: square;
  padding: 0 0 0 20px;
}
pre[class*='language-'] {
  margin: 0 -1.5rem;
}
.post-content {
  max-width: var(--content-post);
  @apply px-6 py-16 bg-white-f shadow-md rounded-lg mt-12;
}
.post-content img {
  max-width: calc(100% + 3rem);
  margin-left: -1.5rem;
}
.post-content a[rel='nofollow noopener noreferrer'] {
  word-break: break-all;
  @apply text-purple-600;
}
.post-content a[rel='nofollow noopener noreferrer']:hover {
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
  pre[class*='language-'] {
    margin: 0 -3rem;
  }
}
</style>
