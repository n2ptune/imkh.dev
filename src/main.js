/** global-css-layout */
import '@/styles/global.css'
import DefaultLayout from '~/layouts/Default.vue'

/** FontAwesomeIcon */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faTimesCircle,
  faAngleDoubleUp,
  faHighlighter,
  faClipboard,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

/** prismjs-theme */
import 'prismjs/themes/prism-tomorrow.css'
import '@/styles/prism-custom.css'

/** plugins */
import VueInfiniteLoading from 'vue-infinite-loading'
import { VTooltip } from 'v-tooltip'

library.add(
  faGithub,
  faTimesCircle,
  faAngleDoubleUp,
  faHighlighter,
  faClipboard,
  faCalendarAlt
)

export default function(Vue, { router, head, isClient }) {
  head.htmlAttrs = { lang: 'ko' }

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
      content: "I Don't Know Web"
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
      content: 'https://blog.n2ptune.xyz/'
    }
  )

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('font-awesome', FontAwesomeIcon)

  // Set plugins
  Vue.use(VueInfiniteLoading)
  Vue.directive('tooltip', VTooltip)
}
