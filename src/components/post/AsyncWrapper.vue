<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const query = queryContent('posts')
const { data } = await useAsyncData('post' + route?.params?.post, async () => {
  try {
    const result = await query
      .where({ _id: `content:posts:${route.params.post}.md` })
      .findOne()
    return result
  } catch (error) {
    router.replace({ path: '/404' })
    throw createError({ statusCode: 404, statusMessage: '404' })
  }
})

useSeoMeta({
  title: data?.value?.title,
  ogTitle: () => withTitleTemplate(data?.value?.title || ''),
  ogDescription: data?.value?.description,
  ogImage: data?.value?.cover_image
    ? withUrl(data?.value?.cover_image, false)
    : '',
  ogImageWidth: 400,
  ogImageHeight: 200,
  ogUrl: withUrl((data?.value?._path as string).replace('/posts/', ''))
})
</script>

<template>
  <section v-if="data">
    <PostTitleSection
      :title="(data.title as string)"
      :created_at="(data.date as string | number)"
      :tags="(data.tags as string[])"
    />
    <ClientOnly>
      <AdsArticleAds />
    </ClientOnly>
    <PostProseBody :content="data" />
    <ClientOnly>
      <AdsArticleAds />
      <PostComment />
    </ClientOnly>
  </section>
</template>
