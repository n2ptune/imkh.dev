import { PageContextBuiltIn } from 'vite-plugin-ssr'

export function onBeforeRender(pageContext: PageContextBuiltIn) {
  const params = pageContext.routeParams

  console.log(params)

  return {
    pageContext: {
      pageProps: {
        name: '12345'
      }
    }
  }
}

export function prerender() {
  return ['a', 'b']
}
