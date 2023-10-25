import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const sans = [...defaultTheme.fontFamily.sans]
sans.unshift('Pretendard')

const mono = [...defaultTheme.fontFamily.mono]
mono.unshift('"JetBrains Mono"')

const config: Config = {
  darkMode: 'class',
  content: ['./content/**/*.md', './src/components/**/*.{ts,vue,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans,
        mono
      },
      colors: {
        dark: '#080808',
        darkw: '#f4ffff',
        darkh: '#96c9da',
        darkl: '#0f0f0f',
        'dark-border': '#080808'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true })
  ]
}

export default config
