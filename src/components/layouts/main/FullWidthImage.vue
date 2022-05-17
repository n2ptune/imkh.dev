<template>
  <div class="full-width-image">
    <div class="inner">
      <p>
        <span class="text-accent-main">개발자</span>의
        <span class="text-accent-main">개발</span> 로그
      </p>
      <p>같이 성장하는 학습 <span class="text-accent-main">블로그</span></p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.full-width-image {
  @apply relative w-full;

  height: 45rem;

  &::after {
    @apply absolute block w-full h-full top-0 left-0 z-20 opacity-70;

    background-color: theme('colors.dark.surface');
    content: '';
  }

  &::before {
    background-size: cover;
    background-position: center 80%;
    background-repeat: no-repeat;
    background-image: url(~@/assets/header-cover.jpg);
    mask-image: linear-gradient(
      to bottom,
      theme('colors.dark.surface'),
      transparent 90%
    );
    @apply absolute z-10 top-0 left-0 w-full h-full block;

    content: '';
  }

  & .inner {
    @apply flex flex-col justify-center items-center relative z-30
    h-full px-6 pb-12;

    & p {
      @apply text-4xl font-bold text-white-f text-center leading-tight;
    }
  }
}
</style>
