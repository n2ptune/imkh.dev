<template>
  <header>
    <div class="flex items-center">
      <font-awesome
        :icon="['fas', 'bars']"
        class="header-icon"
        @click="leftHandle"
      />
      <PostLeftSide v-if="isShowLeft" :postByTag="postByTag" />
    </div>
    <transition name="h-slide">
      <div
        v-if="isShowTitle"
        class="text-sm lg:text-base font-bold text-white-700"
      >
        {{ splitedTitle }}
      </div>
    </transition>
    <div>
      <font-awesome
        :icon="['fas', 'ellipsis-h']"
        class="header-icon"
        @click="rightHandle"
      />
    </div>
    <Overlay :handler="isOpenMenu" @clickOutside="overlayHandle" />
  </header>
</template>

<script>
import PostLeftSide from '@/components/v2/layouts/PostLeftSide.vue'

export default {
  components: {
    PostLeftSide
  },

  props: {
    title: {
      type: String,
      required: true
    },
    postByTag: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  computed: {
    splitedTitle() {
      let subLength = 30

      if (window.innerWidth) {
        subLength = window.innerWidth > 870 ? undefined : subLength
      }

      return this.title.length > 30
        ? this.title.substring(0, subLength) + (subLength ? '...' : '')
        : this.title
    }
  },

  data: () => ({
    isOpenMenu: false,
    isShowLeft: false,
    isShowRight: false,
    isShowTitle: false,
    ioRef: null
  }),

  methods: {
    leftHandle() {
      this.isOpenMenu = !this.isOpenMenu
      this.isShowLeft = !this.isShowLeft
    },
    rightHandle() {
      this.isOpenMenu = !this.isOpenMenu
      this.isShowRight = !this.isShowRight
    },
    overlayHandle() {
      this.isOpenMenu = false
      if (this.isShowLeft) this.isShowLeft = false
      else if (this.isShowRight) this.isShowRight = false
    }
  },

  mounted() {
    if (process.isClient) {
      const headWrap = document.querySelector('.head-wrap')

      const io = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            this.isShowTitle = false
          } else {
            this.isShowTitle = true
          }
        },
        {
          threshold: 1
        }
      )

      io.observe(headWrap)
      this.ioRef = io
    }
  },

  beforeDestroy() {
    const headWrap = document.querySelector('.head-wrap')
    this.ioRef.unobserve(headWrap)
  }
}
</script>

<style lang="postcss" scoped>
header {
  height: 3rem;
  z-index: 10;
  background-color: #242424;
  @apply flex fixed w-full justify-between items-center px-3;
}
.header-icon {
  @apply text-white-600 cursor-pointer transition-colors duration-500;
}
.header-icon:hover {
  @apply text-white-f;
}
/* side */
.side {
  @apply fixed h-full bg-white-f;
}
.h-slide-enter-active,
.h-slide-leave-active {
  transition: transform 0.45s ease, opacity 0.45s ease;
}
.h-slide-enter,
.h-slide-leave-to {
  transform: translateY(50%);
  opacity: 0;
}
.h-slide-enter-to,
.h-slide-leave {
  transform: translateY(0%);
  opacity: 1;
}
</style>
