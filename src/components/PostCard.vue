<template>
  <div class="mx-auto text-center bg-sea-low card rounded-lg shadow-xl">
    <g-image
      v-if="post.cover_image"
      :src="post.cover_image"
      :style="{ minWidth: '100%' }"
      class="rounded-t-lg"
    />
    <div class="flex justify-center flex-col p-12">
      <div class="text-white-800 text-2xl">
        {{ post.title }}
      </div>
      <div class="text-white-500 text-lg">
        {{ post.date }} · {{ timeToRead }}
      </div>
      <div class="text-white-700 mt-8">
        {{ post.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    timeToRead() {
      return `${this.post.timeToRead} Read`
    }
  }
}
</script>

<style lang="postcss" scoped>
.card {
  max-width: 860px;
}
</style>
