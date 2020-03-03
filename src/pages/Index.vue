<template>
  <Layout class="font-display">
    <section class="my-6 py-12 container mx-auto">
      <section class="flex flex-col md:flex-row justify-center">
        <section class="level-left mx-2">
          <Profile />
          <StatusInfo
            :countOfPost="$page.posts.pageInfo.totalItems"
            :countOfTag="$page.tags.totalCount"
          />
        </section>
        <section id="card-wrap" class="mx-2">
          <PostCard
            v-for="post in posts"
            :key="post.node.id"
            :post="post.node"
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
        </section>
        <section class="level-right mx-2">
          <TagList v-if="false" />
        </section>
      </section>
    </section>
  </Layout>
</template>

<script>
import PostCard from '@/components/post/PostCard.vue'
import Profile from '@/components/Profile.vue'
import TagList from '@/components/TagList.vue'
import StatusInfo from '@/components/StatusInfo.vue'

export default {
  components: {
    PostCard,
    Profile,
    TagList,
    StatusInfo
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
      totalItems
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
  tags: allTag {
    totalCount
  }
}
</page-query>

<style lang="postcss" scoped></style>
