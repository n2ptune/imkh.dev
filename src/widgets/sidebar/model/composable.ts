import { usePost, usePosts } from '~/entities/post'
import { useTags } from '~/entities/tag'
import type { PostTagInfo, PostWithTagItem } from './type'

export function usePostsWithTag() {
  const { findTag } = useTags()
  const { data } = usePosts()
  const mappedData = computed(() => {
    if (!data.value || !data.value.length) return []

    const map = new Map<string, PostWithTagItem[]>()

    data.value.forEach(_post => {
      const post = _post
      const tag = post.tags[0]

      if (!tag) return

      const data: PostWithTagItem = {
        label: post.title,
        stem: post.stem
      }

      if (map.get(tag)) {
        map.set(tag, [...map.get(tag)!, data])
      } else {
        map.set(tag, [data])
      }
    })

    return Array.from(map.entries()).map(([tag, items]) => {
      return [{ tagName: tag, tagData: findTag.value(tag) }, items]
    }) as [PostTagInfo, PostWithTagItem[]][]
  })

  return {
    mappedData
  }
}

export function usePostWithTag() {
  const { data } = usePost()
  const { mappedData } = usePostsWithTag()
  const filteredMappedData = computed(() => {
    if (!data.value) return []

    return mappedData.value.filter(
      mapData => mapData[0].tagName === data.value?.tags[0]
    )
  })

  return {
    filteredMappedData
  }
}
