<template>
  <g-link :to="noteItem.path" class="w-full group">
    <div class="space-y-1">
      <div class="flex justify-between">
        <div>
          <span class="mr-2">
            <font-awesome
              class="text-white-500 group-hover:text-white-800 transition-colors duration-300"
              :icon="['far', 'sticky-note']"
            />
          </span>
        </div>
        <div
          class="text-sm text-white-500 group-hover:text-white-800 transition-colors duration-300"
        >
          {{ noteItem.date }}
        </div>
      </div>
      <div class="text-xl font-bold">{{ noteItem.title }}</div>
      <div
        class="text-white-500 group-hover:text-white-800 transition-colors duration-300"
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
