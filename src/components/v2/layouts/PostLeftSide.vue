<template>
  <transition name="slide" appear>
    <div class="left side">
      test
    </div>
  </transition>
</template>

<style lang="postcss" scoped>
.left {
  --left-side-max-width: 340px;
  --left-side-outside-width: calc(-1 * var(--left-side-max-width));
  width: var(--left-side-max-width);
  left: 0;
  top: 0;
  z-index: 1;
  @apply bg-white-f shadow-2xl;
}
.slide-enter-active,
.slide-leave-active {
  -webkit-transition: opacity 0.5s, -webkit-transform 0.5s;
  transition: opacity 0.5s, -webkit-transform 0.5s;
  transition: transform 0.5s, opacity 0.5s;
  transition: transform 0.5s, opacity 0.5s, -webkit-transform 0.5s;
  transform: translateX(var(--left-side-outside-width));
}
.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(var(--left-side-outside-width));
}
</style>
