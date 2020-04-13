<template>
  <header>
    header test
  </header>
</template>

<style lang="postcss" scoped>
header {
  @apply flex items-center relative top-0 h-12 p-3 border-b border-gray-300;
}
@screen lg {
  header {
    @apply hidden;
  }
}
</style>
