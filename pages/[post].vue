<script lang="ts" setup>
definePageMeta({
  layout: 'post-layout'
})

const route = useRoute()
const query = queryContent('posts')
const { data } = await useAsyncData('posts', () =>
  query.where({ _id: `content:posts:${route.params.post}.md` }).findOne()
)
</script>

<template>
  <section class="flex justify-center">asff</section>
  <section v-if="data" class="prose prose-invert mx-auto">
    <ContentRenderer :value="data" />
  </section>
</template>
