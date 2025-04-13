<script setup lang="ts">
import { Header } from '../header'
import { LayoutMain } from '../main'
import { SEOWrapper } from '../seo'
import { PostListWithTag, PostSummary, TableContents } from '../sidebar'
</script>

<template>
  <!-- @apply 동작 안해서 클래스 중복 https://github.com/tailwindlabs/tailwindcss/discussions/16429 -->
  <SEOWrapper>
    <Header />
    <LayoutMain class="grid grid-cols-12 lg:gap-x-24">
      <aside
        class="hidden lg:block lg:col-span-3 sticky top-32 max-h-[calc(80vh-(var(--spacing)*32))] text-sm space-y-12"
      >
        <PostSummary />
        <div class="h-px w-full bg-neutral-200 dark:bg-neutral-800"></div>
        <PostListWithTag />
      </aside>
      <article class="col-span-12 lg:col-span-6">
        <slot />
      </article>
      <aside
        class="hidden lg:block lg:col-span-3 sticky top-32 max-h-[calc(80vh-(var(--spacing)*32))]"
      >
        <TableContents />
      </aside>
    </LayoutMain>
  </SEOWrapper>
</template>
