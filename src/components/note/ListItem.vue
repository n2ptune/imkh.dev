<template>
  <g-link :to="noteItem.path" class="wrapper">
    <div class="space-y-1 relative px-6 pt-4 pb-12">
      <div class="icon-wrap">
        <font-awesome
          class="text-white-500 group-hover:text-white-800 transition-colors duration-300"
          :icon="['far', 'sticky-note']"
        />
      </div>
      <div class="flex">
        <div
          class="ml-auto text-sm text-white-500 group-hover:text-white-800 transition-colors duration-300"
        >
          {{ noteItem.date }}
        </div>
      </div>
      <div class="text-xl font-bold">{{ noteItem.title }}</div>
      <div
        class="text-white-500 group-hover:text-white-800 transition-colors duration-300 font-thin"
      >
        {{ noteItem.excerpt }}
      </div>
    </div>
  </g-link>
</template>

<script>
export default {
  props: {
    noteItem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.wrapper {
  @apply w-full group rounded-lg border-elevation-200 border
  hover:border-elevation-900 transition-colors duration-300;

  .icon-wrap {
    top: -16px;
    left: 15px;

    @apply absolute bg-dark-surface px-2;
  }
}
</style>
