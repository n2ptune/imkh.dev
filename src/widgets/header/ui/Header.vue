<script setup lang="ts">
import { TextLogo } from '~/entities/logo'
import { ToggleTheme } from '~/features/theme-toggle'
import { LinkGithub } from '~/shared/icon-button'

const links = [
  {
    to: '/',
    label: '포스트'
  },
  {
    to: '/s',
    label: '메모'
  }
]
</script>

<template>
  <header
    class="h-24 lg:backdrop-blur-xl bg-white dark:bg-neutral-900 lg:bg-transparent lg:dark:bg-transparent fixed top-0 left-0 w-full py-8 px-4 flex border-b border-neutral-200 dark:border-neutral-800 z-50 overflow-hidden"
  >
    <div class="flex container-center justify-between items-center">
      <TextLogo />

      <div class="flex flex-nowrap items-center space-x-1">
        <UButton
          v-for="link in links"
          :key="link.to"
          variant="link"
          color="neutral"
          size="xl"
          :to="link.to"
          active-class="font-bold"
          active-color="primary"
        >
          {{ link.label }}
        </UButton>

        <ClientOnly>
          <ToggleTheme />
        </ClientOnly>
        <LinkGithub />
      </div>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
@media (width >= 64rem) {
  header {
    &::before {
      --size: 480px;
      top: 0;
      left: calc(50% - var(--size) / 2);

      content: '';
      display: block;
      width: var(--size);
      height: var(--size);
      border-radius: 9999px;
      filter: blur(calc(var(--size) / 7));
      background: -webkit-linear-gradient(to right, #40e0d0, #ff8c00, #ff0080);
      background: linear-gradient(to right, #40e0d0, #ff8c00, #ff0080);
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      z-index: -60;
      position: absolute;
      animation: rotate 35s cubic-bezier(0.8, 0.2, 0.2, 0.8) alternate infinite;
      opacity: 1;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
