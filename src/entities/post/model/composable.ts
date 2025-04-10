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

export function usePost(title: string) {
  const { data, status, error } = useAsyncData('post-' + title, () =>
    queryCollection('post').where('stem', '=', title).first()
  )
  const isPending = computed(() => status.value === 'pending')

  return {
    data,
    status,
    error,
    isPending
  }
}
