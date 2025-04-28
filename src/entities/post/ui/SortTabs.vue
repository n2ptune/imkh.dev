<script setup lang="ts">
import type { TabsItem } from '#ui/types'

const tabItems = [
  {
    label: '최근 작성순'
  },
  {
    label: '이름순'
  }
] satisfies TabsItem[]

const model = defineModel({ type: String, default: '0' })
</script>

<template>
  <UTabs
    v-model="model"
    :content="false"
    :items="tabItems"
    :ui="{ indicator: 'duration-300' }"
    size="xl"
    variant="link"
  />
</template>
