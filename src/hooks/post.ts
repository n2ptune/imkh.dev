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

export function usePostAction() {
  const pageStore = usePageStore()

  function loadMore() {
    pageStore.currentPage++
  }

  function setDelay() {
    pageStore.delayLoadPage = true

    setTimeout(() => (pageStore.delayLoadPage = false), __PAGE_DELAY__)
  }

  return {
    loadMore,
    setDelay
  }
}

export async function usePost(tag?: string) {
  const pageStore = usePageStore()
  const { data } = await useAsyncData('getPosts' + tag, async () => {
    const posts = await queryContent('posts')
      .only(__INDEX_POSTS_PROPS__)
      .where({ published: true })
      .sort({ date: -1 })
      .find()
    pageStore.allPosts = posts
    pageStore.totalCount = posts.length

    if (tag) {
      return posts.filter(post => {
        if (post.tags && post.tags.length) {
          return post.tags.includes(tag)
        }
        return false
      })
    }

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

  return { posts: data, postsWithPaging, allLoaded }
}
