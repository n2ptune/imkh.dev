<template>
  <div class="mx-auto text-center bg-white-f card rounded-lg">
    <g-link :to="post.path">
      <g-image
        v-if="post.cover_image"
        :src="post.cover_image"
        :style="{ minWidth: '100%' }"
        class="rounded-t-lg"
        blur="4"
      />
    </g-link>
    <div class="flex justify-center flex-col p-12">
      <div class="text-2xl">
        <g-link :to="post.path">
          {{ post.title }}
        </g-link>
      </div>
      <div class="text-lg">{{ post.date }} · {{ timeToRead }}</div>
      <div class="mt-8">
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
  transition-property: box-shadow, transform;
  transition-duration: 0.25s;
  transition-timing-function: ease-in;
  max-width: var(--content-max);
}
.card:hover {
  transform: translateY(-0.8%);
  @apply shadow-xl;
}
</style>
