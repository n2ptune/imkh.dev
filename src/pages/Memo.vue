<template>
  <DefaultLayout>
    <FullWidthImage />
    <Section>
      <List :memos="memos" />
    </Section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue'
import FullWidthImage from '@/components/layouts/main/FullWidthImage.vue'
import Section from '@/components/layouts/main/Section.vue'
import List from '@/components/memo/List.vue'

export default {
  metaInfo: () => ({
    title: 'Memo',
    meta: [
      {
        key: 'og:title',
        property: 'og:title',
        content: 'Memo'
      },
      {
        key: 'og:description',
        property: 'og:description',
        content: '웹 기술/개발 블로그'
      },
      {
        key: 'description',
        name: 'description',
        content: '웹 기술/개발 블로그'
      },
      {
        key: 'og:url',
        property: 'og:url',
        content: 'https://imkh.dev/memo'
      }
    ]
  }),
  components: { DefaultLayout, Section, FullWidthImage, List },
  computed: {
    memos() {
      return this.$page.memos.edges.map(edge => edge.node)
    }
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
