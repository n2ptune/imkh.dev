<template>
  <DefaultLayout>
    <FullWidthImage />
    <Section>
      <List :notes="notes" />
      <ClientOnly>
        <infinite-loading
          @infinite="loadingHandler"
          spinner="bubbles"
          style="width: 100%"
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
import List from '@/components/note/List.vue'

export default {
  metaInfo: () => ({
    title: '',
    titleTemplate: 'Note | imkh.dev',
    meta: [
      {
        key: 'og:title',
        property: 'og:title',
        content: 'Note'
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
        content: 'https://imkh.dev/note'
      }
    ]
  }),
  components: { DefaultLayout, Section, FullWidthImage, List },
  created() {
    this.notes = this.$page.notes.edges.map(edge => edge.node)
  },
  methods: {
    async loadingHandler($state) {
      if (this.currentPage + 1 > this.$page.notes.pageInfo.totalPages) {
        $state.complete()
      } else {
        const { data } = await this.$fetch(`/note/${this.currentPage + 1}`)
        if (data.notes.edges.length) {
          const collections = data.notes.edges.map(edge => edge.node)
          this.currentPage = data.notes.pageInfo.currentPage
          this.notes = this.notes.concat(collections)
          $state.loaded()
        } else {
          $state.complete()
        }
      }
    }
  },
  data: () => ({
    currentPage: 1,
    notes: []
  })
}
</script>

<page-query>
query ($page: Int) {
  notes: allNote(perPage: 6, page: $page) @paginate {
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
