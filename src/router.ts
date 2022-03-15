import { RouterOptions } from 'vite-ssg'
import { createWebHistory, RouteRecordRaw } from 'vue-router'
import fileRoutes from '~pages'

const routes: RouterOptions = {
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./components/HelloWorld.vue')
    }
  ]
}

console.log(fileRoutes)

// const fr: RouteRecordRaw[] = fileRoutes.map(route => ({ path: route.}))

routes.routes.push()

export { routes }
