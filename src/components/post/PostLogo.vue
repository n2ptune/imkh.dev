<template>
  <div
    class="flex flex-col mx-auto text-center post-logo px-4 sm:px-8 md:px-16"
  >
    <div class="text-3xl text-white-800 font-bold">
      {{ post.title }}
    </div>
    <div class="text-xl text-white-600">
      {{ combineDateRead }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],

  computed: {
    combineDateRead() {
      return `${this.post.date} · ${this.post.timeToRead} Read`
    }
  }
}
</script>

<style lang="postcss" scoped>
.post-logo {
  max-width: 800px;
  overflow-wrap: break-word;
  overflow-x: hidden;
}
.post-logo::before,
.post-logo::after {
  content: '';
  display: block;
  overflow-x: hidden;
  padding: 0;
  height: 1px;
  border-top: 3.2px dashed;
  @apply mt-8 mb-6 border-sea-low;
}
</style>
