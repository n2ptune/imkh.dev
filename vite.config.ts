import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteSSGOptions } from 'vite-ssg'

type SSGOptions = UserConfig & ViteSSGOptions

const options: SSGOptions = {
  plugins: [vue()]
}

export default options
