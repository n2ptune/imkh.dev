<script lang="ts" setup>
definePageMeta({
  layout: 'post-layout'
})

useHead({
  script: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3441377677018772',
      async: true,
      crossorigin: 'anonymous'
    }
  ]
})

const route = useRoute()
const router = useRouter()
const query = queryContent('posts')
const data = ref<any>(null)
const getData = async () => {
  try {
    const result = await query
      .where({ _id: `content:posts:${route.params.post}.md` })
      .findOne()
    return result
  } catch (error) {
    router.replace({ path: '/404' })
    throw createError({ statusCode: 404, statusMessage: '404' })
  }
}

getData().then(result => (data.value = result))
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
  <PostLoadingPlaceholder v-else />
</template>
