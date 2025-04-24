<script setup lang="ts">
import { EditorCore, EditorHeader } from '~/entities/editor'
import { TypeDivider } from '~/widgets/divider'

definePageMeta({
  layout: 'editor'
})
</script>

<template>
  <EditorHeader />
  <TypeDivider type="horizontal" />
  <div class="flex flex-nowrap h-full [&>*]:h-full">
    <EditorCore class="flex-1" />
    <TypeDivider type="vertical" />
    <EditorCore class="flex-1" />
  </div>
</template>
