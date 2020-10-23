<template>
  <header class="mb-12 break-words">
    <div class="text-white-300 mb-4 text-sm space-x-2">
      <span class="text-white-700">
        읽는 데 {{ post.timeToRead }}분
        <span class="text-white-f">
          {{ toReadLevel(post.timeToRead) }}
        </span>
      </span>
      <span class="italic float-right">
        {{ post.date }}
      </span>
    </div>
    <div class="text-white-f text-4xl font-bold leading-tight mb-4">
      {{ post.title }}
    </div>
    <ul class="space-x-2 space-y-1">
      <li
        v-for="tag in post.tags"
        :key="tag.id"
        class="inline-block rounded py-1 px-3 text-sm transition-colors duration-300 text-white-500 bg-elevation-500 hover:bg-elevation-800 hover:text-white-800"
      >
        <g-link :to="tag.path">
          {{ tag.title }}
        </g-link>
      </li>
    </ul>
  </header>
</template>

<script>
import TimeRead from '@/components/mixins/TimeReadMixins'

export default {
  props: {
    post: {
      type: Object
    }
  },

  mixins: [TimeRead]
}
</script>
