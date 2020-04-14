<template>
  <VLayout>
    <section class="section-1">
      <!-- Post List -->
      <div class="posts-wrap">
        <PostCard v-for="post in posts" :key="post.node.id" :post="post.node" />
        <ClientOnly>
          <infinite-loading @infinite="loadingHandler" spinner="bubbles" />
        </ClientOnly>
      </div>
    </section>
  </VLayout>
</template>

<script>
export default {
  data: () => ({
    currentPage: 1,
    posts: []
  }),

  components: {
    VLayout: () => import('@/layouts/VLayout'),
    PostCard: () => import('@/components/v2/PostCard')
  },

  created() {
    this.posts.push(...this.$page.posts.edges)
  },

  methods: {
    async loadingHandler($state) {
      if (this.currentPage + 1 > this.$page.posts.pageInfo.totalPages) {
        $state.complete()
      } else {
        const { data } = await this.$fetch(`/v2/${this.currentPage + 1}`)
        if (data.posts.edges.length) {
          this.currentPage = data.posts.pageInfo.currentPage
          this.posts.push(...data.posts.edges)
          $state.loaded()
        } else {
          $state.complete()
        }
      }
    }
  }
}
</script>

<page-query>
query ($page: Int) {
  posts: allPost(filter: { published: { eq: true }}, perPage: 5, page: $page) @paginate {
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
        cover_image (width: 800, height: 300, blur: 4)
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
