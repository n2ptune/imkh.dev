<template>
  <Layout class="font-display">
    <div class="my-6 py-12 container mx-auto px-4 justify-center">
      <PostCard
        v-for="post in $page.tag.belongsTo.edges"
        :key="post.node.id"
        :post="post.node"
        class="my-6"
      />
    </div>
  </Layout>
</template>

<script>
import Layout from '@/layouts/Default.vue'
import PostCard from '@/components/post/PostCard.vue'

export default {
  components: {
    Layout,
    PostCard
  },
  created() {
    console.log(this.$page)
  }
}
</script>

<page-query>
query Tag ($id: ID!) {
  tag (id: $id) {
    title
    belongsTo {
      edges {
        node {
          ...on Post {
            title
            path
            date (format: "D. MMMM YYYY")
            timeToRead
            description
            content
            cover_image (width: 770, height: 380, blur: 10)
            tags {
              id
              title
              path
            }
          }
        }
      }
    }
  }
}
</page-query>
