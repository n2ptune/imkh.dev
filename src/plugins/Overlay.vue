<template>
  <transition name="opacity">
    <div
      v-if="handler"
      :style="{ zIndex, top: distance }"
      class="overlay"
      @click="clickOverlay"
    >
      <div ref="inner" class="overlay-inner">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    handler: {
      type: Boolean,
      required: false,
      default: false
    },
    zIndex: {
      type: Number,
      required: false,
      default: 20
    },
    distance: {
      type: [Number, String],
      required: false,
      default: 0
    }
  },

  methods: {
    handleOverlay(a, b) {
      const switchOverflow = visible =>
        (document.body.style.overflow = visible ? 'hidden' : 'auto')

      switchOverflow(a)
    },
    clickOverlay(e) {
      if (e.target === this.$el) {
        this.$emit('click-outside')
      }
    }
  },

  mounted() {},

  beforeDestroy() {
    this.handleOverlay(false, true)
  },

  watch: {
    handler: {
      handler: 'handleOverlay'
    }
  }
}
</script>

<style lang="postcss">
.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  @apply fixed left-0 w-full h-screen;

  &-inner {
    @apply relative;
  }
}
.opacity-enter-active,
.opacity-leave-active {
  -webkit-transition: opacity 0.5s;
  transition: opacity 0.5s;
}
.opacity-enter-to,
.opacity-leave {
  opacity: 1;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
</style>
