<template>
  <transition name="opacity">
    <div v-if="handler" class="overlay" @click="clickOverlay"></div>
  </transition>
</template>

<script>
export default {
  props: {
    handler: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    handleOverlay(a, b) {
      const switchOverflow = visible =>
        (document.body.style.overflow = visible ? 'hidden' : 'auto')

      switchOverflow(a)
    },
    clickOverlay() {
      this.$emit('clickOutside')
    }
  },

  watch: {
    handler: {
      handler: 'handleOverlay'
    }
  }
}
</script>

<style lang="postcss" scoped>
.overlay {
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.6);
  @apply fixed top-0 left-0 w-full h-full;
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
