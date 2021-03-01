<template>
  <div class="full-width-image">
    <div class="inner">
      <p>
        <span class="text-purple-300">개발자</span>의
        <span class="text-purple-300">개발</span> 로그
      </p>
      <p>같이 성장하는 학습 <span class="text-purple-300">블로그</span></p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.full-width-image {
  @apply relative w-full;

  height: 30rem;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(~@/assets/header-cover.jpg);
  top: 72px;

  &::before {
    @apply absolute z-10 top-0 left-0 w-full h-full block;

    content: '';
    background-color: rgba(0, 0, 0, 0.5);
  }

  & .inner {
    @apply flex flex-col justify-center items-center relative z-20
    h-full px-6;

    & p {
      @apply text-4xl font-bold text-white-f text-center leading-tight;
    }

    & .transition-button {
      @apply transition-all duration-300 shadow-lg;

      &:hover {
        @apply bg-purple-600 transform -translate-y-1;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
