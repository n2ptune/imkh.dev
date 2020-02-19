<template>
  <article class="mx-auto text-center bg-white-f card rounded-lg">
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
      <div class="text-2xl font-semibold">
        <g-link :to="post.path">
          {{ post.title }}
        </g-link>
      </div>
      <div class="text-lg text-gray-600">
        {{ post.date }} · {{ timeToRead }}
      </div>
      <div class="mt-3">
        <linked-tag
          v-for="tag in post.tags"
          :key="tag.id"
          :name="tag.title"
          :path="tag.path"
          bg-color-class="bg-red-200"
          hover-color-class="hover:bg-red-300"
        />
      </div>
      <div class="mt-8">
        {{ post.description }}
      </div>
    </div>
  </article>
</template>

<script>
import LinkedTag from '@/components/post/LinkedTag.vue'

export default {
  components: {
    LinkedTag
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    timeToRead() {
      return `${this.post.timeToRead} min read`
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
