<template>
  <section class="container mx-auto relative">
    <slot name="header" />
    <div class="wrapper">
      <slot />
    </div>
  </section>
</template>

<style lang="postcss" scoped>
section {
  @apply mb-64;

  top: 6rem;

  & .wrapper {
    @apply flex flex-row flex-wrap justify-center;
  }
}

&::v-deep .infinite-loading-container {
  flex: 1 1 100%;
}
</style>
