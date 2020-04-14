<template>
  <aside>
    <div class="wrapper-before">
      <SidebarProfile />
    </div>
  </aside>
</template>

<script>
export default {
  components: {
    SidebarProfile: () => import('@/components/v2/SidebarProfile')
  }
}
</script>

<style lang="postcss" scoped>
aside {
  display: none;
  background: url('~@/assets/cover-background.jpg') no-repeat;
  background-size: cover;
  background-position-x: 50%;
  z-index: -1;
  position: fixed;
  height: 100vh;
  overflow: auto;
}
.wrapper-before {
  @apply flex items-center justify-center h-full px-2 text-white-f;
  background-color: rgba(0, 0, 0, 0.32);
}
@screen lg {
  aside {
    display: block;
    width: var(--aside-lg-size);
  }
}
@screen xl {
  aside {
    display: block;
    width: var(--aside-xl-size);
  }
}
</style>
