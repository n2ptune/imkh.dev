<template>
  <div class="inline-block mr-2 py-1 px-2 rounded mb-1" :class="colorClass">
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: 'unknown'
    },
    colorClass: {
      type: String,
      required: false,
      default: 'bg-blue-200'
    }
  }
}
</script>
