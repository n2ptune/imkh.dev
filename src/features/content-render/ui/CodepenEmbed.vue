<script setup lang="ts">
interface Props {
  hash: string
  user: string
  title?: string
  defaultTab?: string[]
  height?: number
}

const {
  hash,
  user,
  title = '',
  defaultTab = ['result'],
  height = 300
} = defineProps<Props>()

useScript({
  async: true,
  src: 'https://public.codepenassets.com/embed/index.js'
})
</script>

<template>
  <p
    class="codepen"
    :data-height="height"
    :data-default-tab="defaultTab.join(',')"
    :data-slug-hash="hash"
    :data-pen-title="title"
    :data-user="user"
    :style="{
      height: `${height}px`,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid',
      margin: '1em 0',
      padding: '1em'
    }"
  >
    <span
      >See the Pen
      <a :href="`https://codepen.io/${user}/pen/${hash}`"> {{ title }}</a> by
      {{ user }} (<a :href="'https://codepen.io/' + user">@{{ user }}</a
      >) on <a href="https://codepen.io">CodePen</a>.</span
    >
  </p>
</template>
