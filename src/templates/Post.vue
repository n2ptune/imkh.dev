<template>
  <PostLayout :title="$page.post.title">
    <section class="wrapper">
      <div class="title">
        {{ $page.post.title }}
      </div>
      <div class="description">
        {{ $page.post.description }}
      </div>
      <div v-html="$page.post.content" class="content" />
    </section>
  </PostLayout>
</template>

<script>
export default {
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
  padding-top: 2rem;
  top: 3rem;
  @apply relative mx-auto;
}
</style>
