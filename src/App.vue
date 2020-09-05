<template>
  <transition name="opacity" appear mode="out-in">
    <router-view />
  </transition>
</template>

<style scoped>
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.5s ease;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0.1;
}
.opacity-enter-to,
.opacity-leave {
  opacity: 1;
}
</style>
