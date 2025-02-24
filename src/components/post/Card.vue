<script lang="ts" setup>
import type { PostCollectionItem } from '@nuxt/content'
import { useIconMap } from '~~/hooks/icons'
import { useObserver } from '~~/hooks/intersection-observer'
import { useImageStore } from '~~/store/image'

interface Props {
  post: PostCollectionItem
}

const { $dayjs } = useNuxtApp()
const { iconMap } = useIconMap()

const props = defineProps<Props>()
const imageStore = useImageStore()

const coverImage = computed(
  () => (props.post.meta.cover_image as string | null) ?? ''
)
const coverImageLoaded = ref(coverImage.value ? false : true)

if (coverImage.value && imageStore.imageMap.get(coverImage.value as string)) {
  coverImageLoaded.value = true
}

const goRoutePath = computed(() =>
  (props.post.path as string).replace('/posts', '')
)
const dateFormat = computed(() =>
  $dayjs(props.post.meta.date as string).format('LLL')
)
const hasIcon = computed(() => {
  const icons = Object.keys(iconMap)
  const tags = props.post.meta.tags as string[]

  let flag = false

  icons.forEach(icon => {
    tags.forEach((tag: string) => {
      if (tag === icon) flag = true
    })
  })

  return props.post.meta.tags && flag
})
const pickIcon = computed(() => {
  if (!hasIcon.value) return null

  let currentIcon: any

  Object.keys(iconMap).forEach(icon => {
    if (currentIcon) return
    ;(props.post.meta.tags as string[]).forEach((tag: string) => {
      if (tag === icon) {
        currentIcon = tag
        return
      }
    })
  })

  return iconMap[currentIcon]
})

const cardRef = ref<HTMLElement | null>(null)
const { createObserver, removeObserver } = useObserver()

onMounted(() => {
  if (coverImage.value && cardRef.value) {
    const image = new Image()
    image.src = coverImage.value as string

    image.onload = () => {
      imageStore.imageMap.set(coverImage.value as string, true)
    }

    createObserver(cardRef.value, entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          coverImageLoaded.value = true
          removeObserver()
        }
      })
    })
  }
})

const { $colorMode } = useNuxtApp()
</script>

<template>
  <NuxtLink :to="goRoutePath">
    <div
      ref="cardRef"
      class="min-h-[300px] rounded-lg cursor-pointer space-y-4"
    >
      <div
        v-if="coverImage"
        class="lazy-image"
        :class="{ loaded: coverImageLoaded }"
      >
        <div class="lazy-image-wrap">
          <img
            :src="coverImage"
            :alt="coverImage"
            class="transition-transform duration-100 hover:-translate-y-1 object-cover rounded-lg max-h-[200px] w-full will-change-transform"
          />
        </div>
      </div>
      <Icon
        v-else-if="hasIcon && pickIcon"
        :name="$colorMode.value === 'dark' ? pickIcon.dark : pickIcon.light"
        size="40"
      />
      <div class="space-y-2">
        <div class="text-xs font-light text-slate-700 dark:text-gray-400">
          {{ dateFormat }}
        </div>
        <div class="text-xl font-bold">
          {{ props.post.title }}
        </div>
        <div class="text-base">
          {{ props.post.description }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="postcss" scoped>
.lazy-image {
  @apply relative;

  .lazy-image-wrap {
    @apply transition-opacity duration-300;
  }

  &:not(.loaded) {
    .lazy-image-wrap {
      @apply opacity-0;
    }

    &::before {
      content: '';

      @apply absolute w-full h-full bg-slate-100 dark:bg-neutral-900 rounded-lg block animate-pulse opacity-100;
    }
  }

  &.loaded {
    .lazy-image-wrap {
      @apply opacity-100;
    }
  }
}
</style>
