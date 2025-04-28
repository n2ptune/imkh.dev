import type { ShortCollectionItem } from '@nuxt/content'
import { useCollectionByOne } from '~/shared/composables/useCollectionByOne'

export function useShorts() {
  const {
    data: origin,
    status,
    error
  } = useAsyncData('shorts', () =>
    queryCollection('short').where('published', '=', true).all()
  )

  const sortedData = computed(() => {
    if (!origin.value || error.value) return []

    const copy = origin.value.slice(0)
    copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return copy
  })

  return {
    data: sortedData,
    isPending: computed(() => status.value === 'pending'),
    error
  }
}

export function useShort() {
  return useCollectionByOne<ShortCollectionItem>('short')
}
