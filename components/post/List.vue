<script lang="ts" setup>
import { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { useObserver } from '~~/hooks/intersection-observer'

interface Props {
  posts: Pick<ParsedContent, string>[]
}

const props = defineProps<Props>()
const infRef = ref(null)
const { createObserver } = useObserver()

onMounted(() => {
  if (infRef.value) {
    createObserver(infRef.value, entries => {
      entries.forEach(entry => {
        console.log(entry.isIntersecting)
      })
    })
  }
})
</script>

<template>
  <div class="grid grid-cols-1 gap-y-24 lg:grid-cols-3 lg:gap-12 lg:gap-y-24">
    <PostCard v-for="post in props.posts" :key="post._id" :post="post" />
  </div>
  <div ref="infRef" class="w-0 h-0 inf"></div>
</template>
