<script setup lang="ts">
import { SEOWrapper } from '../seo'
import { Header } from '../header'
import { LayoutMain } from '../main'
import { Footer } from '../footer'
</script>

<template>
  <SEOWrapper>
    <Header />
    <LayoutMain>
      <slot />
    </LayoutMain>
    <Footer />
  </SEOWrapper>
</template>
