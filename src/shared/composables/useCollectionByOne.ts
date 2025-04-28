import type { Collections } from '@nuxt/content'

export function useCollectionByOne<T>(collectionName: keyof Collections) {
  const route = useRoute()

  const { data, status, error, refresh } = useAsyncData(
    collectionName + '-' + route.path,
    () =>
      queryCollection(collectionName)
        .where('published', '=', true)
        .where('path', '=', route.path)
        .first() as Promise<T | null>
  )

  watch(
    () => route.path,
    path => {
      if (path) {
        refresh()
      }
    },
    { immediate: true }
  )

  return {
    data,
    status,
    error,
    isPending: computed(() => status.value === 'pending')
  }
}
