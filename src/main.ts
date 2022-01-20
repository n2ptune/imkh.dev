import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  routes,
  ({ app, router, routes, isClient, initialState }) => {
    console.log(app)
  }
)
