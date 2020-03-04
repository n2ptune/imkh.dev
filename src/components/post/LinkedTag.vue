<template>
  <g-link
    class="mr-2 px-2 py-1 rounded-lg"
    :class="[bgColorClass, hoverColorClass]"
    :to="path"
  >
    {{ prefix ? '#' : '' }}{{ name }}
  </g-link>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    bgColorClass: {
      type: String,
      required: false,
      default: 'bg-blue-200'
    },
    hoverColorClass: {
      type: String,
      required: false,
      default: 'hover:bg-blue-300'
    },
    prefix: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>
