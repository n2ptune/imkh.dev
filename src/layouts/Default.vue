<template>
  <main>
    <Header @openSideMenu="openSideMenuHandler" />
    <slot />
  </main>
</template>

<script>
import Header from '@/components/layouts/main/Header.vue'
import MobileSideMenu from '@/components/layouts/main/MobileSideMenu.vue'

export default {
  components: {
    Header,
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
main {
  overflow-y: hidden;
}
</style>
