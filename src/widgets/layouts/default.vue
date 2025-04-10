<script setup lang="ts">
import { SEOWrapper } from '../seo'
import { Header } from '../header'
import { LayoutMain } from '../main'
</script>

<template>
  <SEOWrapper>
    <Header />
    <LayoutMain>
      <slot />
    </LayoutMain>
  </SEOWrapper>
</template>
