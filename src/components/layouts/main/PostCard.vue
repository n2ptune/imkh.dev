<template>
  <div class="post">
    <div class="mb-1">
      <g-link :to="post.path">
        <g-image
          v-if="post.cover_image"
          :src="post.cover_image"
          cover
          blur="4"
          class="rounded-none md:rounded-t-lg"
        />
      </g-link>
    </div>
    <g-link :to="post.path">
      <div class="pb-16">
        <div class="p-4">
          <div class="text-lg font-bold title">
            {{ post.title }}
          </div>
          <div class="text-base font-thin text-white-400 mt-2 desc">
            {{ post.cover_image ? post.description : post.excerpt + '...' }}
          </div>
          <tag-list :tag="post.tags" />
        </div>
      </div>
    </g-link>
    <div
      class="absolute bottom-0 left-0 h-12 w-full border-t border-elevation-300"
    >
      <div class="bottom-left space-x-3">
        <font-awesome :icon="['fas', 'bookmark']" class="inline-block" />
        <p class="inline-block">{{ post.date }}</p>
      </div>
      <div class="bottom-right">
        읽는 데 {{ post.timeToRead }}분 걸림
        <span class="text-white-f">{{ toReadLevel(post.timeToRead) }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import TimeReadMixins from '@/components/mixins/TimeReadMixins'
import TagList from '@/components/tag/List.vue'

export default {
  components: {
    TagList
  },

  props: {
    post: {
      type: Object,
      required: true
    }
  },

  mixins: [TimeReadMixins]
}
</script>

<style lang="postcss" scoped>
.post {
  @apply my-3 bg-elevation-200 transition-all duration-300
  relative;

  flex: 0 1 400px;

  &:hover {
    @apply transform -translate-y-1;

    & .title {
      @apply text-white-f;
    }

    & .desc {
      @apply text-white-600;
    }
  }

  & .bottom-right {
    right: 15px;
  }

  & .bottom-left {
    left: 15px;
  }

  & .bottom-left,
  & .bottom-right {
    @apply absolute text-sm text-white-500;

    top: 25%;
  }

  & .title,
  & .desc {
    @apply transition-colors duration-300;
  }

  & .title {
    @apply text-white-700;
  }
}

@screen md {
  .post {
    @apply m-4 rounded-lg;
  }
}
</style>
