<template>
  <DefaultLayout>
    <section class="wrapper">
      <header class="text-center leading-snug whitespace-normal break-all">
        <div class="text-xl lg:text-2xl font-bold mb-3">
          {{ $page.memo.title }}
        </div>
        <div class="text-white-500">
          {{ $page.memo.description }}
        </div>
        <div class="text-white-500">
          {{ $page.memo.date }}
        </div>
      </header>
      <article v-html="$page.memo.content" class="py-16" />
    </section>
    <Footer />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue'
import Footer from '@/components/layouts/post/Footer.vue'

export default {
  metaInfo() {
    return {}
  },
  components: { DefaultLayout, Footer }
}
</script>

<page-query>
query Memo ($id: ID!) {
  memo: memo (id: $id) {
    content
    date (format: "D. MMMM YYYY")
    description
    id
    path
    timeToRead
    title
  }
}
</page-query>

<style lang="postcss" scoped>
article {
  @apply py-32;
}

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
