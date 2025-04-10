import { usePosts } from '~/entities/post'
import { useTags } from '~/entities/tag'
import type { CustomPostCollectionItem } from '~/shared/types'
import type { PostTagInfo, PostWithTagItem } from './type'

export function usePostsWithTag() {
  const { findTag } = useTags()
  const { data } = usePosts()
  const mappedData = computed(() => {
    if (!data.value || !data.value.length) return []

    const map = new Map<string, PostWithTagItem[]>()

    data.value.forEach(_post => {
      const post = _post as CustomPostCollectionItem
      const tag = post.meta.tags[0]

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
