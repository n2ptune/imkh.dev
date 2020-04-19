<template>
  <transition name="slide" appear>
    <div class="left side">
      <div class="flex p-2 flex-col">
        <g-link to="/js-module/">test</g-link>
      </div>
    </div>
  </transition>
</template>

<script>
export default {}
</script>

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
