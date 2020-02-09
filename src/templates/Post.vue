<template>
  <Layout>
    <div></div>
  </Layout>
</template>

<script>
import Layout from '@/layouts/Default.vue'

export default {
  components: {
    Layout
  },
  mounted() {
    console.log(this.$page.post)
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
