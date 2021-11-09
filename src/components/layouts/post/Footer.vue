<template>
  <div class="footer">
    <div class="footer-inner">
      <div v-if="!ignoreNotePage" class="footer-inner__related">
        <div class="footer-inner__related-title">
          관심있으실 만한 포스트
        </div>
        <div class="footer-inner__related-cards">
          <PostCard v-for="post in related" :key="post.id" :post="post" />
        </div>
      </div>
      <div class="footer-inner__list">
        <div class="footer-inner__list-blog">
          <div class="text-accent-main text-2xl font-bold">
            IMKH.DEV
          </div>
        </div>
        <div class="item">
          <div class="title">
            Links
          </div>
          <div class="links">
            <div class="link">
              <font-awesome :icon="['fab', 'github']" class="icon" />
              <a href="https://github.com/n2ptune" target="_blank">Github</a>
            </div>
            <div class="link">
              <font-awesome :icon="['fab', 'linkedin']" class="icon" />
              <a href="https://kr.linkedin.com" target="_blank">LinkedIn</a>
            </div>
            <div class="link">
              <font-awesome :icon="['fab', 'instagram']" class="icon" />
              <a
                href="https://www.instagram.com/ililiilililililiii"
                target="_blank"
                >Instagram</a
              >
            </div>
          </div>
        </div>
        <div class="item">
          <div class="title">
            Contact
          </div>
          <div class="links">
            <div class="link">
              <a href="">Portfolio</a>
            </div>
            <div class="link">
              <a href="">Mail</a>
            </div>
          </div>
        </div>
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
    },
    ignoreNotePage() {
      return this.$route.path.startsWith('/note/')
    }
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
        @apply grid grid-cols-12 gap-4 grid-rows-1;

        & > * {
          @apply col-span-12 lg:col-span-4 mx-auto;
        }
      }
    }

    &__list {
      @apply grid grid-cols-12 gap-10;

      & > * {
        @apply col-span-12 lg:col-span-4;
      }

      & .title {
        @apply text-white-300 uppercase text-sm tracking-wider mb-6;
      }

      & .links {
        @apply space-y-3 inline-block;

        & .link {
          @apply text-white-700 transition-colors duration-300;

          &:hover {
            @apply text-white-f;
          }

          & > .icon {
            @apply mr-2;
          }
        }
      }
    }
  }
}
</style>
