<template>
  <div class="rounded-full bg-transparent">
    <g-image
      src="@/assets/profile.jpg"
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
