<template>
  <DefaultLayout>
    <section class="wrapper">
      <header class="leading-snug whitespace-normal break-all">
        <div class="text-xl lg:text-2xl font-bold mb-3">
          {{ $page.note.title }}
        </div>
        <div class="text-white-500">
          {{ $page.note.description }}
        </div>
        <div class="text-white-500">
          {{ $page.note.date }}
        </div>
      </header>
      <article v-html="$page.note.content" class="py-16" />
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
query Note ($id: ID!) {
  note: note (id: $id) {
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
  @apply break-words text-white-800 mx-auto py-32 w-full;

  font-size: 1rem;

  /* Blockquote */

  & >>> blockquote {
    @apply px-4 py-2 my-12 border-l-4 border-elevation-300 text-white-600
    italic;

    & p {
      @apply m-0;

      &::before {
        @apply mr-1;

        content: open-quote;
      }

      &::after {
        @apply ml-1;

        content: close-quote;
      }
    }
  }

  /* Link */

  & >>> a {
    @apply text-accent-main underline;

    &:hover {
      @apply text-accent-darker;
    }
  }

  /* Code */

  & >>> code:not([class*='language-']) {
    @apply text-sm p-1 bg-elevation-200 font-mono !important;
  }

  & >>> pre[class*='language-'],
  & >>> code[class*='language-'] {
    font-size: 0.95rem;

    @apply font-mono !important;
    @apply text-white-f;
  }

  & >>> pre[class*='language-'] {
    overflow: auto;
    position: relative;
    padding: 2rem 1.5rem;

    @apply bg-elevation-400 rounded-lg;
  }

  /* List */

  & >>> ul,
  & >>> ol {
    padding: 0 0 0 20px;
    list-style-position: inside;

    & a {
      @apply no-underline;
    }
  }

  & >>> ol {
    list-style-type: decimal;
  }

  & >>> ul {
    list-style-type: disc;
  }

  /* Typography */

  & >>> h1,
  & >>> h2 {
    &:not(:first-child)::before {
      content: '· · ·';

      @apply block my-16 text-xl font-black text-center text-white-400;
    }
  }

  & >>> h1,
  & >>> h2,
  & >>> h3,
  & >>> h4 {
    @apply font-bold text-white-900 my-6;
  }

  & >>> h1 {
    @apply text-3xl;
  }

  & >>> h2 {
    @apply text-2xl;
  }

  & >>> h3 {
    @apply text-xl;
  }

  & >>> h4 {
    @apply text-lg;
  }

  & >>> p {
    @apply my-6;
  }

  /* Image */

  & >>> img {
    @apply cursor-pointer my-16 mx-auto;
  }
}

@screen lg {
  article {
    width: 750px;
    font-size: 1.1rem;
  }
}

@screen xl {
  article {
    font-size: 1.15rem;
  }
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

  header {
    @apply w-full;
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

  .wrapper header {
    @apply mx-auto;

    max-width: 750px;
    font-size: 1.1rem;
  }
}

@screen xl {
  .wrapper header {
    font-size: 1.15rem;
  }
}
</style>
