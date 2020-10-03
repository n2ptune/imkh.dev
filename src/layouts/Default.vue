<template>
  <main class="font-display">
    <Header @openSideMenu="openSideMenuHandler" />
    <Sidebar :tags="tags" />
    <slot />
    <MobileSideMenu
      v-show="isVisibleSideMenu"
      @close-side-menu="closeSideMenuHandler"
      :tags="tags"
      :style="{ zIndex: 50 }"
    />
    <Overlay
      :handler="isVisibleSideMenu"
      :z-index="40"
      @click-outside="closeSideMenuHandler"
    />
  </main>
</template>

<script>
import Header from '@/components/layouts/main/Header.vue'
import Sidebar from '@/components/layouts/main/Sidebar.vue'
import MobileSideMenu from '@/components/layouts/main/MobileSideMenu.vue'

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
  overflow-x: hidden;
}

@screen lg {
  main {
    overflow-x: visible;
  }
}
</style>
