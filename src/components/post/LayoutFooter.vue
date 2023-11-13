<template>
  <footer
    class="w-full px-4 lg:px-0 mt-12 pb-6 pt-12 bg-gray-50 border-t border-gray-200 dark:bg-[#0f0f0f] dark:border-dark"
  >
    <section class="container mx-auto">
      <section class="grid-wrap text-center lg:text-left">
        <section class="col-span-4 text-xl lg:text-2xl space-y-2">
          <p class="font-bold">DEVLOG 개발 블로그</p>
          <p class="text-sm">Copyright © 2023 imkh.dev</p>
        </section>
        <section
          class="mt-12 lg:mt-0 col-span-8 flex flex-col flex-wrap items-end"
        >
          <p class="head">Contact</p>
          <ul>
            <li>
              <a href="mailto:vue2598@gmail.com"> Email </a>
            </li>
            <li>
              <a
                href="https://github.com/n2ptune"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://ppl.imkh.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            </li>
          </ul>
        </section>
      </section>
    </section>
    <section class="mt-6 pt-6 border-t border-gray-200 dark:border-dark text-center">
      <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer">
        Powered By <Icon name="logos:nuxt-icon" size="24" /> <strong class="font-bold">Nuxt 3</strong>
      </a>
    </section>
  </footer>
</template>

<style lang="postcss" scoped>
.grid-wrap {
  @apply lg:grid lg:grid-cols-12;

  p.head {
    @apply mx-auto lg:mx-0 mb-1 text-gray-400 dark:text-neutral-500 font-bold text-sm;
  }

  ul {
    @apply leading-loose mx-auto lg:mx-0 text-center lg:text-right;

    li {
      a {
        @apply hover:underline;
      }
    }
  }
}
</style>
