import '@/styles/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub,
  faInstagram,
  faFacebook
} from '@fortawesome/free-brands-svg-icons'
import {
  faTimesCircle,
  faAngleDoubleUp,
  faHighlighter,
  faClipboard,
  faCalendarAlt,
  faChevronLeft,
  faStream,
  faEnvelope,
  faTimes,
  faBars,
  faExternalLinkAlt,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import '@/styles/prism-custom.css'
import Overlay from '@/plugins/Overlay.vue'
import VueInfiniteLoading from 'vue-infinite-loading'

// config.autoAddCss = process.env.NODE_ENV === 'production'

library.add(
  faGithub,
  faTimesCircle,
  faAngleDoubleUp,
  faHighlighter,
  faClipboard,
  faCalendarAlt,
  faChevronLeft,
  faStream,
  faEnvelope,
  faInstagram,
  faFacebook,
  faTimes,
  faBars,
  faExternalLinkAlt,
  faSearch
)

export default function(Vue, { router, head, isClient }) {
  head.htmlAttrs = { lang: 'ko' }

  Vue.component('font-awesome', FontAwesomeIcon)
  Vue.component('Overlay', Overlay)
  Vue.use(VueInfiniteLoading)
}
