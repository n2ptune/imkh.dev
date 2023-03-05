<script lang="ts" setup></script>

<template>
  <header
    class="sticky top-0 z-50 p-4 h-[72px] bg-white bg-opacity-40 dark:bg-opacity-80 border-b dark:border-neutral-900 dark:bg-dark backdrop-blur-lg"
  >
    <div class="mx-auto h-full">
      <div class="flex justify-between items-center h-full">
        <div class="text-base lg:text-lg xl:text-x">
          <span>DEVLOG</span>
          <span class="text-gray-300 dark:text-gray-500 mx-2">|</span>
          <span>개발 블로그</span>
        </div>
        <div class="space-x-3">
          <CommonThemeSwitch />
          <a href="https://github.com/n2ptune" target="_blank" class="group">
            <Icon name="ri:github-line" size="36" class="clickable-icon" />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
