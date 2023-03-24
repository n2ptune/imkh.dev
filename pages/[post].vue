<script lang="ts" setup>
definePageMeta({
  layout: 'post-layout'
})

const route = useRoute()
const router = useRouter()
const query = queryContent('posts')
// const data = ref<any>(null)
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

const data = await getData()

useHeadSafe({
  title: data.title
})
</script>

<template>
  <!-- 여기 Suspense 감싸는 걸로 바꿔야함 하위 모든 컴포넌트를 감싸는 wrapper 컴포넌트 필요 -->
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
