import { PageContextBuiltIn } from 'vite-plugin-ssr';
import { createApp } from './_default.page.server';

let app: ReturnType<typeof createApp>

async function render(pageContext: PageContextBuiltIn) {
  if (!app) {
    app = createApp(pageContext)
    app.mount('#app')
  } else {
    console.log(111)
  }
}