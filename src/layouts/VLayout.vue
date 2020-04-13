<template>
  <main class="font-display">
    <Header />
    <Sidebar />
    <slot />
  </main>
</template>

<script>
export default {
  components: {
    Header: () => import('@/components/v2/Header'),
    Sidebar: () => import('@/components/v2/Sidebar')
  }
}
</script>

<style lang="postcss" scoped>
main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
html,
body {
  background-color: white;
}
</style>
