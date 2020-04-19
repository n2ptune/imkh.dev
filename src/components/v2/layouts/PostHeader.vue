<template>
  <header>
    <div class="flex items-center">
      <font-awesome
        :icon="['fas', 'bars']"
        class="header-icon"
        @click="leftHandle"
      />
      <PostLeftSide v-if="isShowLeft" />
    </div>
    <div class="text-sm lg:text-base font-bold">{{ splitedTitle }}</div>
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
    }
  },

  computed: {
    splitedTitle() {
      return this.title.length > 30
        ? this.title.substring(0, 30) + '...'
        : this.title
    }
  },

  data: () => ({
    isOpenMenu: false,
    isShowLeft: false,
    isShowRight: false
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
  }
}
</script>

<style lang="postcss" scoped>
header {
  height: 3rem;
  z-index: 10;
  @apply flex fixed w-full bg-white-f border-b border-gray-300
  justify-between items-center px-3;
}
.header-icon {
  @apply text-gray-500 cursor-pointer transition-colors duration-500;
}
.header-icon:hover {
  @apply text-black;
}
/* side */
.side {
  @apply fixed h-full bg-white-f;
}
</style>
