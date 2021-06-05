import './src/styles/global.css'

export function onClientEntry() {
  const setTheme = theme => {
    document.documentElement.classList.add(theme)
    window.localStorage.removeItem('theme')
    window.localStorage.setItem('theme', theme)
  }
  const storageTheme = window.localStorage.getItem('theme')

  if (storageTheme) {
    setTheme(storageTheme)
  } else {
    const darkScheme = window.matchMedia('(prefers-color-scheme: dark)')

    if (darkScheme.matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
}
