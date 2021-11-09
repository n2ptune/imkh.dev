<template>
  <div class="mt-3">
    <ul class="space-x-2 space-y-1">
      <li v-for="tag in sortedTags" :key="tag.id" class="tag">
        <g-link :to="tag.path">
          {{ tag.id }}
        </g-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Array,
      required: true
    }
  },

  computed: {
    sortedTags() {
      const sorted = this.tag.slice()
      sorted.sort((a, b) => (a.id > b.id ? 1 : -1))

      return sorted
    }
  }
}
</script>

<style lang="postcss" scoped>
.tag {
  @apply inline-block rounded py-1 px-3 text-sm transition-colors duration-300
  text-accent-main bg-accent-bg;

  &:hover {
    @apply text-accent-light bg-accent-bgl;
  }
}
</style>
