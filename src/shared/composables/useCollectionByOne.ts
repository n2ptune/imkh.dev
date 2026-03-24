import type { Collections } from '@nuxt/content'

export function useCollectionByOne<T>(collectionName: keyof Collections) {
  const route = useRoute()

  // route.path를 기준으로 쿼리: post는 /slug, short는 /s/slug 형태로 path가 stem과 일치
  const currentPath = computed(() => route.path)

  const data = useState<T | null>(`${collectionName}-shared-data`, () => null)
  const status = useState<'idle' | 'pending' | 'success' | 'error'>(`${collectionName}-shared-status`, () => 'idle')
  const error = useState<Error | null>(`${collectionName}-shared-error`, () => null)

  const fetchData = async (targetPath: string) => {
    if (!targetPath || status.value === 'pending') return

    // 이미 같은 경로의 데이터를 가지고 있다면 스킵 (캐싱)
    if (data.value && (data.value as any).path === targetPath) return

    status.value = 'pending'
    error.value = null
    try {
      const result = await queryCollection(collectionName)
        .where('path', '=', targetPath)
        .first() as T | null

      data.value = result
      status.value = 'success'
    } catch (e) {
      status.value = 'error'
      error.value = e instanceof Error ? e : new Error(String(e))
      console.error(`Fetch error [${collectionName}]:`, e)
    }
  }

  if (import.meta.server) {
    onServerPrefetch(async () => {
      await fetchData(currentPath.value)
    })
  } else {
    watch(currentPath, (newPath) => {
      fetchData(newPath)
    }, { immediate: true })
  }

  return {
    data: readonly(data),
    status: readonly(status),
    error: readonly(error),
    isPending: computed(() => status.value === 'pending'),
    refresh: () => fetchData(currentPath.value)
  }
}
