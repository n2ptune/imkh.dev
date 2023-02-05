import { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const sans = [...defaultTheme.fontFamily.sans]
sans.unshift('Pretendard')

const mono = [...defaultTheme.fontFamily.mono]
mono.unshift('"JetBrains Mono"')

const config: Config = {
  darkMode: 'class',
  content: ['./content/**/*.md', './components/**/*.{ts,vue,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans,
        mono
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

export default config