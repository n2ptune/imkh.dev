<script setup lang="ts">
import { useToc } from '~/entities/post'
import { Header } from '../header'
import { LayoutMain } from '../main'
import { SEOWrapper } from '../seo'
import { PostListWithTag, PostSummary, TableContents } from '../sidebar'
import { TypeDivider } from '../divider'
import { Footer } from '../footer'

const { toc } = useToc()
</script>

<template>
  <!-- @apply 동작 안해서 클래스 중복 https://github.com/tailwindlabs/tailwindcss/discussions/16429 -->
  <SEOWrapper>
    <Header />
    <LayoutMain class="grid grid-cols-12 xl:gap-x-24">
      <aside
        class="hidden xl:block xl:col-span-3 xl:sticky xl:top-32 xl:max-h-[calc(80vh-(var(--spacing)*32))] xl:text-sm xl:space-y-12"
      >
        <PostSummary />
        <TypeDivider type="horizontal" />
        <PostListWithTag />
      </aside>
      <article class="col-span-12 xl:col-span-6">
        <slot />
      </article>
      <aside
        class="hidden xl:block xl:col-span-3 xl:sticky xl:top-32 xl:max-h-[calc(80vh-(var(--spacing)*32))]"
      >
        <TableContents :level="0" :links="toc" />
      </aside>
    </LayoutMain>
    <Footer />
  </SEOWrapper>
</template>
