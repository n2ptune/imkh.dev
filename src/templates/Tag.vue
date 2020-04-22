<template>
  <VLayout class="font-display">
    <PostSection>
      <CardsHeader
        title="tag"
        :tagName="$page.tag.title"
        :count="$page.tag.belongsTo.totalCount"
      />
      <PostCard
        v-for="post in $page.tag.belongsTo.edges"
        :key="post.node.id"
        :post="post.node"
        class="my-6"
      />
    </PostSection>
  </VLayout>
</template>

<script>
import PostCard from '@/components/v2/PostCard.vue'
import PostSection from '@/components/v2/PostSection.vue'
import CardsHeader from '@/components/v2/CardsHeader.vue'

export default {
  metaInfo() {
    return {
      title: this.$page.tag.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.tag.title + '와 관련된 태그'
        },
        {
          key: 'og:title',
          property: 'og:title',
          content: this.$page.tag.title
        },
        {
          key: 'og:description',
          property: 'og:description',
          content: this.$page.tag.title + '와 관련된 태그'
        },
        {
          key: 'og:url',
          property: 'og:url',
          content: 'https://imkh.dev' + this.$page.tag.path
        }
      ]
    }
  },

  components: {
    PostCard,
    PostSection,
    CardsHeader
  }
}
</script>

<page-query>
query Tag ($id: ID!) {
  tag (id: $id) {
    path
    title
    belongsTo {
      totalCount
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
