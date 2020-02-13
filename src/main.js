// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import '@/styles/global.css'
import DefaultLayout from '~/layouts/Default.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
// import {  } from '@fortawesome/free-solid-svg-icons'
// import {  } from '@fortawesome/free-regular-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/prism-code.css'

config.autoAddCss = false
library.add(faGithub)

export default function(Vue, { router, head, isClient }) {
  head.htmlAttrs = { lang: 'ko' }

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('font-awesome', FontAwesomeIcon)
}
