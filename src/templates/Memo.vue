<template>
  <DefaultLayout>
    <section class="wrapper">
      asdasf
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue'

export default {
  components: { DefaultLayout }
}
</script>

<page-query>
query Memo ($id: ID!) {
  memo: memo (id: $id) {
    content
  }
}
</page-query>

<style lang="postcss" scoped>
.wrapper {
  @apply relative mx-auto mb-32 py-10 rounded-none text-white-800 px-4
  overflow-x-hidden;

  max-width: 100%;
  top: 7rem;

  & .cover-image {
    > img {
      @apply mx-auto max-w-full overflow-hidden;
    }
  }
}

@screen md {
  .wrapper {
    @apply px-0;
  }
}

@screen lg {
  .wrapper {
    max-width: 1100px;
  }
}
</style>
