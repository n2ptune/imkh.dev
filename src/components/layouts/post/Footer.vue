<template>
  <div class="footer">
    <div class="footer-inner">
      <div class="footer-inner__related">
        <div class="footer-inner__related-title">
          관심있으실 만한 포스트
        </div>
        <div class="footer-inner__related-cards">
          <PostCard v-for="post in related" :key="post.id" :post="post" />
        </div>
      </div>
      <div class="footer-inner__list">
        <div class="footer-inner__list-blog">
          <div class="text-green-500 text-2xl font-bold">
            IMKH.DEV
          </div>
        </div>
        <div>B</div>
        <div>C</div>
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from '@/components/layouts/main/PostCard.vue'

export default {
  props: {
    relatedPost: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  components: { PostCard },
  computed: {
    related() {
      return this.relatedPost.map(data => data.node).slice(0, 3)
    }
  },
  created() {
    console.log(this.relatedPost)
  }
}
</script>

<style lang="postcss" scoped>
.footer {
  @apply w-full py-16 lg:py-32 px-4 lg:px-16 text-white-f bg-dark-lighten;

  &-inner {
    @apply max-w-full mx-auto;

    @media screen(lg) {
      max-width: 1100px;
    }

    &__related {
      @apply mb-12;

      &-title {
        @apply text-xl mb-4;
      }

      &-cards {
        @apply grid grid-cols-12 gap-4;

        & > * {
          @apply col-span-12 lg:col-span-4;
        }
      }
    }

    &__list {
      @apply grid grid-cols-12 gap-10;

      & > * {
        @apply col-span-12 lg:col-span-4;
      }
    }
  }
}
</style>
