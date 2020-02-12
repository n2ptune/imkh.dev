<template>
  <Layout class="font-display">
    <div class="my-6 py-12 container mx-auto px-4 justify-center">
      <Profile class="mx-auto" />
      <PostCard
        v-for="post in $page.posts.edges"
        :key="post.node.id"
        :post="post.node"
      />
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
    title: 'Hello, world!'
  }
}
</script>

<page-query>
query {
  posts: allPost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        path
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
</page-query>
