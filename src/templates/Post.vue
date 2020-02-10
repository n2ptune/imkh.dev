<template>
  <Layout>
    <div class="container flex justfiy-center mx-auto my-12 flex-col">
      <PostLogo :post="$page.post" />
      <div
        v-html="$page.post.content"
        class="post-content mx-6 md:mx-auto"
      ></div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/layouts/Default.vue'
import PostLogo from '@/components/PostLogo.vue'

export default {
  components: {
    Layout,
    PostLogo
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
  }
}
</page-query>

<style lang="postcss">
.post-content {
  max-width: 800px;
  @apply px-12 py-16 bg-sea-low shadow-xl rounded-lg mt-12 text-white-700;
}
.post-content *:first-child {
  @apply mt-0 !important;
}
.post-content img {
  max-width: calc(100% + 6rem);
  margin-left: -3rem;
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
</style>
