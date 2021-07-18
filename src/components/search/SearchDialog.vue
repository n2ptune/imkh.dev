<template>
  <transition name="search-transition" appear>
    <div class="search">
      <div class="search-overlay"></div>
      <transition name="dialog-transition" appear>
        <div class="search-dialog">
          <div class="search-dialog-wrapper">
            hello world
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    tempOverflowY: null
  }),

  created() {
    this.hiddenScroll()
  },

  beforeDestroy() {
    this.unHiddenScroll()
  },

  methods: {
    hiddenScroll() {
      this.tempOverflowY = document.body.style.overflowY
      document.body.style.overflowY = 'hidden'
    },
    unHiddenScroll() {
      document.body.style.overflowY = this.tempOverflowY
    }
  }
}
</script>

<style lang="postcss" scoped>
.dialog-transition {
  &-enter-active,
  &-leave-active {
    transition: transform 250ms ease-in-out, opacity 500ms ease;
  }

  &-enter,
  &-leave-to {
    transform: scale(0.5);
    @apply opacity-50;
  }

  &-enter-to,
  &-leave {
    transform: scale(1);
    @apply scale-100 opacity-100;
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
    @apply bg-dark-surface bg-opacity-90;
  }

  &-dialog {
    @apply flex justify-center items-center absolute top-0 left-0;

    &-wrapper {
      @apply text-white-f;
    }
  }
}
</style>
