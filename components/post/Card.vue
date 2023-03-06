<script lang="ts" setup>
import { ParsedContent } from '@nuxt/content/dist/runtime/types'
import dayjs from 'dayjs'
import { useIconMap } from '~~/hooks/icons'

interface Props {
  post: Pick<ParsedContent, string>
}

const { iconMap } = useIconMap()

const props = defineProps<Props>()
const goRoutePath = computed(() =>
  (props.post._path as string).replace('/posts', '')
)
const dateFormat = computed(() => dayjs(props.post.date).format('LLL'))
const hasIcon = computed(() => {
  const icons = Object.keys(iconMap)
  const tags = props.post.tags

  let flag = false

  icons.forEach(icon => {
    tags.forEach((tag: string) => {
      if (tag === icon) flag = true
    })
  })

  return props.post.tags && flag
})
const pickIcon = computed(() => {
  if (!hasIcon.value) return null

  let currentIcon: any

  Object.keys(iconMap).forEach(icon => {
    if (currentIcon) return
    props.post.tags.forEach((tag: string) => {
      if (tag === icon) {
        currentIcon = tag
        return
      }
    })
  })

  return iconMap[currentIcon]
})
</script>

<template>
  <NuxtLink :to="goRoutePath">
    <div class="min-h-[300px] rounded-lg cursor-pointer space-y-4">
      <div v-if="props.post.cover_image">
        <img
          :src="props.post.cover_image"
          :alt="props.post.cover_image"
          class="transition-transform duration-100 hover:-translate-y-1 object-cover rounded-lg max-h-[150px] w-full"
        />
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
