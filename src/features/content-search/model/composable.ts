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

  function search(keyword: string) {
    const shorts = shortSearch.value || []
    const posts = postSearch.value || []

    const mapType = (o: Record<string, any>, type: string) => ({ ...o, type })
    const mixed = (
      [] as {
        id: string
        title: string
        titles: string
        level: number
        content: string
        type: string
      }[]
    ).concat(
      // @ts-expect-error
      shorts.map(short => mapType(short, 'short')),
      posts.map(post => mapType(post, 'post'))
    )
    const fuse = new Fuse(mixed, {
      keys: ['title', 'content'],
      threshold: 0.2,
      includeMatches: true,
      includeScore: true,
      shouldSort: true,
      sortFn: (a, b) => b.score - a.score
    })

    return fuse.search(keyword)
  }

  return {
    search
  }
}
