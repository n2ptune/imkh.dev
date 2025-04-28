<script setup lang="ts">
import { usePost } from '~/entities/post'
import { TagGroup } from '~/entities/tag'
import { ShareLink, LikePost } from '~/shared/icon-button'

const { data } = usePost()
const dayjs = useDayjs()

const tables = computed(() => {
  if (!data.value) return []

  return [
    {
      id: 'title',
      title: '제목',
      label: data.value.title
    },
    {
      id: 'createdAt',
      title: '작성일자',
      label: data.value.date
        ? dayjs().to(dayjs(data.value.date))
        : '알 수 없음',
      help: dayjs(data.value.date).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      id: 'tags',
      title: '태그',
      slot: 'tags'
    },
    {
      id: 'actions',
      slot: 'actions'
    }
  ]
})

const link = computed(() => {
  if (!data.value) return ''

  return `https://imkh.dev${data.value.path}`
})
</script>

<template>
  <ul class="space-y-4 text-left">
    <li v-for="item in tables" :key="item.id">
      <div class="space-y-1">
        <div
          v-if="item.title"
          class="text-base text-neutral-500 dark:text-neutral-400"
        >
          {{ item.title }}
        </div>
        <template v-if="item.slot">
          <template v-if="item.slot === 'tags'">
            <div class="flex justify-start">
              <TagGroup :tags="data?.tags || []" />
            </div>
          </template>

          <template v-else-if="item.slot === 'actions'">
            <div class="space-x-1">
              <ShareLink link="" />

              <LikePost />
            </div>
          </template>
        </template>
        <div
          v-else-if="item.label"
          class="font-bold text-3xl whitespace-pre-wrap pr-2 break-words"
          :title="item.help"
        >
          {{ item.label }}
        </div>
      </div>
    </li>
  </ul>
</template>
