import { shouldRenderAllRoutes } from './src/lib/route'
import path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {
    sources: {
      post: {
        driver: 'fs',
        prefix: '/post',
        base: path.resolve(__dirname, 'content/posts')
      }
    }
  },
  // generate: {
  //   routes: shouldRenderAllRoutes()
  // },
  srcDir: 'src/'
})
