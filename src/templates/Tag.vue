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
import VLayout from '@/layouts/VLayout.vue'
import PostCard from '@/components/v2/PostCard.vue'
import PostSection from '@/components/v2/PostSection.vue'
import CardsHeader from '@/components/v2/CardsHeader.vue'

export default {
  components: {
    VLayout,
    PostCard,
    PostSection,
    CardsHeader
  }
}
</script>

<page-query>
query Tag ($id: ID!) {
  tag (id: $id) {
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
