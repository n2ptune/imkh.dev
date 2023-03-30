import dayjs from 'dayjs'
import LocalizeFormat from 'dayjs/plugin/localizedFormat'
import { defineNuxtPlugin } from '#app'

interface PluginsInjections {
  $dayjs: typeof dayjs
}

declare module '#app' {
  interface NuxtApp extends PluginsInjections {}
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp extends PluginsInjections {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginsInjections {}
}

dayjs.extend(LocalizeFormat)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dayjs
    }
  }
})
