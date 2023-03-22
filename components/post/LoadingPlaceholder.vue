<script lang="ts" setup>
onMounted(() => {
  console.log('placeholder')
})
</script>

<template>
  <div class="animate-pulse space-y-4 container mx-auto min-h-screen">
    <div class="w-full h-12 sk"></div>
    <div class="w-2/3 mx-auto h-6 sk"></div>
    <div class="prose mx-auto !mt-24 space-y-4">
      <div class="sk w-48 h-8"></div>
      <div class="sk w-full h-4"></div>
      <div class="sk w-2/3 h-4"></div>
      <div class="sk w-1/3 h-4"></div>
    </div>
    <div v-for="i in 3" :key="i" class="prose mx-auto !mt-24 space-y-4">
      <div class="sk w-48 h-8"></div>
      <div class="sk w-full h-4"></div>
      <div class="sk w-2/3 h-4"></div>
      <div class="sk w-1/3 h-4"></div>
    </div>
  </div>
</template>
