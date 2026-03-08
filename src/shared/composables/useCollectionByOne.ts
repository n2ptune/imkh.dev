import type { Collections } from '@nuxt/content'

export function useCollectionByOne<T>(collectionName: keyof Collections) {
  const route = useRoute()
  const id = computed(() => route.params.id as string)

  // 전역 상태를 사용하여 중복 패칭 및 무한 루프 방지
  const data = useState<T | null>(`${collectionName}-shared-data`, () => null)
  const status = useState<'idle' | 'pending' | 'success' | 'error'>(`${collectionName}-shared-status`, () => 'idle')

  const fetchData = async (targetId: string) => {
    if (!targetId || status.value === 'pending') return
    
    // 이미 같은 데이터를 가지고 있다면 스킵 (캐싱)
    if (data.value && (data.value as any).stem === targetId) return

    status.value = 'pending'
    try {
      const result = await queryCollection(collectionName)
        .where('stem', '=', targetId)
        .first() as T | null
      
      data.value = result
      status.value = 'success'
    } catch (e) {
      status.value = 'error'
      console.error(`Fetch error [${collectionName}]:`, e)
    }
  }

  // 클라이언트/서버 공통: ID 변경 시 데이터 패칭
  // watch를 직접 사용하여 useAsyncData의 내부 watch 루프 간섭을 제거
  if (import.meta.server) {
    // SSR 시점 실행
    onServerPrefetch(async () => {
      await fetchData(id.value)
    })
  } else {
    // 클라이언트 시점 실행
    watch(id, (newId) => {
      fetchData(newId)
    }, { immediate: true })
  }

  return {
    data: readonly(data),
    status: readonly(status),
    isPending: computed(() => status.value === 'pending'),
    refresh: () => fetchData(id.value)
  }
}
