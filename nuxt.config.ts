import { getGenerateRoutes, getBaseRoutes } from './scripts/file'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxt/content'
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
    classSuffix: ''
  },
  css: ['@/assets/font.css'],
  generate: {
    routes: [].concat(getBaseRoutes(), getGenerateRoutes())
  }
})
