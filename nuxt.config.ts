import * as path from 'node:path'
import { getPostRoutes, getStaticRoutes } from './scripts/file'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [...getStaticRoutes(), ...getPostRoutes()]
    }
  },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxt/scripts'
  ],

  site: {
    enabled: true,
    url: 'https://imkh.dev'
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'vitesse-light',
            dark: 'vitesse-black',
            light: 'vitesse-light'
          },
          themes: ['vitesse-light', 'vitesse-dark', 'vitesse-black'],
          langs: [
            'js',
            'jsx',
            'json',
            'ts',
            'tsx',
            'vue',
            'css',
            'html',
            'vue',
            'bash',
            'md',
            'mdc',
            'yaml',
            'rust'
          ]
        }
      }
    }
  },

  colorMode: {
    classSuffix: '',
    fallback: 'dark'
  },

  css: ['@/assets/font.css', '@/assets/base.css'],

  generate: {
    routes: [...getStaticRoutes(), ...getPostRoutes()]
  },

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

  ssr: true,

  imports: {
    dirs: ['shared/composables']
  },

  vite: {
    plugins: [tailwindcss()]
  },

  components: [{ path: '~/features/content-render/ui', pathPrefix: false }]
})