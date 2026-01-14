import Fuse from 'fuse.js'

export function useContentSearch() {
  const { data: shortSearch } = useAsyncData('short-search', () =>
    queryCollectionSearchSections('short', {
      ignoredTags: ['pre']
    })
  )

  const { data: postSearch } = useAsyncData('post-search', () =>
    queryCollectionSearchSections('post', {
      ignoredTags: ['pre']
    })
  )

  const searchData = computed(() => {
    const shorts = shortSearch.value || []
    const posts = postSearch.value || []

    const mapType = (o: Record<string, any>, type: string) => ({ ...o, type })

    return [
      ...shorts
        .filter(short => short.level === 1)
        .map(short => mapType(short, 'short')),
      ...posts.filter(post => post.level === 1).map(post => mapType(post, 'post'))
    ]
  })

  // Fuse 인스턴스 메모이제이션
  const fuse = computed(() => {
    return new Fuse(searchData.value, {
      keys: ['title', 'content'],
      threshold: 0.2,
      includeMatches: true,
      includeScore: true,
      shouldSort: true,
      sortFn: (a, b) => (b.score || 0) - (a.score || 0)
    })
  })

  // 검색 실행 함수
  function search(keyword: string) {
    if (!keyword) return []
    return fuse.value.search(keyword)
  }

  return {
    search
  }
}
