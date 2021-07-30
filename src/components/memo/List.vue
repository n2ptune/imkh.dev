<template>
  <div class="wrapper space-y-6">
    <ListItem v-for="memo in memos" :key="memo.id" :memoItem="memo" />
    <div v-if="!memos.length">
      No Data
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'

export default {
  components: {
    ListItem
  },
  props: {
    memos: {
      type: [Object, Array],
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.wrapper {
  max-width: 100%;

  @apply px-2;

  & > * + * {
    @apply border-t border-white-100 py-6;
  }
}

@screen lg {
  .wrapper {
    width: 560px;
  }
}

@screen xl {
  .wrapper {
    width: 770px;
  }
}
</style>
