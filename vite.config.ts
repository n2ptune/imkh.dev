import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteSSGOptions } from 'vite-ssg'
import Pages from 'vite-plugin-pages'

type SSGOptions = UserConfig & ViteSSGOptions

const options: SSGOptions = {
  plugins: [
    vue(),
    Pages({
      dirs: ['content/posts'],
      extensions: ['md']
    })
  ]
}

export default options
