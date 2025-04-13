// import {
//   getGenerateRoutes,
//   getBaseRoutes,
//   getRoutesByTags
// } from './scripts/file'
import * as path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // nitro: {
  //   prerender: {
  //     routes: ['/sitemap.xml']
  //   }
  // },
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@vueuse/nuxt',
    'motion-v/nuxt'
  ],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'vitesse-dark',
            dark: 'vitesse-dark',
            light: 'vitesse-light'
          }
        }
      }
    }
  },

  colorMode: {
    classSuffix: '',
    fallback: 'dark'
  },

  css: ['@/assets/font.css', '@/assets/base.css'],

  generate: {},

  experimental: {
    payloadExtraction: true
  },

  srcDir: path.resolve(__dirname, 'src'),

  alias: {
    '~~': path.resolve(__dirname, 'src'),
    '@@': path.resolve(__dirname, 'src')
  },

  compatibilityDate: '2025-02-24',

  dir: {
    layouts: 'widgets/layouts',
    public: '../public',
    plugins: 'shared/plugins'
  },

  ssr: false,

  imports: {
    dirs: ['shared/composables']
  }
})
