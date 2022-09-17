<template>
  <transition name="search-transition" appear>
    <div class="search">
      <div class="search-overlay"></div>
      <transition name="dialog-transition" appear>
        <div class="search-dialog">
          <div class="search-dialog-wrapper" ref="wrapper">
            <div class="search-dialog-wrapper__icon-close" @click="close">
              <font-awesome :icon="['fas', 'times']" size="lg" />
            </div>
            <SearchForm />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { EventBus } from '@/components/utils/EventBus'
import SearchForm from '@/components/search/Form.vue'

export default {
  components: {
    SearchForm
  },

  data: () => ({
    tempOverflowY: null
  }),

  watch: {
    '$route.path'(_) {
      this.close()
    }
  },

  created() {
    this.hiddenScroll()
  },

  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.clickOutside)
    }, 0) // delay
  },

  beforeDestroy() {
    this.unHiddenScroll()
    document.removeEventListener('click', this.clickOutside)
  },

  methods: {
    hiddenScroll() {
      this.tempOverflowY = document.body.style.overflowY
      document.body.style.overflowY = 'hidden'
    },
    unHiddenScroll() {
      document.body.style.overflowY = this.tempOverflowY
    },
    close() {
      EventBus.$emit('search', false)
    },
    clickOutside(event) {
      if (this.$refs.wrapper && !this.$refs.wrapper.contains(event.target)) {
        this.close()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.dialog-transition {
  &-enter-active,
  &-leave-active {
    transition: transform 350ms ease-out, opacity 350ms ease;
  }

  &-enter,
  &-leave-to {
    transform: scale(0.9);
    @apply opacity-50;
  }

  &-enter-to,
  &-leave {
    transform: scale(1);
    @apply opacity-100;
  }
}

.search-transition {
  &-enter-active,
  &-leave-active {
    transition: opacity 300ms ease;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
  }
}

.search {
  @apply fixed top-0 left-0 w-full h-full z-50 overflow-hidden;

  & > * {
    @apply w-full h-full;
  }

  &-overlay {
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);

    @apply bg-dark-surface bg-opacity-90;
  }

  &-dialog {
    @apply flex justify-center absolute top-0 left-0 h-auto;

    &-wrapper {
      @apply w-full text-white-f max-w-xs md:max-w-md lg:max-w-2xl rounded p-4 md:p-8
      mt-36 bg-opacity-100 shadow relative bg-dark-lighten;

      &__icon-close {
        @apply absolute top-0 right-0 p-4 text-white-400 transition-colors duration-200;

        &:hover {
          @apply cursor-pointer text-white-f;
        }
      }
    }
  }
}
</style>
