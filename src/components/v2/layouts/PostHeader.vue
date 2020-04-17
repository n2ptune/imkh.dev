<template>
  <header>
    <div>
      <font-awesome
        :icon="['fas', 'bars']"
        class="header-icon"
        @click="leftHandle"
      />
      <PostLeftSide v-if="isShowLeft" />
    </div>
    <div class="text-xs lg:text-sm font-bold">{{ title }}</div>
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

  props: ['title'],

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
