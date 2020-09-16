<template>
  <section>
    <div class="wrapper">
      <slot />
    </div>
  </section>
</template>

<style lang="postcss" scoped>
section {
  @apply flex justify-center p-6 relative;
}

.wrapper {
  width: 100%;
  max-width: 800px;
  @apply flex flex-col;
}

@screen lg {
  section {
    width: calc(100% - var(--aside-lg-size));
    @apply float-right;
  }
}

@screen xl {
  section {
    width: calc(100% - var(--aside-xl-size));
  }
}
</style>
