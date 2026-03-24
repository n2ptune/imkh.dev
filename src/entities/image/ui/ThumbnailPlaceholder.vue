<script setup lang="ts">
import type { PostCollectionItem } from '@nuxt/content'
import Logo from '~/assets/imkh_symbolic_logo.svg'

interface Props {
  post: PostCollectionItem
}

const { post } = defineProps<Props>()

// 태그별 아이콘 및 색상 매핑
const tagConfig: Record<string, { icon: string; color: string }> = {
  vue: { icon: 'mdi:vuejs', color: 'from-emerald-400/20 to-emerald-600/20' },
  react: { icon: 'mdi:react', color: 'from-sky-400/20 to-sky-600/20' },
  javascript: {
    icon: 'mdi:language-javascript',
    color: 'from-yellow-300/20 to-yellow-500/20'
  },
  typescript: {
    icon: 'mdi:language-typescript',
    color: 'from-blue-400/20 to-blue-600/20'
  },
  nodejs: { icon: 'mdi:nodejs', color: 'from-green-400/20 to-green-600/20' },
  algorithm: {
    icon: 'tabler:binary-tree',
    color: 'from-orange-400/20 to-orange-600/20'
  },
  angular: { icon: 'mdi:angular', color: 'from-red-400/20 to-red-600/20' },
  css: { icon: 'mdi:language-css3', color: 'from-blue-400/20 to-blue-600/20' },
  scss: { icon: 'mdi:sass', color: 'from-pink-400/20 to-pink-600/20' },
  docker: { icon: 'mdi:docker', color: 'from-blue-500/20 to-cyan-500/20' },
  git: { icon: 'mdi:git', color: 'from-orange-500/20 to-red-500/20' },
  mysql: {
    icon: 'mdi:database-mysql',
    color: 'from-blue-600/20 to-blue-400/20'
  },
  firebase: {
    icon: 'mdi:firebase',
    color: 'from-orange-400/20 to-yellow-400/20'
  },
  linux: { icon: 'mdi:linux', color: 'from-neutral-400/20 to-neutral-600/20' },
  rust: {
    icon: 'mdi:language-rust',
    color: 'from-orange-700/20 to-orange-500/20'
  },
  electron: {
    icon: 'mdi:electron-framework',
    color: 'from-cyan-400/20 to-blue-400/20'
  },
  ai: { icon: 'mdi:robot', color: 'from-purple-400/20 to-purple-600/20' }
}

const firstTag = computed(() => post.tags?.[0]?.toLowerCase() || 'default')
const config = computed(
  () =>
    tagConfig[firstTag.value] || {
      icon: 'solar:document-bold-duotone',
      color: 'from-neutral-400/20 to-neutral-600/20'
    }
)
</script>

<template>
  <div
    class="relative w-full h-[200px] overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800/50 flex items-center justify-center transition-all duration-300"
    :class="config.color"
  >
    <!-- 배경 워터마크 (블로그 로고) -->
    <Logo
      class="absolute -right-8 -bottom-8 w-40 h-40 opacity-5 dark:opacity-[0.03] rotate-12 pointer-events-none"
    />

    <!-- 중앙 태그 아이콘 섹션 -->
    <div class="relative z-10 flex flex-col items-center space-y-3">
      <!-- 정사각형 아이콘 컨테이너 -->
      <div
        class="size-20 rounded-2xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-white/20 dark:border-neutral-700/30 shadow-sm flex items-center justify-center"
      >
        <Icon
          :name="config.icon"
          class="text-4xl text-neutral-600 dark:text-neutral-300"
        />
      </div>

      <!-- 태그 텍스트 -->
      <span
        class="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500/80 dark:text-neutral-400/80 bg-neutral-200/50 dark:bg-neutral-800/50 px-2 py-0.5 rounded-full"
      >
        {{ firstTag }}
      </span>
    </div>

    <!-- 은은한 그라데이션 오버레이 -->
    <div
      class="absolute inset-0 bg-gradient-to-br opacity-40 pointer-events-none"
      :class="config.color"
    />
  </div>
</template>
