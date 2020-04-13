<template>
  <div class="post">
    <div class="post-head font-bold text-lg lg:text-2xl">
      <g-link :to="post.path">
        {{ post.title }}
      </g-link>
    </div>
    <div
      class="post-descriptor flex flex-row text-sm text-gray-600 items-center"
    >
      <div>
        {{ post.date }}
      </div>
      <div>{{ post.timeToRead }} Min Read</div>
    </div>
    <div class="outline"></div>
    <div class="post-body mt-2">
      {{ post.description }}
    </div>
    <div class="post-footer flex mt-10">
      <g-image
        v-for="image in images"
        :key="image"
        :src="image"
        blur="4"
        :style="{ width: '100px', height: '100px' }"
      />
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

  data: () => ({
    images: []
  }),

  computed: {
    coverImageSrc() {
      return this.post.cover_image
        ? this.post.cover_image
        : require('@/assets/default-thumbnail.jpg')
    }
  },

  created() {
    const parser = new DOMParser()
    const html = parser.parseFromString(this.post.content, 'text/html')

    html.querySelectorAll('img').forEach(img => {
      if (img.dataset.src) {
        this.images.push(img.dataset.src)
      }
    })
  }
}
</script>

<style lang="postcss" scoped>
.post {
  @apply flex flex-col mb-24;
}
.outline {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  @apply bg-gray-300 my-2;
}
.post-descriptor > *:not(:last-child)::after {
  content: '·';
  display: inline-block;
  margin: 0 0.4rem 0 0.2rem;
  @apply text-lg;
}
</style>
