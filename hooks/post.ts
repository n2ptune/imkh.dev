import { usePageStore } from '~~/store/page'

export const __INDEX_POSTS_PROPS__ = [
  'cover_image',
  'date',
  'description',
  'published',
  'tags',
  'title',
  '_path'
]

const __PAGE_DELAY__ = 150

export async function usePost() {
  const pageStore = usePageStore()
  const { data } = await useAsyncData('getPosts', async () => {
    const posts = await queryContent('posts')
      .only(__INDEX_POSTS_PROPS__)
      .where({ published: true })
      .sort({ date: -1 })
      .find()
    pageStore.allPosts = posts as any[]
    pageStore.totalCount = posts.length
    return posts
  })
  const postsWithPaging = computed(() => {
    if (!data.value) return []
    const [start, end] = pageStore.currentPageRange
    return data.value.slice(start, end)
  })
  const allLoaded = computed(() => {
    if (!data.value?.length) return false
    return postsWithPaging.value.length >= data.value.length
  })

  function loadMore() {
    pageStore.currentPage++
  }

  function setDelay() {
    pageStore.delayLoadPage = true

    setTimeout(() => (pageStore.delayLoadPage = false), __PAGE_DELAY__)
  }

  return { posts: data, postsWithPaging, allLoaded, loadMore, setDelay }
}
