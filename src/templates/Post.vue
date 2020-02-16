<template>
  <Layout>
    <div class="container flex justfiy-center mx-auto mb-32 flex-col">
      <div class="post-content mx-6 md:mx-auto">
        <post-metadata :post="$page.post" />
        <div v-html="$page.post.content"></div>
      </div>
    </div>
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
          name: 'description',
          conetnt: this.$page.post.description
        },
        {
          property: 'og:title',
          content: this.$page.post.title
        },
        {
          property: 'og:description',
          content: this.$page.post.description
        },
        {
          property: 'og:image',
          content: this.$page.post.cover_image.src || ''
        }
      ]
    }
  }
}
</script>

<style lang="postcss">
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
