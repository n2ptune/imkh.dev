<template>
  <DefaultLayout class="font-display">
    <FullWidthImage />
    <Section>
      <template #header>
        <CardsHeader :tops="topTags" :all="allTags" />
      </template>
      <PostCard
        v-for="post in $page.tag.belongsTo.edges"
        :key="post.node.id"
        :post="post.node"
        class="my-6"
      />
    </Section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue'
import PostCard from '@/components/layouts/main/PostCard.vue'
import Section from '@/components/layouts/main/Section.vue'
import CardsHeader from '@/components/layouts/tag/CardsHeader.vue'
import FullWidthImage from '@/components/layouts/main/FullWidthImage.vue'
import TagMixins from '@/components/mixins/TagMixins'

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
    DefaultLayout,
    PostCard,
    Section,
    CardsHeader,
    FullWidthImage
  },

  mixins: [TagMixins]
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
            id
            title
            date (format: "D. MMMM YYYY")
            timeToRead
            description
            path
            excerpt
            cover_image (width: 800, height: 300, blur: 4)
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
  tags: allPost {
    edges {
      node {
        tags {
          title,
          path
        }
      }
    }
  }
}
</page-query>
