import {
  getGenerateRoutes,
  getBaseRoutes,
  getRoutesByTags
} from './scripts/file'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: process.env.NODE_ENV !== 'development',
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxt/content',
    '@pinia/nuxt'
  ],
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      preload: ['jsx', 'tsx', 'vue']
    }
  },
  colorMode: {
    classSuffix: '',
    fallback: 'dark'
  },
  css: ['@/assets/font.css', '@/assets/base.css'],
  generate: {
    routes: ([] as string[]).concat(
      getBaseRoutes(),
      getGenerateRoutes(),
      getRoutesByTags()
    )
  },
  experimental: {
    payloadExtraction: true
  }
})
