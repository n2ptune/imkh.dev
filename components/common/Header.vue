<script lang="ts" setup></script>

<template>
  <header
    class="sticky top-0 z-50 p-4 border-b h-[72px] dark:border-neutral-900 dark:bg-dark"
  >
    <div class="mx-auto h-full">
      <div class="flex justify-between items-center h-full">
        <div class="text-base lg:text-lg xl:text-x">
          <span>DEVLOG</span>
          <span class="text-gray-300 dark:text-gray-500 mx-2">|</span>
          <span>개발 블로그</span>
        </div>
        <div>
          <a href="https://github.com/n2ptune" target="_blank" class="group">
            <Icon
              name="uil:github"
              size="36"
              class="transition duration-300 text-black opacity-80 dark:text-white group-hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
