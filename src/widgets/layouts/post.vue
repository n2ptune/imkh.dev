<script setup lang="ts">
import { useToc } from '~/entities/post'
import { Header } from '../header'
import { LayoutMain } from '../main'
import { SEOWrapper } from '../seo'
import { TableContents } from '../sidebar'
import { Footer } from '../footer'

const { toc } = useToc()
</script>

<template>
  <SEOWrapper>
    <Header />
    <LayoutMain class="grid grid-cols-12 gap-x-0 xl:gap-x-12">
      <!-- 본문 영역: 좌측 사이드바 영역만큼 비워두고 시작 (xl:col-start-3) -->
      <article
        class="col-span-12 xl:col-span-7 xl:col-start-3 2xl:col-span-7 2xl:col-start-3"
      >
        <slot />
      </article>

      <!-- 우측 목차: 포스트 읽을 때 유용하므로 유지하되, 디자인에 맞춰 배치 -->
      <aside
        class="hidden xl:block xl:col-span-3 2xl:col-span-2 xl:sticky xl:top-32 xl:max-h-[calc(80vh-(var(--spacing)*32))]"
      >
        <div class="border-l border-neutral-100 dark:border-neutral-800">
          <div
            class="flex items-center gap-2 mb-4 pl-8 text-neutral-400 font-bold text-xs uppercase tracking-widest"
          >
            <Icon name="i-tabler-list" />
            목차
          </div>
          <TableContents :level="0" :links="toc as any" />
        </div>
      </aside>
    </LayoutMain>
    <Footer />
  </SEOWrapper>
</template>
