<script lang="ts" setup>
import { useObserver } from '~~/hooks/intersection-observer'
import { usePost } from '~~/hooks/post'
import { usePageStore } from '~~/store/page'

interface Props {
  tag?: string
}

interface Emits {
  (e: 'load-more'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const infRef = ref(null)
const pageStore = usePageStore()
const { createObserver, removeObserver } = useObserver({
  threshold: 0.05
})
const { allLoaded, postsWithPaging: posts } = await usePost(props.tag)

watch(
  () => allLoaded,
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
        if (entry.isIntersecting && pageStore.canLoadPage) {
          emits('load-more')
        }
      })
    })
  }
})
</script>

<template>
  <div class="grid grid-cols-1 gap-y-24 lg:grid-cols-3 lg:gap-12 lg:gap-y-24">
    <PostCard v-for="post in posts" :key="post._id" :post="post" />
  </div>
  <div ref="infRef" class="w-1 h-1 inf"></div>
  <div
    v-if="allLoaded"
    class="text-center text-4xl font-black py-36 text-gray-300 dark:text-[#444]"
  >
    EOF
  </div>
</template>
