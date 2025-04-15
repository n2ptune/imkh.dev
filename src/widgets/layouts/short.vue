<script setup lang="ts">
import { Footer } from '../footer'
import { Header } from '../header'
import { LayoutMain } from '../main'
import { SEOWrapper } from '../seo'
</script>

<template>
  <SEOWrapper>
    <Header />
    <LayoutMain class="grid grid-cols-12 lg:gap-x-24">
      <aside class="hidden lg:block lg:col-span-3"></aside>

      <article class="col-span-12 lg:col-span-6">
        <slot />
      </article>
    </LayoutMain>
    <Footer />
  </SEOWrapper>
</template>
