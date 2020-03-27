<template>
  <article
    class="mx-auto max-w-3xl text-center bg-white-f card-component mb-4 overflow-hidden"
  >
    <g-link :to="post.path">
      <g-image
        :src="post.cover_image || require('@/assets/default-thumbnail.jpg')"
        :style="{ minWidth: '100%' }"
        class="rounded-t-lg card-thumbnail"
        blur="4"
      />
    </g-link>
    <div class="flex justify-center flex-col py-12 px-8">
      <div class="text-2xl font-medium">
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
.card-thumbnail {
  transition: transform 0.25s ease;
}
.card-thumbnail:hover {
  transform: scale(1.05);
}
</style>
