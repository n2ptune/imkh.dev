<template>
  <section class="container mx-auto relative">
    <div class="wrapper">
      <slot />
    </div>
  </section>
</template>

<style lang="postcss" scoped>
section {
  top: 6rem;
}

/* .wrapper {
  @apply flex flex-col;
} */
</style>
