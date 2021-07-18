import '@/styles/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faTimes,
  faBars,
  faSearch,
  faArrowRight,
  faBookmark,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import '@/styles/prism-custom.css'
import VueInfiniteLoading from 'vue-infinite-loading'
import VueFuse from 'vue-fuse'

library.add(
  faGithub,
  faTimes,
  faBars,
  faSearch,
  faArrowRight,
  faBookmark,
  faChevronDown
)

export default function(Vue, { router, head, isClient }) {
  head.htmlAttrs = { lang: 'ko' }

  Vue.component('font-awesome', FontAwesomeIcon)
  Vue.use(VueInfiniteLoading)
  Vue.use(VueFuse)
}
