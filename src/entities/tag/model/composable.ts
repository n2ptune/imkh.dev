export function useTags() {
  const { data } = useAsyncData('tags', () => queryCollection('tag').first())
  const tags = computed(() => {
    if (!data.value) return []

    return Object.keys(data.value.tags).map(tagName => {
      const tag = data.value!.tags[tagName as keyof typeof data.value.tags]
      return { tagName, label: tag.label, description: tag.description }
    })
  })

  const findTag = computed(
    () => (tag: string) => tags.value.find(_tag => _tag.tagName === tag)
  )

  function tagNameToPrettyName(tagName: string) {
    const tag = findTag.value(tagName)
    if (!tag) return ''

    return tag.label
  }

  return {
    data,
    tags,
    findTag,
    tagNameToPrettyName
  }
}
