<template>
  <transition name="appear-down" appear>
    <aside
      class="hidden 2xl:block absolute side"
      :class="isFixed ? 'is-fixed' : ''"
      :style="{ right: `${contentWidth}px`, width: 'auto' }"
    >
      <header class="mb-1 font-bold">
        <font-awesome :icon="['fas', 'stream']" :style="{ fontSize: '12px' }" />
        목록
      </header>
      <ul class="">
        <li v-for="content in aside" :key="content.title">
          {{ content.title }}
        </li>
      </ul>
    </aside>
  </transition>
</template>

<script>
export default {
  props: {
    aside: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    isFixed: null,
    contentWidth: 25
  }),

  methods: {
    scrollEvent() {
      const postContent = document.querySelector('.post-content')
      const currentY = window.scrollY

      if (currentY >= postContent.offsetTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    resizingEvent() {
      const side = document.querySelector('.side')
      this.contentWidth =
        (document.body.clientWidth - 950) / 2 - side.clientWidth - 15
    }
  },

  mounted() {
    this.scrollEvent()
    this.$nextTick(() => this.resizingEvent())

    window.addEventListener('scroll', this.scrollEvent)
    window.addEventListener('resize', this.resizingEvent)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollEvent)
    window.removeEventListener('resize', this.resizingEvent)
  }
}
</script>

<style lang="postcss" scoped>
.appear-down-enter-active,
.appear-down-leave-active {
  transition: transform 0.35s ease;
}
.appear-down-enter {
  transform: scale(0.7);
}
.appear-down-enter-to {
  transform: scale(1);
}
.appear-down-leave-to {
  transform: scale(0);
}
aside {
  color: rgba(0, 0, 0, 0.55);
  font-size: 14px;
  @apply mt-16 w-auto;
}
aside.is-fixed {
  top: 0.25rem;
  @apply fixed;
}
</style>
