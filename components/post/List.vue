<script lang="ts" setup>
import { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { useObserver } from '~~/hooks/intersection-observer'

interface Props {
  posts: Pick<ParsedContent, string>[]
  allLoaded: boolean
}

interface Emits {
  (e: 'load-more'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const infRef = ref(null)
const { createObserver, removeObserver } = useObserver({
  threshold: 0.2
})

watch(
  () => props.allLoaded,
  loaded => {
    if (loaded) {
      removeObserver()
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (infRef.value) {
    createObserver(infRef.value, entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          emits('load-more')
        }
      })
    })
  }
})
</script>

<template>
  <div class="grid grid-cols-1 gap-y-24 lg:grid-cols-3 lg:gap-12 lg:gap-y-24">
    <PostCard v-for="post in props.posts" :key="post._id" :post="post" />
  </div>
  <div ref="infRef" class="w-1 h-1 inf"></div>
</template>
