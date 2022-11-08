import { createSSRApp, defineComponent, h, markRaw } from 'vue'
import { PageContext } from '../types/context'
import Wrapper from '../components/Wrapper.vue'
import { PageContextBuiltIn, escapeInject } from 'vite-plugin-ssr'
import { renderToNodeStream } from '@vue/server-renderer'

export function createApp(pageContext: PageContext & Record<string, any>) {
  const { Page } = pageContext

  console.log(Page)

  let rootComponent: PageContext

  const wrapper = defineComponent({
    data: () => ({
      Page: markRaw(Page),
      pageProps: markRaw(pageContext.pageProps || {})
    }),
    created() {
      rootComponent = this
    },
    render() {
      return h(
        Wrapper,
        {},
        {
          default: () => {
            return h(this.Page, this.pageProps)
          }
        }
      )
    }
  })

  const app = createSSRApp(wrapper)

  return app
}

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const app = createApp(pageContext)
  const stream = renderToNodeStream(app)
  const documentHtml = escapeInject`<!DOCTYPE HTML>
  <html>
    <head>
      <title>test</title>
    </head>
    <body>
      <div id="app">${stream}</div>
    </body>
  </html>`

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true
    }
  }
}
