import path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/image-edge'],
  content: {
    sources: {
      post: {
        driver: 'fs',
        prefix: '/',
        base: path.resolve(__dirname, 'content/posts')
      }
    }
  },
  generate: {},
  srcDir: 'src/'
})
