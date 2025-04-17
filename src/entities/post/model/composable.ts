import type { PostCollectionItem } from '@nuxt/content'
import { type SortOption } from '~/shared/types'
import { useCollectionByOne } from '~/shared/composables/useCollectionByOne'

export function usePosts() {
  const { data, status, error } = useAsyncData('posts', () =>
    queryCollection('post').where('published', '=', true).all()
  )
  const isPending = computed(() => status.value === 'pending')
  const sortOption = ref<SortOption>('latest')

  const sortedData = computed(() => {
    if (!data.value || !data.value.length || isPending.value || error.value)
      return []

    const sortFn = (a: PostCollectionItem, b: PostCollectionItem) => {
      if (sortOption.value === 'latest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortOption.value === 'name') {
        return b.title > a.title ? -1 : b.title < a.title ? 1 : 0
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }

    const shouldBeSort = data.value.slice(0)
    shouldBeSort.sort((a, b) => sortFn(a, b))

    return shouldBeSort
  })

  function changeSort(option: SortOption) {
    sortOption.value = option
  }

  return {
    sortedData,
    data,
    error,
    status,
    isPending,
    sortOption,
    changeSort
  }
}

export function usePost() {
  return useCollectionByOne<PostCollectionItem>('post')
}

export function useToc() {
  const { data } = usePost()

  return {
    toc: computed(() => {
      if (!data.value) return []
      return data.value.body.toc?.links || []
    })
  }
}
