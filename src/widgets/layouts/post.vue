<script setup lang="ts">
import { Header } from '../header'
import { LayoutMain } from '../main'
import { SEOWrapper } from '../seo'
import { PostListWithTag } from '../sidebar'
</script>

<template>
  <SEOWrapper>
    <Header />
    <LayoutMain class="grid grid-cols-12 lg:gap-x-24">
      <!-- <aside class="col-span-3">A</aside> -->
      <PostListWithTag class="hidden lg:block lg:col-span-3" />
      <article class="col-span-12 lg:col-span-6">
        <slot />
      </article>
      <aside class="hidden lg:block lg:col-span-3">A</aside>
    </LayoutMain>
  </SEOWrapper>
</template>
