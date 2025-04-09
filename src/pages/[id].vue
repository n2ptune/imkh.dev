<script setup lang="ts">
import { usePost } from '~/entities/post'

const route = useRoute()
const { data } = usePost(route.params.id as string)
</script>

<template>
  <ContentRenderer v-if="data" :value="data" class="prose" />
</template>
