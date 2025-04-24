<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { useContentSearch } from '../model/composable'
import { LoadingIcon } from '~/shared/icon-button'

const model = defineModel({ type: String, default: '' })
const focused = ref(false)
const debouncing = ref(false)
const navigating = ref(false)

const onFocus = (_: FocusEvent) => {
  focused.value = true
}

const onBlur = (_: FocusEvent) => {
  focused.value = false
}

const openWidth = '400px'
const closeWidth = '250px'

const animateStyle = computed(() => {
  return {
    ...(focused.value
      ? {
          minWidth: openWidth,
          maxWidth: openWidth
        }
      : {
          minWidth: closeWidth,
          maxWidth: closeWidth
        })
  }
})

const onClickSearchItem = async (
  item: UnwrapRef<typeof searchResultToMenu>[number]
) => {
  navigating.value = true
  await navigateTo(item.id)
  navigating.value = false
}

const { search } = useContentSearch()
const searchResult = ref<ReturnType<typeof search>>([])
const searchResultToMenu = computed(() => {
  return searchResult.value.map(result => {
    const { type, ...rest } = result.item
    return {
      ...rest,
      _type: type,
      score: result.score,
      matches: result.matches
    }
  })
})

watch(
  () => model.value,
  text => {
    if (text) {
      debouncing.value = true
    }
  }
)

watchDebounced(
  () => model.value,
  text => {
    if (text) {
      searchResult.value = search(text)
      console.log(searchResult.value)
    } else {
      searchResult.value = []
    }
    debouncing.value = false
  },
  { debounce: 300 }
)
</script>

<template>
  <Motion as-child :animate="{ ...animateStyle }">
    <UInputMenu
      v-model:search-term="model"
      :loading="debouncing || navigating"
      :items="searchResultToMenu"
      :disabled="navigating"
      label-key="title"
      size="xl"
      variant="soft"
      leading-icon="i-tabler-search"
      trailing-icon=""
      placeholder="무엇을 찾고싶으신가요?"
      class="min-w-inherit"
      :ui="{ base: '!min-w-[inherit] !max-w-[inherit]' }"
      @focus.native="onFocus"
      @focusout.native="onBlur"
      @blur="onBlur"
      @update:model-value="onClickSearchItem"
    >
      <template #empty>
        <span v-if="!debouncing && !navigating">검색 결과가 없습니다.</span>
        <LoadingIcon v-else class="text-xl" />
      </template>
    </UInputMenu>
  </Motion>
</template>
