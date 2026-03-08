<script setup lang="ts">
import { useContentSearch } from '../model/composable'
import { LoadingIcon } from '~/shared/icon-button'

interface SearchItem {
  id: string
  title: string
  type: 'post' | 'short'
  [key: string]: any
}

const model = defineModel({ type: String, default: '' })
const focused = ref(false)
const debouncing = ref(false)
const navigating = ref(false)

const searchTemp = ref<any>(null)

const onFocus = (_: FocusEvent) => {
  focused.value = true
}

const onBlur = (_: FocusEvent) => {
  focused.value = false
  searchTemp.value = null
}

const openWidth = '450px'
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

const { search } = useContentSearch()
const searchResult = ref<any[]>([])

// 데이터를 포스트와 메모(Short)로 그룹화하여 Nuxt UI v3 형식에 맞춤
const groupedResults = computed(() => {
  if (searchResult.value.length === 0) return []

  const posts = searchResult.value
    .filter(r => r.item.type === 'post')
    .map(r => ({ ...r.item, score: r.score }))

  const shorts = searchResult.value
    .filter(r => r.item.type === 'short')
    .map(r => ({ ...r.item, score: r.score }))

  const items: any[] = []

  if (posts.length > 0) {
    items.push({
      label: 'POSTS',
      type: 'label' as const
    })
    posts.forEach(post => {
      items.push({
        ...post,
        label: post.title // label-key 대신 기본 label 사용
      })
    })
  }

  if (shorts.length > 0) {
    items.push({
      label: 'MEMOS',
      type: 'label' as const
    })
    shorts.forEach(short => {
      items.push({
        ...short,
        label: short.title
      })
    })
  }

  return items
})

const onClickSearchItem = async (item: any) => {
  // 라벨이나 구분선 클릭 시 무시
  if (!item || item.type === 'label' || item.type === 'separator') return

  navigating.value = true
  await navigateTo(item.id)
  navigating.value = false
  searchTemp.value = null
  model.value = ''
}

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
      v-model="searchTemp"
      v-model:search-term="model"
      :loading="debouncing || navigating"
      :items="groupedResults"
      :disabled="navigating"
      size="xl"
      variant="soft"
      leading-icon="i-tabler-search"
      trailing-icon=""
      placeholder="포스트 및 메모 검색..."
      class="min-w-inherit transition-all duration-300"
      :ui="{
        base: '!min-w-[inherit] !max-w-[inherit] overflow-y-auto',
        content: 'max-h-[400px] overflow-y-auto scrollbar'
      }"
      @focus.native="onFocus"
      @focusout.native="onBlur"
      @blur="onBlur"
      @update:model-value="onClickSearchItem"
    >
      <!-- 개별 아이템 렌더링 커스텀 -->
      <template #item="{ item }: { item: any }">
        <div v-if="item.type === 'label'" class="w-full px-2 py-1">
          <span
            class="text-[10px] font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase"
          >
            {{ item.label }}
          </span>
        </div>
        <div v-else class="flex items-center gap-3 w-full py-0.5">
          <div
            class="flex-shrink-0 size-8 rounded-lg flex items-center justify-center border transition-colors"
            :class="
              item.type === 'post'
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30 text-blue-500'
                : 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30 text-amber-500'
            "
          >
            <Icon
              :name="
                item.type === 'post' ? 'i-tabler-article' : 'i-tabler-note'
              "
              class="text-lg"
            />
          </div>

          <div class="flex flex-col min-w-0 flex-1 text-left">
            <span
              class="text-sm font-medium truncate text-neutral-700 dark:text-neutral-200"
            >
              {{ item.title || item.label }}
            </span>
            <span
              v-if="item.id"
              class="text-[10px] text-neutral-400 dark:text-neutral-500 truncate font-mono"
            >
              {{ item.id }}
            </span>
          </div>

          <Icon
            name="i-tabler-chevron-right"
            class="flex-shrink-0 text-neutral-300 dark:text-neutral-600 size-4"
          />
        </div>
      </template>

      <template #empty>
        <div
          class="p-8 flex flex-col items-center justify-center text-center space-y-2"
        >
          <template v-if="!debouncing && !navigating">
            <Icon
              name="i-tabler-search-off"
              class="text-3xl text-neutral-300 dark:text-neutral-700"
            />
            <p class="text-sm text-neutral-400">검색 결과가 없습니다.</p>
          </template>
          <LoadingIcon v-else class="text-2xl" />
        </div>
      </template>
    </UInputMenu>
  </Motion>
</template>
