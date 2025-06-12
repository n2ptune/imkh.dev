<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import { LoadingShield, SkeletonBlock } from '~/widgets/loading'

interface Props {
  level: number
  links: TocLink[]
}

const { level, links } = defineProps<Props>()
const isRoot = computed(() => level === 0)

const paddingByLevel = computed(() => {
  return (
    {
      0: 'pl-0',
      1: 'pl-4',
      2: 'pl-8',
      3: 'pl-12',
      4: 'pl-16'
    }[level] || 'pl-0'
  )
})

const borderLeft = computed(() => {
  return isRoot.value
    ? 'pl-4 border-l border-neutral-200 dark:border-neutral-800'
    : ''
})
</script>

<template>
  <LoadingShield :condition="!!links.length">
    <ul
      v-bind="$attrs"
      v-if="isRoot"
      class="pb-2 text-base"
      :class="[borderLeft]"
    >
      <li class="font-bold">
        <div class="flex items-center space-x-1">
          <Icon name="i-solar-notebook-minimalistic-bold-duotone" />
          <span>목차</span>
        </div>
      </li>
    </ul>

    <ul
      v-for="link in links"
      class="text-sm transition-colors duration-300 text-neutral-400 dark:text-neutral-500 dark:hover:text-white hover:text-black"
      :class="[borderLeft]"
    >
      <li :class="paddingByLevel">
        <a :href="'#' + link.id">{{ link.text }}</a>
      </li>
      <template v-if="link.children">
        <li>
          <TableContents :level="level + 1" :links="link.children" />
        </li>
      </template>
    </ul>

    <template v-if="isRoot" #loading>
      <div v-bind="$attrs" class="space-y-2">
        <SkeletonBlock class="w-full h-[30px]" />
        <SkeletonBlock class="h-[20px]" />
        <SkeletonBlock class="h-[20px] mr-8" />
        <SkeletonBlock class="h-[20px] mr-14" />
      </div>
    </template>
  </LoadingShield>
</template>
