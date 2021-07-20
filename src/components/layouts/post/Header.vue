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
    <div class="pb-2 text-lg">
      {{ post.description }}
    </div>
    <tag-list :tag="post.tags" />
  </header>
</template>

<script>
import TimeRead from '@/components/mixins/TimeReadMixins'
import TagList from '@/components/tag/List.vue'

export default {
  components: {
    TagList
  },

  props: {
    post: {
      type: Object
    }
  },

  mixins: [TimeRead]
}
</script>

<style lang="postcss" scoped>
header {
  @apply mx-auto pb-12 border-b border-elevation-500 w-full;
}

@screen lg {
  header {
    width: 750px;
  }
}
</style>
