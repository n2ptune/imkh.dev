import { usePost } from '~/entities/post'

export function usePostSeo() {
  const { data } = usePost()

  return useSeoMeta({
    applicationName: 'imkh.dev',
    title: data.value?.title,
    description: data.value?.description,
    titleTemplate(title) {
      return `${title} | imkh.dev`
    },
    articleAuthor: ['vue2598@gmail.com'],
    articlePublishedTime: new Date(data.value?.date || '').toISOString(),
    author: 'vue2598@gmail.com',
    ogDescription: data.value?.description,
    ogTitle: data.value?.title,
    ogLocale: 'ko_KR',
    ogSiteName: 'imkh.dev',
    ogImage: {
      url: data.value?.cover_image,
      alt: ''
    },
    ogImageUrl: data.value?.cover_image,
    robots: {
      follow: true,
      index: true,
      notranslate: true
    },
    ogType: 'article',
    twitterImage: {
      url: data.value?.cover_image,
      alt: ''
    },
    twitterTitle: data.value?.title,
    twitterDescription: data.value?.title
  })
}
