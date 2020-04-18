<template>
  <div class="post">
    <div class="post-cover-image">
      <g-link :to="post.path">
        <g-image
          :src="
            post.cover_image ||
              require('!!assets-loader?!@/assets/default-thumbnail.jpg')
          "
          cover
          blur="4"
          class="rounded-lg mb-3"
        />
      </g-link>
    </div>
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
    <div class="tags">
      <div v-for="tag in post.tags" :key="tag.id">
        <g-link :to="tag.path"> #{{ tag.id }} </g-link>
      </div>
    </div>
    <div class="post-body mt-2">
      {{ post.description }}
    </div>
    <div class="outline"></div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
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
  @apply bg-gray-300 mt-6;
}
.post-descriptor > *:not(:last-child)::after {
  content: '·';
  display: inline-block;
  margin: 0 0.4rem 0 0.2rem;
  @apply text-lg;
}
.tags {
  @apply text-base text-purple-700 flex flex-wrap;
}
.tags > * {
  @apply m-1 underline;
}
.tags > *:first-child {
  @apply ml-0;
}
.tags > *:hover {
  @apply font-bold;
}
</style>
