<template>
  <main class="font-display">
    <Header @openSideMenu="openSideMenuHandler" />
    <Sidebar />
    <slot />
    <transition name="slide">
      <MobileSideMenu
        v-show="isVisibleSideMenu"
        @closeSideMenu="closeSideMenuHandler"
      />
    </transition>
    <transition name="opacity">
      <div class="overlay" v-show="isVisibleSideMenu"></div>
    </transition>
  </main>
</template>

<script>
import Header from '@/components/v2/Header'
import Sidebar from '@/components/v2/Sidebar'
import MobileSideMenu from '@/components/v2/MobileSideMenu'

export default {
  components: {
    Header,
    Sidebar,
    MobileSideMenu
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
    },
    documentOverflowHandler(current, old) {
      const _switchOverflow = visible =>
        (document.body.style.overflow = visible ? 'hidden' : 'auto')

      _switchOverflow(current)
    }
  },

  watch: {
    isVisibleSideMenu: {
      handler: 'documentOverflowHandler'
    }
  }
}
</script>

<style lang="postcss" scoped>
html,
body {
  background-color: white;
}
.overlay {
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.6);
  @apply fixed top-0 left-0 w-full h-full;
}
.slide-enter-active,
.slide-leave-active {
  -webkit-transition: opacity 0.5s, -webkit-transform 0.5s;
  transition: opacity 0.5s, -webkit-transform 0.5s;
  transition: transform 0.5s, opacity 0.5s;
  transition: transform 0.5s, opacity 0.5s, -webkit-transform 0.5s;
  -webkit-transform: translateX(250px);
  transform: translateX(250px);
}
.slide-enter-to {
  opacity: 1;
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
.slide-leave-to {
  opacity: 0;
  -webkit-transform: translateX(250px);
  transform: translateX(250px);
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
