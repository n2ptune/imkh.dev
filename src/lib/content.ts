import { ParsedContent } from '@nuxt/content/dist/runtime/types'

export function useContentByPath() {
  const content = ref<ParsedContent | null>(null)
  const query = queryContent()
  const route = useRoute()

  query
    .where({
      _path: { $eq: route.path }
    })
    .findOne()
    .then(result => (content.value = result))

  return content
}
