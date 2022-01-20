import { RouterOptions } from 'vite-ssg'

export const routes: RouterOptions = {
  routes: [
    {
      path: '/',
      component: () => import('./components/HelloWorld.vue')
    }
  ]
}
