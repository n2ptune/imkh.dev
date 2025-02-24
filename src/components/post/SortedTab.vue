<script setup lang="ts">
import type { SortOption } from '~/types/post'

type Emits = {
  sort: [SortOption]
}

const model = defineModel({
  type: String as PropType<SortOption>,
  default: 'newer'
})
const sortOptions = ref<SortOption[]>(['newer', 'older'])
const sortOptionKorMap: Record<SortOption, string> = {
  newer: '최근 게시글순',
  older: '오래된 게시글순'
}

const emits = defineEmits<Emits>()
</script>

<template>
  <div class="mb-12 px-2">
    <span
      v-for="(so, index) in sortOptions"
      :key="so"
      :class="model === so && 'group active'"
    >
      <span
        class="group-[&.active]:text-black group-[&.active]:dark:text-white group-[&.active]:font-bold text-gray-500 dark:text-gray-400 text-lg cursor-pointer transition-colors duration-300 hover:text-black dark:hover:text-white"
        @click.stop="emits('sort', so)"
        >{{ sortOptionKorMap[so] }}</span
      >
      <span
        v-if="sortOptions.length - 1 !== index"
        class="mx-4 text-gray-300 dark:text-gray-400 text-lg"
        >|</span
      >
    </span>
  </div>
</template>
