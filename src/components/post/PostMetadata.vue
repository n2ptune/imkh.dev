<template>
  <div class="flex flex-col flex-wrap mx-auto items-center leading-tight mb-8">
    <div class="text-2xl sm:text-4xl font-bold text-center">
      {{ post.title }}
    </div>
    <div class="text-md sm:text-xl text-gray-700">
      {{ post.date }}
    </div>
    <div class="my-4">
      <linked-tag
        v-for="tag in post.tags"
        :key="tag.id"
        :name="tag.title"
        :path="tag.path"
      />
    </div>
  </div>
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
      return `${this.post.timeToRead} Min Read.`
    }
  }
}
</script>
