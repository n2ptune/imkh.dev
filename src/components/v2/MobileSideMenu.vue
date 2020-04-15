<template>
  <aside>
    <div class="content">
      <SidebarProfile
        :isSide="true"
        :style="{ top: '2.7rem' }"
        class="relative"
      />
      <button class="closeBtn" @click="closeSideMenu">
        <font-awesome :icon="['fas', 'times']" />
      </button>
    </div>
    <div class="overlay"></div>
  </aside>
</template>

<script>
export default {
  components: {
    SidebarProfile: () => import('@/components/v2/SidebarProfile')
  },

  methods: {
    closeSideMenu() {
      this.$emit('closeSideMenu')
    },
    tEL(event) {
      if (event.target.classList.contains('overlay')) this.closeSideMenu()
    }
  },

  mounted() {
    document.body.style.overflow = 'hidden'
    document.addEventListener('click', this.tEL)
  },

  beforeDestroy() {
    document.body.style.overflow = 'auto'
    document.removeEventListener('click', this.tEL)
  }
}
</script>

<style lang="postcss" scoped>
aside {
  @apply fixed right-0 top-0 h-full;
}
.content {
  width: 250px;
  z-index: 1;
  @apply flex h-full p-3 bg-white-f;
}
.overlay {
  z-index: -100;
  background-color: rgba(0, 0, 0, 0.6);
  @apply fixed top-0 left-0 w-full h-full;
}
.closeBtn {
  top: 15px;
  right: 15px;
  @apply absolute;
}
</style>
