<script setup lang="ts">
import { usePostsWithTag } from '../model/composable'

const { mappedData } = usePostsWithTag()
const route = useRoute()
const container = ref<HTMLElement | null>(null)
const activeItem = ref<HTMLElement | null>(null)

function scrollToActiveItem() {
  if (container.value && activeItem.value) {
    container.value.scrollTo({
      left: 0,
      behavior: 'smooth',
      top: activeItem.value.offsetTop * 0.9 || 0
    })
  }
}

onMounted(() => {
  scrollToActiveItem()
})
</script>

<template>
  <aside
    class="sticky mt-12 top-32 max-h-[80vh] text-sm overflow-y-auto scrollbar overflow-x-hidden"
    ref="container"
  >
    <div class="space-y-4">
      <ul v-for="[tag, posts] in mappedData" :key="tag.tagName">
        <li class="font-bold mb-4">
          {{ tag.tagData.label }}
        </li>
        <li
          v-for="post in posts"
          :key="post.stem"
          class="py-1 pl-2 whitespace-nowrap text-ellipsis overflow-hidden text-gray-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-opacity duration-300 hover:underline"
          :ref="
            el => {
              if (route.params.id === post.stem) {
                activeItem = el as HTMLElement
                scrollToActiveItem()
              }
            }
          "
        >
          <NuxtLink
            :to="{ name: 'id', params: { id: post.stem } }"
            exact-active-class="font-bold text-black dark:text-white"
          >
            {{ post.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>
