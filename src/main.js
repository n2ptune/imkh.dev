/** global-css-layout */
import '@/styles/global.css'
import DefaultLayout from '@/layouts/Default.vue'
import VLayout from '@/layouts/VLayout.vue'
import PostLayout from '@/layouts/PostLayout.vue'

/** FontAwesomeIcon */
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
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
  faEllipsisH,
  faTimes,
  faBars,
  faExternalLinkAlt,
  faSearch
} from '@fortawesome/free-solid-svg-icons'

/** prismjs-theme */
// import 'prismjs/themes/prism-tomorrow.css'
import '@/styles/prism-custom.css'

/** plugins */
import VueDisqus from 'vue-disqus'
import Overlay from '@/plugins/Overlay.vue'
import VueInfiniteLoading from 'vue-infinite-loading'
import { VTooltip } from 'v-tooltip'

config.autoAddCss = process.env.NODE_ENV === 'production'

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
  faEllipsisH,
  faTimes,
  faBars,
  faExternalLinkAlt,
  faSearch
)

export default function(Vue, { router, head, isClient }) {
  head.htmlAttrs = { lang: 'ko' }

  // Loading font
  head.link.push(
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/gh/wan2land/d2coding/d2coding-full.css'
    },
    {
      rel: 'stylesheet',
      type: 'text/css',
      href:
        'https://cdn.jsdelivr.net/gh/moonspam/NanumBarunGothic@latest/nanumbarungothicsubset.css'
    }
  )

  // Add meta tag
  head.meta.push(
    {
      name: 'keywords',
      content:
        'javascript, es6, vue, react, firebase, graphql, nuxt, html5, css3, node.js'
    },
    {
      name: 'robots',
      content: 'All'
    },
    {
      key: 'description',
      name: 'description',
      content: '웹 기술/개발 개인 블로그'
    },
    {
      name: 'google-site-verification',
      content: 'Apvl3CGBeJfNwha8SQ4DbDVYem4yZTHeLQ-ckfH4FSw'
    },
    {
      key: 'og:title',
      property: 'og:title',
      content: 'imkh.dev'
    },
    {
      key: 'og:description',
      property: 'og:description',
      content: '웹 기술/개발 개인 블로그'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      key: 'og:url',
      property: 'og:url',
      content: 'https://imkh.dev/'
    },
    {
      key: 'fb:app_id',
      property: 'fb:app_id',
      content: 3111093142448463
    }
  )

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('VLayout', VLayout)
  Vue.component('PostLayout', PostLayout)
  Vue.component('font-awesome', FontAwesomeIcon)
  Vue.component('Overlay', Overlay)

  // Set plugins
  Vue.use(VueInfiniteLoading)
  Vue.use(VueDisqus)
  Vue.directive('tooltip', VTooltip)
}
