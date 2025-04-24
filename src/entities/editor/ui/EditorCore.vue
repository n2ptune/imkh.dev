<script setup lang="ts">
import { basicSetup } from 'codemirror'
import { EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'

const el = useCurrentElement()
const view = ref<EditorView | null>(null)

watch(
  () => el.value,
  el => {
    if (import.meta.client && el) {
      setupEditor(el as HTMLDivElement)
    }
  },
  { immediate: true }
)

function setupEditor(el: HTMLElement) {
  view.value = new EditorView({
    doc: 'Start Document',
    parent: el,
    extensions: [basicSetup]
  })

  view.value.state.update()
}
</script>

<template>
  <div ref="el" id="editor-core" class="overflow-auto"></div>
</template>
