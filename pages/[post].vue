<script lang="ts" setup>
definePageMeta({
  layout: 'post-layout'
})

const route = useRoute()
const query = queryContent('posts')
const data = await query
  .where({ _id: `content:posts:${route.params.post}.md` })
  .findOne()
</script>

<template>
  <section v-if="data">
    <PostTitleSection
      :title="(data.title as string)"
      :created_at="(data.date as string | number)"
      :tags="(data.tags as string[])"
    />
    <PostProseBody :content="data" />
    <ClientOnly>
      <PostComment />
    </ClientOnly>
  </section>
</template>
