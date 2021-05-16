<template>
  <div class="rounded-full bg-transparent">
    <g-image
      src="https://avatars.githubusercontent.com/u/44240708?v=4"
      class="rounded-full"
      :style="{ width }"
    />
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      required: false,
      default: '40px'
    }
  }
}
</script>
