<template>
  <Layout>
    asdff
  </Layout>
</template>

<script>
import Layout from '@/layouts/Default.vue'

export default {
  components: {
    Layout
  },
  mounted() {
    console.log(this.$page.tag)
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
          }
        }
      }
    }
  }
}
</page-query>
