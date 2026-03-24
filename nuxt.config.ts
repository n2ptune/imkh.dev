import * as path from 'node:path'
import { getPostRoutes, getShortRoutes, getStaticRoutes } from './scripts/file'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ko'
      },
      titleTemplate: '%s | imkh.dev',
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:site_name', content: 'imkh.dev' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ['/editor'],
      routes: [...getStaticRoutes(), ...getPostRoutes(), ...getShortRoutes()]
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
    '@nuxt/scripts',
    'nuxt-svgo'
  ],

  icon: {
    serverBundle: {
      collections: ['akar-icons', 'material-symbols', 'mdi', 'solar', 'tabler']
    },
    clientBundle: {
      // 정적 분석으로 감지되는 아이콘 자동 포함
      scan: true,
      // 동적으로 사용되어 스캔으로 감지되지 않는 아이콘 명시 포함
      icons: [
        'mdi:vuejs',
        'mdi:react',
        'mdi:language-javascript',
        'mdi:language-typescript',
        'mdi:nodejs',
        'mdi:angular',
        'mdi:language-css3',
        'mdi:language-rust',
        'mdi:docker',
        'mdi:git',
        'tabler:binary-tree',
        'solar:document-bold-duotone',
        'akar-icons:github-fill',
        'material-symbols:favorite',
        'material-symbols:favorite-outline',
        'material-symbols:light-mode',
        'material-symbols:dark-mode'
      ]
    }
  },

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
            'rust',
            'sh'
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
    routes: [...getStaticRoutes(), ...getPostRoutes(), ...getShortRoutes()]
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
    plugins: 'shared/plugins',
    middleware: 'app/middlewares'
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