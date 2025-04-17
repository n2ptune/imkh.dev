import type { ShortCollectionItem } from '@nuxt/content'
import { useCollectionByOne } from '~/shared/composables/useCollectionByOne'

export function useShorts() {
  const { data, status, error } = useAsyncData('shorts', () =>
    queryCollection('short').where('published', '=', true).all()
  )

  return {
    data,
    isPending: computed(() => status.value === 'pending'),
    error
  }
}

export function useShort() {
  return useCollectionByOne<ShortCollectionItem>('short')
}
