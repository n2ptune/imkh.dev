<template>
  <div class="animate-pulse">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-24 lg:gap-12 lg:gap-y-24">
      <div v-for="_ in 12" class="space-y-4">
        <div class="sk min-h-[200px]"></div>
        <div class="sk w-2/3 h-6"></div>
      </div>
    </div>
  </div>
</template>
