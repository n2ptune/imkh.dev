import {
  getGenerateRoutes,
  getBaseRoutes,
  getRoutesByTags
} from './scripts/file'
import * as path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
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
  },
  srcDir: path.resolve(__dirname, 'src'),
  alias: {
    '~~': path.resolve(__dirname, 'src'),
    '@@': path.resolve(__dirname, 'src')
  }
})
