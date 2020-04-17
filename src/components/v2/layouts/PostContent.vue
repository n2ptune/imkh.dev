<template>
  <section v-html="contentHTML"></section>
</template>

<script>
export default {
  props: {
    contentHTML: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
section {
  @for $i from 1 to 6 {
    & >>> h$(i) {
      @apply my-6 font-bold;
    }
  }
}
</style>
