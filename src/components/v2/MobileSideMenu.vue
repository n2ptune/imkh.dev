<template>
  <aside>
    <div class="content overflow-y-auto">
      <SidebarProfile
        :tags="tags"
        :isSide="true"
        :style="{ top: '2.7rem' }"
        class="relative"
      />
      <button class="closeBtn" @click="closeSideMenu">
        <font-awesome :icon="['fas', 'times']" />
      </button>
    </div>
  </aside>
</template>

<script>
import SidebarProfile from '@/components/v2/SidebarProfile'

export default {
  props: {
    tags: {
      type: Array,
      required: true
    }
  },

  components: {
    SidebarProfile
  },

  methods: {
    closeSideMenu() {
      this.$emit('closeSideMenu')
    },
    closeWhenClickOutside(event) {
      if (event.target.classList.contains('overlay')) this.closeSideMenu()
    }
  },

  mounted() {
    document.addEventListener('click', this.closeWhenClickOutside)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.closeWhenClickOutside)
  }
}
</script>

<style lang="postcss" scoped>
aside {
  z-index: 1;
  @apply fixed right-0 top-0 h-full;
  --sidebar-max-width: 250px;
}
.content {
  width: var(--sidebar-max-width);
  z-index: 1;
  @apply flex h-full p-3 bg-white-f;
}
.closeBtn {
  top: 15px;
  right: 15px;
  @apply absolute;
}
</style>
