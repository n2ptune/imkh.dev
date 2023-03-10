<script lang="ts" setup>
import dayjs from 'dayjs'

interface Props {
  title: string
  created_at: string | number
  tags: string[]
}

const props = defineProps<Props>()
const dateFormat = computed(() =>
  dayjs(new Date(props.created_at)).format('LLL')
)
</script>

<template>
  <section class="text-center mb-12 lg:mb-24">
    <p class="text-4xl font-black">{{ props.title }}</p>
    <p
      class="italic mt-2 space-x-2 text-gray-400 dark:text-gray-500 font-light"
    >
      <span>{{ dateFormat }}</span>
      <span>:</span>
      <span v-if="tags && tags.length" class="hidden lg:inline-block">
        {{ tags.join(', ') }}
      </span>
    </p>
  </section>
</template>
