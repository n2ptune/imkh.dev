<script setup lang="ts">
import { useTags } from '../model/composable'

interface Props {
  tags: string[]
}

const { tags } = defineProps<Props>()
const { tagNameToPrettyName } = useTags()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <UBadge
      v-for="tag in tags"
      :key="tag"
      variant="outline"
      color="primary"
      size="md"
    >
      {{ tagNameToPrettyName(tag) }}
    </UBadge>
  </div>
</template>
