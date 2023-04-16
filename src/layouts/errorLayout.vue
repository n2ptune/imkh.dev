<script lang="ts" setup>
import SEOWrapper from './SEOWrapper.vue'
</script>

<template>
  <SEOWrapper>
    <section
      class="w-screen h-screen flex justify-center items-center flex-col space-y-2"
    >
      <slot />
    </section>
  </SEOWrapper>
</template>
