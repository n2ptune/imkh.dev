<script setup lang="ts">
import { TextLogo } from '~/entities/logo'
import { ContentSearch } from '~/features/content-search'
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
    class="h-24 lg:backdrop-blur-lg bg-white dark:bg-neutral-900 lg:bg-transparent lg:dark:bg-transparent fixed top-0 left-0 w-full py-8 px-4 flex border-b border-neutral-200 dark:border-neutral-800 z-50 overflow-hidden"
  >
    <div class="flex container-center justify-between items-center">
      <TextLogo is-link />

      <ContentSearch class="hidden lg:block" />

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
