<template>
  <DefaultLayout>
    <FullWidthImage />
    <Section>
      <List :memos="memos" />
      <ClientOnly>
        <infinite-loading
          @infinite="loadingHandler"
          spinner="bubbles"
          style="width: 100%;"
        >
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </ClientOnly>
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
  created() {
    this.memos = this.$page.memos.edges.map(edge => edge.node)
  },
  methods: {
    async loadingHandler($state) {
      if (this.currentPage + 1 > this.$page.memos.pageInfo.totalPages) {
        $state.complete()
      } else {
        const { data } = await this.$fetch(`/memo/${this.currentPage + 1}`)
        if (data.memos.edges.length) {
          const collections = data.memos.edges.map(edge => edge.node)
          this.currentPage = data.memos.pageInfo.currentPage
          this.memos = this.memos.concat(collections)
          $state.loaded()
        } else {
          $state.complete()
        }
      }
    }
  },
  data: () => ({
    currentPage: 1,
    memos: []
  })
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
