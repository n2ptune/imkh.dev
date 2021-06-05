/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
  purge: ['src/**/*.{js,jsx,ts,tsx,html,css}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          primary: {
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
    extend: {}
  },
  plugins: []
}

module.exports = config
