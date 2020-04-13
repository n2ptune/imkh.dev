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
html,
body {
  background-color: white;
}
</style>
