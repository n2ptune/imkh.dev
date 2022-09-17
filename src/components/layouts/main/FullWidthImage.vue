<template>
  <div class="full-width-image">
    <!-- <div class="inner">
      <p>
        개발 블로그
      </p>
      <p>같이 성장하는 학습 <span class="text-accent-main">블로그</span></p>
    </div> -->
    <div
      class="flex flex-col h-full justify-center items-center antialiased text-line"
    >
      <div class="font-extralight text-lg sm-text">개발자의</div>
      <div class="text-4xl font-extrabold bg-accent-main px-2 mt-1 big-text">
        DEVLOG
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.full-width-image {
  @apply relative w-full;

  height: 45rem;

  &::after {
    @apply absolute block w-full h-full top-0 left-0 z-20 opacity-20;

    background-color: theme('colors.dark.surface');
    content: '';
  }

  &::before {
    background-size: cover;
    background-position: center 40%;
    background-repeat: no-repeat;
    background-image: url(~@/assets/header-cover.jpg);
    mask-image: linear-gradient(
      to bottom,
      theme('colors.dark.surface'),
      transparent 90%
    );
    @apply absolute z-10 left-0 h-full top-0 w-full block;

    content: '';
  }

  .text-line {
    @apply text-white-f;

    .sm-text {
      letter-spacing: 1.5em;
      margin-left: 1.45em;
    }

    .big-text {
      letter-spacing: 0.0125em;
    }
  }
}
</style>
