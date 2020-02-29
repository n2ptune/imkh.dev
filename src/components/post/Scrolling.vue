<template>
  <transition name="scale" appear>
    <div
      @click="scrollTop"
      class="flex z-20 justify-center items-center fixed w-12 h-12 rounded-full shadow-xl cursor-pointer"
      :class="color.bg"
    >
      <font-awesome
        :icon="['fas', 'angle-double-up']"
        :style="{ color: color.icon }"
        size="lg"
      />
    </div>
  </transition>
</template>

<script>
import SmoothScroll from 'smooth-scroll'

export default {
  data: () => ({
    color: {
      bg: 'bg-purple-600',
      icon: 'white'
    }
  }),

  methods: {
    scrollTop() {
      const ss = new SmoothScroll()
      ss.animateScroll(document.querySelector('.header'))
    }
  }
}
</script>

<style lang="postcss" scoped>
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.45s ease-in-out;
}
.scale-enter,
.scale-leave-to {
  transform: scale(0);
}
.scale-enter-to,
.scale-leave {
  transform: scale(1);
}
div {
  bottom: 1.5rem;
  right: 1.5rem;
}
</style>
