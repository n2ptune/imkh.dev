<template>
  <g-link :to="item.path">
    <div class="item">
      <div class="item-title">
        {{ item.title }}
      </div>
      <div class="item-desc">
        {{ item.excerpt + '...' }}
      </div>
      <div class="item-tags">
        <ul class="item-tags-container">
          <li class="tag-item" v-for="(tag, index) in item.tags" :key="index">
            {{ tag.title }}
          </li>
        </ul>
      </div>
    </div>
  </g-link>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
}
</script>

<style lang="postcss" scoped>
.item {
  @apply text-left bg-purple-200 rounded-lg p-4;

  &-title {
    @apply text-lg font-bold text-purple-800 mb-2;
  }

  &-desc {
    @apply text-purple-900 mb-5;
  }

  &-tags {
    &-container {
      & .tag-item {
        @apply inline-block mr-2 mb-2 px-4 py-1 rounded-lg
        bg-purple-800 text-white-f text-sm;
      }
    }
  }
}
</style>
