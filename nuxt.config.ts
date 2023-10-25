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
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt'
  ],
  content: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark'
      },
      preload: [
        'css',
        'dockerfile',
        'html',
        'js',
        'json',
        'jsx',
        'python',
        'sh',
        'shell',
        'tsx',
        'rust',
        'vue-html',
        'vue'
      ]
    }
  },
  colorMode: {
    classSuffix: '',
    fallback: 'dark'
  },
  css: ['@/assets/font.css', '@/assets/base.postcss'],
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
