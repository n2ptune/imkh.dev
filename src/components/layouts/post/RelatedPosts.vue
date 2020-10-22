<template>
  <Section>
    <div slot="header" class="text-center text-xl md:text-2xl lg:text-3xl mb-6">
      태그와 관련된 포스트입니다😊
    </div>
    <PostCard v-for="post in posts" :key="post.node.id" :post="post.node" />
  </Section>
</template>

<script>
import Section from '@/components/layouts/main/Section.vue'
import PostCard from '@/components/layouts/main/PostCard.vue'

export default {
  components: {
    Section,
    PostCard
  },

  props: {
    posts: {
      type: Array
    }
  }
}
</script>
