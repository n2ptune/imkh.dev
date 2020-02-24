<template>
  <Layout class="font-display">
    <div class="my-6 py-12 container mx-auto px-4 justify-center">
      <Profile class="mx-auto" />
      <PostCard
        v-for="post in posts"
        :key="post.node.id"
        :post="post.node"
        class="my-6"
      />
      <ClientOnly>
        <infinite-loading @infinite="loadingHandler" spinner="bubbles">
          <div class="flex items-center justify-center" slot="no-more">
            <font-awesome
              :icon="['fas', 'times-circle']"
              size="lg"
              class="mr-2"
            />
            더이상 포스트가 없습니다 T^T
          </div>
        </infinite-loading>
      </ClientOnly>
    </div>
  </Layout>
</template>

<script>
import PostCard from '@/components/post/PostCard.vue'
import Profile from '@/components/Profile.vue'

export default {
  components: {
    PostCard,
    Profile
  },
  metaInfo: {
    title: 'Blog Home'
  },
  data: () => ({
    posts: [],
    currentPage: 1
  }),
  created() {
    this.posts.push(...this.$page.posts.edges)
  },
  methods: {
    async loadingHandler($state) {
      if (this.currentPage + 1 > this.$page.posts.pageInfo.totalPages) {
        $state.complete()
      } else {
        const { data } = await this.$fetch(`/${this.currentPage + 1}`)
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
    }
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        path
        cover_image (width: 770, height: 380, blur: 4)
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
