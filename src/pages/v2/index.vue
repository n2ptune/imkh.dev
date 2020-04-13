<template>
  <VLayout>
    <section class="section-1">
      <!-- Post List -->
      <div class="post">
        post 1
      </div>
      <div class="post">
        post 1
      </div>
      <div class="post">
        post 1
      </div>
      <div class="post">
        post 1
      </div>
      <div class="post">
        post 1
      </div>
      <div class="post">
        post 1
      </div>
    </section>
  </VLayout>
</template>

<script>
export default {
  components: {
    VLayout: () => import('@/layouts/VLayout')
  }
}
</script>

<style lang="postcss" scoped>
.section-1 {
  float: none;
  @apply flex items-center flex-col p-2 relative;
}

/* Example */
.post:not(:last-child) {
  @apply mb-4;
}

@screen lg {
  .section-1 {
    width: calc(100% - var(--aside-lg-size));
    @apply float-right p-4;
  }
}

@screen xl {
  .section-1 {
    width: calc(100% - var(--aside-xl-size));
    @apply p-6;
  }
}
</style>
