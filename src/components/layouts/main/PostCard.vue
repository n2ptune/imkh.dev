<template>
  <div class="post">
    <g-link :to="post.path">
      <div class="mb-1">
        <g-image
          v-if="post.cover_image"
          :src="post.cover_image"
          cover
          blur="4"
          class="rounded-none md:rounded-t-lg"
        />
      </div>
      <div class="pb-16">
        <div class="p-4">
          <div class="text-2xl font-bold title">
            {{ post.title }}
          </div>
          <div class="text-base text-white-400 mt-5 desc">
            {{ post.description }}
          </div>
          <div class="mt-3">
            <ul class="space-x-2 space-y-1">
              <li
                v-for="tag in post.tags"
                :key="tag.id"
                class="inline-block rounded py-1 px-3 text-sm transition-colors duration-300 text-white-500 bg-elevation-500 hover:bg-elevation-800 hover:text-white-800"
              >
                <g-link :to="tag.path">
                  {{ tag.id }}
                </g-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-0 left-0 h-12 w-full border-t border-elevation-300"
      >
        <div class="bottom-left space-x-3">
          <font-awesome :icon="['fas', 'bookmark']" class="inline-block" />
          <p class="inline-block">{{ post.date }}</p>
        </div>
        <div class="bottom-right">
          읽는 데 {{ post.timeToRead }}분 걸림
          <span class="text-white-f">{{ toReadLevel }} </span>
        </div>
      </div>
    </g-link>
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
    toReadLevel() {
      const num = this.post.timeToRead

      if (this.between(num, 0, 5)) {
        return '☕'
      } else if (this.between(num, 6, 11)) {
        return '📰'
      } else if (this.between(num, 12, 20)) {
        return '🔥'
      } else {
        return '😴'
      }
    }
  },

  methods: {
    /**
     * @param {number} num
     * @param {number} min
     * @param {number} max
     * @returns {boolean}
     */
    between(num, min, max) {
      return min <= num && num <= max
    }
  }
}
</script>

<style lang="postcss" scoped>
.post {
  @apply my-3 bg-elevation-200 transition-all duration-300
  relative;

  flex: 0 1 450px;

  @screen md {
    @apply m-4 rounded-lg;
  }

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
</style>
