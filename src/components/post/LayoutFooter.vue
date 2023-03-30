<template>
  <footer
    class="w-full px-4 lg:px-0 mt-12 pb-6 pt-12 bg-gray-50 border-t border-gray-200 dark:bg-[#0f0f0f] dark:border-dark"
  >
    <section class="container mx-auto">
      <section class="grid-wrap text-center lg:text-left">
        <section class="col-span-4 text-xl lg:text-2xl space-y-3">
          <p>DEVLOG 개발 블로그</p>
          <p class="text-sm">Copyright © 2023 imkh.dev</p>
        </section>
        <section
          class="mt-12 lg:mt-0 col-span-8 flex flex-col flex-wrap items-end"
        >
          <p class="head">Contact</p>
          <ul>
            <li>
              <a href="mailto:vue2598@gmail.com"> 이메일 </a>
            </li>
            <li>
              <a
                href="https://github.com/n2ptune"
                target="_blank"
                rel="noopener noreferrer"
              >
                깃허브
              </a>
            </li>
            <li>
              <a
                href="https://imkh.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                블로그
              </a>
            </li>
            <li>
              <a
                href="https://ppl.imkh.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                포트폴리오
              </a>
            </li>
          </ul>
        </section>
      </section>
    </section>
    <section class="mt-6 pt-6 border-t border-gray-200 dark:border-dark text-center">
      <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer">
        Powered By <Icon name="logos:nuxt-icon" size="24" /> Nuxt 3
      </a>
    </section>
  </footer>
</template>

<style lang="postcss" scoped>
.grid-wrap {
  @apply lg:grid lg:grid-cols-12;

  p.head {
    @apply mx-auto lg:mx-0 mb-1 text-gray-400 dark:text-neutral-500 font-bold;
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
