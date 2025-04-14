import { type SortOption, type CustomPostCollectionItem } from '~/shared/types'

export function usePosts() {
  const { data, status, error } = useAsyncData('posts', () =>
    queryCollection('post').all()
  )
  const isPending = computed(() => status.value === 'pending')
  const sortOption = ref<SortOption>('latest')

  const sortedData = computed(() => {
    if (!data.value || !data.value.length || isPending.value || error.value)
      return []

    const shouldBeSort = data.value.slice(0) as CustomPostCollectionItem[]
    shouldBeSort.sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    )

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
  const route = useRoute()

  const { data, status, error, refresh } = useAsyncData(
    'post-' + route.params.id,
    () =>
      queryCollection('post')
        .where('stem', '=', route.params.id)
        .first() as Promise<CustomPostCollectionItem | null>
  )
  const isPending = computed(() => status.value === 'pending')

  watch(
    () => route.params.id,
    () => {
      refresh()
    }
  )

  return {
    data,
    status,
    error,
    isPending
  }
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
