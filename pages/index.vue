<script lang="ts" setup>
definePageMeta({
  layout: 'list-layout'
})
</script>

<template>
  <section class="w-full">
    <div v-for="i in 1000" :key="i">
      {{ i }}
    </div>
  </section>
</template>
