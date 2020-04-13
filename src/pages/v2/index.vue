<template>
  <VLayout>
    <section class="section-1">
      <!-- Post List -->
      <div class="posts-wrap">
        <PostCard
          v-for="post in $page.posts.edges"
          :key="post.node.id"
          :post="post.node"
        />
      </div>
    </section>
  </VLayout>
</template>

<script>
export default {
  components: {
    VLayout: () => import('@/layouts/VLayout'),
    PostCard: () => import('@/components/v2/PostCard')
  }
}
</script>

<page-query>
query ($page: Int) {
  posts: allPost(filter: { published: { eq: true }}, perPage: 10, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
      totalItems
    }
    edges {
      node {
        id
        title
        date (format: "YYYY년 MMMM DD일", locale: "ko")
        timeToRead
        description
        path
        cover_image (width: 250, height: 250, blur: 4)
        content
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>

<style lang="postcss" scoped>
.section-1 {
  @apply flex justify-center p-6 relative;
}

.posts-wrap {
  max-width: 800px;
  @apply flex flex-col;
}

@screen lg {
  .section-1 {
    width: calc(100% - var(--aside-lg-size));
    @apply float-right;
  }
}

@screen xl {
  .section-1 {
    width: calc(100% - var(--aside-xl-size));
  }
}
</style>
