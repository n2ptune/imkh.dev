module.exports = {
  theme: {
    fontFamily: {
      mono: ['Hack', 'D2Coding', 'monospace'],
      display: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Noto Sans"',
        '"NanumBarunGothic"',
        'sans-serif'
      ],
      head: ['Herbarium']
    },
    extend: {
      fontSize: {
        xl: '1.3rem'
      },
      screens: {
        '2xl': '1480px'
      },
      colors: {
        /**
         * @colors https://flatuicolors.com/palette/nl
         */
        sunflower: '#FFC312',
        energos: '#C4E538',
        'blue-martina': '#12CBC4',
        rose: '#FDA7DF',
        'bara-red': '#ED4C67',
        'radiant-yellow': '#F79F1F',
        'android-green': '#A3CB38',
        'm-sea': '#1289A7',
        'lavender-tea': '#D980FA',
        'very-berry': '#B53471',
        'puffins-bill': '#EE5A24',
        'forgotten-purple': '#9980FA',
        hollyhock: '#833471',
        'red-pigment': '#EA2027',
        sea: '#161518',
        'sea-low': '#27252A',
        white: {
          '100': 'rgba(255, 255, 255, 0.1)',
          '200': 'rgba(255, 255, 255, 0.2)',
          '300': 'rgba(255, 255, 255, 0.3)',
          '400': 'rgba(255, 255, 255, 0.4)',
          '500': 'rgba(255, 255, 255, 0.5)',
          '600': 'rgba(255, 255, 255, 0.6)',
          '700': 'rgba(255, 255, 255, 0.7)',
          '800': 'rgba(255, 255, 255, 0.8)',
          '900': 'rgba(255, 255, 255, 0.9)',
          f: 'rgb(255, 255, 255)'
        }
      }
    }
  },
  variants: {},
  plugins: []
}
