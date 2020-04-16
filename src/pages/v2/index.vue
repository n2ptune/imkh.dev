<template>
  <VLayout>
    <PostSection>
      <CardsHeader :count="$page.posts.pageInfo.totalItems" title="all" />
      <PostCard v-for="post in posts" :key="post.node.id" :post="post.node" />
      <ClientOnly>
        <infinite-loading @infinite="loadingHandler" spinner="bubbles" />
      </ClientOnly>
    </PostSection>
  </VLayout>
</template>

<script>
import PostCard from '@/components/v2/PostCard.vue'
import CardsHeader from '@/components/v2/CardsHeader.vue'
import PostSection from '@/components/v2/PostSection.vue'

export default {
  data: () => ({
    currentPage: 1,
    posts: []
  }),

  components: {
    PostCard,
    CardsHeader,
    PostSection
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
