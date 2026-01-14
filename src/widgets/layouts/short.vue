<script setup lang="ts">
import { Footer } from '../footer'
import { Header } from '../header'
import { LayoutMain } from '../main'
import { SEOWrapper } from '../seo'
</script>

<template>
  <SEOWrapper>
    <Header />
    <LayoutMain class="!mt-8 !pb-0">
      <section
        class="lg:max-w-3xl mx-auto border-0 lg:border-x border-neutral-200 dark:border-neutral-800 py-16 px-8"
      >
        <slot />
      </section>
    </LayoutMain>
    <Footer />
  </SEOWrapper>
</template>
