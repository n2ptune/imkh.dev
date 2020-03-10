<template>
  <footer
    class="flex flex-col justify-center items-center relative bottom-0 w-full bg-gray-800 px-2 py-4 sm:px-6"
  >
    <div class="text-white-f text-lg">
      (C) 2020. n2ptune
    </div>
    <div class="text-white-500 mb-2">
      <div class="inline-block align-middle">
        <span>Made with </span>
        <g-image
          src="@/assets/gridsome_icon.svg"
          class="inline-block align-top opacity-75"
          width="24"
        />
      </div>
    </div>
    <div class="my-2">
      <a href="https://github.com/n2ptune" target="_blank">
        <font-awesome
          :icon="['fab', 'github']"
          size="2x"
          class="text-white-700 hover:text-white-f"
        />
      </a>
    </div>
  </footer>
</template>
