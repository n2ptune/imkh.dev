<template>
  <DefaultLayout>
    <FullWidthImage />
    <Section>
      TODO Memo list page
    </Section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue'
import FullWidthImage from '@/components/layouts/main/FullWidthImage.vue'
import Section from '@/components/layouts/main/Section.vue'

export default {
  components: { DefaultLayout, Section, FullWidthImage },
  created() {
    console.log(this.$page.memos)
  }
}
</script>

<page-query>
query ($page: Int) {
  memos: allMemo(perPage: 6, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
      totalItems
    }
    edges {
      node {
        id
        title
        description
        path
        timeToRead
        date (format: "D. MMMM YYYY")
        excerpt
      }
    }
  }
}
</page-query>
