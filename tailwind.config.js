const plugin = require('tailwindcss/plugin')
const typography = require('@tailwindcss/typography')

const childrenPlugin = plugin(({ addVariant, e }) => {
  addVariant('children', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`children${separator}${className}`)} > *`
    })
  })
})

const colorFromTheme = (mode, theme) =>
  mode === 'dark' ? theme('colors.white') : theme('colors.black.primary.400')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
  purge: ['src/**/*.{js,jsx,ts,tsx,html,css}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            color: colorFromTheme('light', theme),
            h1: { color: colorFromTheme('light', theme) },
            h2: { color: colorFromTheme('light', theme) },
            h3: { color: colorFromTheme('light', theme) },
            h4: { color: colorFromTheme('light', theme) },
            h5: { color: colorFromTheme('light', theme) },
            h6: { color: colorFromTheme('light', theme) },
            blockquote: { color: colorFromTheme('light', theme) },
            a: { color: colorFromTheme('light', theme) }, // @TODO custom
            code: { color: colorFromTheme('light', theme) },
            strong: { color: colorFromTheme('light', theme) }
          }
        },
        dark: {
          css: {
            color: colorFromTheme('dark', theme),
            h1: { color: colorFromTheme('dark', theme) },
            h2: { color: colorFromTheme('dark', theme) },
            h3: { color: colorFromTheme('dark', theme) },
            h4: { color: colorFromTheme('dark', theme) },
            h5: { color: colorFromTheme('dark', theme) },
            h6: { color: colorFromTheme('dark', theme) },
            blockquote: { color: colorFromTheme('dark', theme) },
            a: { color: colorFromTheme('dark', theme) }, // @TODO custom
            code: { color: colorFromTheme('dark', theme) },
            strong: { color: colorFromTheme('dark', theme) }
          }
        }
      }),
      fontFamily: {
        sans: [
          '-system-ui',
          '-apple-system',
          '"Noto Sans"',
          // '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"'
        ]
      },
      colors: {
        black: {
          primary: {
            10: '#f2f3f9',
            50: '#404040',
            100: '#2A2A2A',
            200: '#1C1C1C',
            300: '#121212',
            400: '#080808',
            500: '#040404'
          }
        }
      }
    }
  },
  variants: {
    extend: {
      display: ['children'],
      textColor: ['children', 'hover'],
      textOpacity: ['children'],
      opacity: ['children'],
      backgroundColor: ['children'],
      transform: ['children'],
      transitionDuration: ['children'],
      transitionProperty: ['children'],
      typography: ['dark']
    }
  },
  plugins: [childrenPlugin, typography]
}

module.exports = config
