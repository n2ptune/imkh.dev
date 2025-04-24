<script setup lang="ts">
import { SEOWrapper } from '../seo'
import { Header } from '../header'
import { LayoutMain } from '../main'
import { Footer } from '../footer'
</script>

<template>
  <SEOWrapper class="flex flex-col h-screen overflow-y-hidden">
    <Header />
    <LayoutMain :container="false" class="pt-8 pb-0 flex-1">
      <slot />
    </LayoutMain>
    <Footer />
  </SEOWrapper>
</template>
