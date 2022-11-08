import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ssr } from 'vite-plugin-ssr/plugin'
import md from 'vite-plugin-md'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    md(),
    ssr({ prerender: true,  })
  ]
  // optimizeDeps: { include: ['cross-fetch'] }
})
