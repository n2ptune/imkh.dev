<script setup lang="ts">
interface Props {
  hash: string
  user: string
  title?: string
  defaultTab?: string[]
  height?: number
  description?: string
}

const {
  defaultTab = ['result'],
  description = '',
  hash,
  height = 300,
  title = '',
  user
} = defineProps<Props>()

useScript({
  async: true,
  src: 'https://public.codepenassets.com/embed/index.js'
})
</script>

<template>
  <div class="my-12">
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
        border: '2px solid'
      }"
    >
      <span
        >See the Pen
        <a :href="`https://codepen.io/${user}/pen/${hash}`"> {{ title }}</a> by
        {{ user }} (<a :href="'https://codepen.io/' + user">@{{ user }}</a
        >) on <a href="https://codepen.io">CodePen</a>.</span
      >
    </p>
    <p
      v-if="description"
      class="text-center text-neutral-600 dark:text-neutral-500"
    >
      {{ description }}
    </p>
  </div>
</template>
