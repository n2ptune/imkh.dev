<template>
  <footer
    class="w-full mt-12 pt-12 pb-24 lg:pt-16 lg:pb-36 bg-gray-50 border-t border-gray-200 dark:bg-[#0f0f0f] dark:border-none"
  >
    <section class="container mx-auto">
      <section class="grid-wrap">
        <section class="col-span-4 text-xl">DEVLOG 개발 블로그</section>
        <section class="col-span-8 grid-wrap">
          <section class="col-span-4 mx-auto">
            <p class="head">heading</p>
            <ul>
              <li>a-1</li>
              <li>a-2</li>
            </ul>
          </section>
          <section class="col-span-4 mx-auto">
            <p class="head">heading</p>
          </section>
          <section class="col-span-4 mx-auto">
            <p class="head">heading</p>
          </section>
        </section>
      </section>
      <section class="mt-24 text-center text-2xl">Nuxt</section>
    </section>
  </footer>
</template>

<style lang="postcss" scoped>
.grid-wrap {
  @apply grid grid-cols-12;

  p.head {
    @apply mb-4;
  }

  ul {
    @apply leading-relaxed;
  }
}
</style>
