<template>
  <aside>
    <g-image
      src="@/assets/cover-background.jpg"
      class="side-background"
      blur="40"
      quality="100"
      alt="side"
    />
    <div class="wrapper-before">
      <SidebarProfile :tags="tags" />
    </div>
  </aside>
</template>

<script>
import SidebarProfile from '@/components/layouts/main/SidebarProfile.vue'

export default {
  props: {
    tags: {
      type: Array,
      required: true
    }
  },

  components: {
    SidebarProfile
  }
}
</script>

<style lang="postcss" scoped>
aside {
  display: none;
  z-index: -1;
  position: fixed;
  height: 100vh;
  overflow: hidden;
  left: 0;
  top: 0;

  & .side-background {
    display: none;
  }
}
.wrapper-before {
  @apply flex items-center justify-center h-full px-2 text-white-f;
  background-color: rgba(0, 0, 0, 0.32);
}
@screen lg {
  aside {
    display: block;
    width: var(--aside-lg-size);

    & .side-background {
      display: block;
      position: absolute;
      z-index: -3;
      max-width: none;
      height: 100%;
    }
  }
}
@screen xl {
  aside {
    display: block;
    width: var(--aside-xl-size);
  }
}
</style>
