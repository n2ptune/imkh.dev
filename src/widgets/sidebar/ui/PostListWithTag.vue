<script setup lang="ts">
import {  usePostWithTag } from '../model/composable'

const { filteredMappedData } = usePostWithTag()
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
  <div
    class="[--shadow-color:white] dark:[--shadow-color:var(--color-neutral-900)] after:content-['_'] after:block after:absolute after:bottom-0 after:w-full after:h-24 after:bg-[linear-gradient(to_top,var(--shadow-color),transparent)] after:pointer-events-none overflow-y-hidden relative"
    ref="container"
  >
    <div class="space-y-4 scrollbar scrollbar-active:z-50 overflow-y-auto max-h-[500px] pb-12">
      <div class="sticky top-0 w-full bg-white dark:bg-neutral-900 py-2">
        <h4 class="font-bold text-base sticky top-0">같은 태그의 다른 글</h4>
      </div>

        <ul v-for="[tag, posts] in filteredMappedData" :key="tag.tagName">
          <li v-if="tag.tagData" class="font-bold mb-2">
            {{ tag.tagData.label }}
          </li>
          <li
            v-for="post in posts"
            :key="post.stem"
            class="py-0.5 pl-1 pr-12 whitespace-nowrap text-ellipsis overflow-hidden text-gray-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-opacity duration-300 hover:underline"
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
  </div>
</template>
