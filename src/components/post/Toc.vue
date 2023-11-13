<script setup lang="ts">
import type { Toc } from '@nuxt/content/dist/runtime/types'

interface Props {
  toc?: Toc
}

const props = defineProps<Props>()
</script>

<template>
  <!-- lg:block -->
  <div v-if="props.toc" class="hidden absolute left-0 top-0 h-full">
    <ul class="sticky top-[100px]">
      {{
        props.toc.links
      }}
    </ul>
  </div>
</template>
