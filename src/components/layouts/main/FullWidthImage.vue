<template>
  <div class="full-width-image">
    <div class="inner">
      Hello
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
    @apply flex flex-wrap justify-center items-center relative z-20 h-full
    text-6xl font-bold;
  }
}
</style>
