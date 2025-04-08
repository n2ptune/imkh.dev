<script setup lang="ts">
import { SEOWrapper } from '../seo'
import { Header } from '../header'
</script>

<template>
  <SEOWrapper>
    <Header />
    <main class="container-center">
      <slot />
    </main>
  </SEOWrapper>
</template>
