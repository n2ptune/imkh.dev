<script lang="ts" setup>
import { usePageStore } from '~~/store/page'

type TagMapItem = {
  count: number
  tagName: string
}

const pageStore = usePageStore()
const tags = computed<TagMapItem[]>(() => {
  if (!pageStore.allPosts.length) return []

  const tagMap = new Map<string, TagMapItem>()

  pageStore.allPosts.forEach(post => {
    if (post.tags && post.tags.length) {
      post.tags.forEach((tag: string) => {
        const map = tagMap.get(tag)
        if (!map) {
          tagMap.set(tag, {
            count: 1,
            tagName: tag
          })
        } else {
          map.count++
        }
      })
    }
  })

  const tags = Array.from(tagMap.values())
  tags.sort((a, b) => b.count - a.count)

  return tags
})
</script>

<template>
  <aside
    class="hidden space-y-6 lg:block sticky top-28 max-h-[500px] min-w-[250px]"
  >
    <h2 class="text-xl font-bold">태그 ({{ tags.length }})</h2>
    <ul class="overflow-y-auto space-y-1 max-h-full pr-4 hover:scrollbar-thin">
      <li
        v-for="tag in tags"
        :key="tag.tagName"
        class="px-4 transition-all duration-300 hover:translate-x-1 hover:opacity-100 font-semibold rounded-lg opacity-50 cursor-pointer"
      >
        <NuxtLink :to="`/tag/${tag.tagName}`"
          >{{ tag.tagName }} / {{ tag.count }}</NuxtLink
        >
      </li>
    </ul>
  </aside>
</template>
