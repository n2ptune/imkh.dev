<template>
  <main class="font-display">
    <Header @openSideMenu="openSideMenuHandler" />
    <Sidebar :tags="tags" />
    <slot />
    <MobileSideMenu
      v-show="isVisibleSideMenu"
      @closeSideMenu="closeSideMenuHandler"
      :tags="tags"
    />
    <Overlay
      :handler="isVisibleSideMenu"
      @clickOutside="closeSideMenuHandler"
    />
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
    isVisibleSideMenu: false,
    tags: []
  }),

  created() {
    this.tags = this.$static.tags.edges
  },

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

<static-query>
query {
  tags: allTag {
    edges {
      node {
        id
        path
        title
      }
    }
  }
}
</static-query>

<style lang="postcss" scoped>
html,
body {
  background-color: white;
}

main {
  @apply overflow-hidden w-full max-w-full;
}
</style>
