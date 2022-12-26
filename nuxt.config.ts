import { shouldRenderAllRoutes } from './src/lib/route'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  generate: {
    routes: shouldRenderAllRoutes()
  },
  srcDir: 'src/'
})
