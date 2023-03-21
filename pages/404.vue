<script lang="ts" setup>
definePageMeta({
  layout: 'error-layout'
})

const router = useRouter()
</script>

<template>
  <div>
    <h2 class="text-3xl font-black">404</h2>
  </div>
  <div>
    <button
      class="rounded-xl p-3 transition-colors duration-200 bg-opacity-0 bg-gray-200 hover:bg-opacity-5 dark:text-gray-300 hover:dark:text-white"
      @click="router.push({ path: '/' })"
    >
      <Icon name="uil:home-alt" size="24" />
    </button>
  </div>
</template>
