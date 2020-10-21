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
            <g-link :to="tag.path">
              {{ tag.title }}
            </g-link>
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
  @apply text-left bg-elevation-300 rounded-lg p-4
  transition-transform duration-300;

  &:hover {
    @apply transform -translate-y-2;

    & .item-title {
      @apply text-white-900;
    }

    & .item-desc {
      @apply text-white-700;
    }
  }

  &-title {
    @apply text-lg font-bold text-white-700 mb-2
    transition-colors duration-300;
  }

  &-desc {
    @apply text-white-500 mb-5 transition-colors duration-300;
  }

  &-tags {
    &-container {
      & .tag-item {
        @apply inline-block mr-2 mb-2 px-4 py-1 rounded-lg
        bg-elevation-500 text-white-500 text-sm
        transition-colors duration-300;

        &:hover {
          @apply text-white-800;
        }
      }
    }
  }
}
</style>
