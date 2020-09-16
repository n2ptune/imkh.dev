<template>
  <transition name="slide" appear>
    <aside>
      <div class="content">
        <SidebarProfile :tags="tags" :isSide="true" class="relative" />
        <button class="closeBtn" @click="closeSideMenu">
          <font-awesome :icon="['fas', 'times']" />
        </button>
      </div>
    </aside>
  </transition>
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
      this.$emit('close-side-menu')
    }
  },

  watch: {
    '$route.path'() {
      this.$emit('close-side-menu')
    }
  }
}
</script>

<style lang="postcss" scoped>
aside {
  z-index: 1;
  @apply fixed right-0 top-0 h-full;
  --sidebar-max-width: 250px;
  --close-distance-x: 13px;
  --close-distance-y: 10px;
}
.content {
  width: var(--sidebar-max-width);
  z-index: 1;
  @apply flex h-full p-3 bg-white-f overflow-y-auto;
}
.closeBtn {
  top: var(--close-distance-y);
  right: var(--close-distance-x);
  @apply absolute;
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
</style>
