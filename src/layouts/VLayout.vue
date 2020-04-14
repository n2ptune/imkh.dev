<template>
  <main class="font-display">
    <Header @openSideMenu="openSideMenuHandler" />
    <Sidebar />
    <slot />
    <transition name="slide-side">
      <MobileSideMenu
        v-if="isVisibleSideMenu"
        @closeSideMenu="closeSideMenuHandler"
      />
    </transition>
  </main>
</template>

<script>
export default {
  components: {
    Header: () => import('@/components/v2/Header'),
    Sidebar: () => import('@/components/v2/Sidebar'),
    MobileSideMenu: () => import('@/components/v2/MobileSideMenu')
  },

  data: () => ({
    isVisibleSideMenu: false
  }),

  methods: {
    openSideMenuHandler() {
      this.isVisibleSideMenu = true
    },
    closeSideMenuHandler() {
      this.isVisibleSideMenu = false
    }
  }
}
</script>

<style lang="postcss" scoped>
html,
body {
  background-color: white;
}
.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.5s;
}
.slide-side-enter,
.slide-side-leave-to {
  opacity: 0;
}
.slide-side-enter-to,
.slide-side-leave {
  opacity: 1;
}
</style>
