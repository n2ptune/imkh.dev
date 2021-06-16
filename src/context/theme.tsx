import React, { createContext, useState } from 'react'

type ColorScheme = 'light' | 'dark'

type ThemeContextType = {
  color: ColorScheme
  toggleTheme: (s: ColorScheme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  color: 'light',
  toggleTheme: () => {}
})

export const ThemeProvider: React.FC<{ color: ColorScheme }> = ({
  children,
  color
}) => {
  const [scheme, setScheme] = useState<ColorScheme>(color)

  const toggleTheme = (colorScheme: ColorScheme) => {
    setScheme(colorScheme)
    window.localStorage.removeItem('theme')

    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    window.localStorage.setItem('theme', colorScheme)
  }

  return (
    <ThemeContext.Provider value={{ color: scheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useDefaultTheme: () => ColorScheme = () => {
  const setTheme = (theme: ColorScheme) => {
    document.documentElement.classList.add(theme)
    window.localStorage.removeItem('theme')
    window.localStorage.setItem('theme', theme)
  }
  const storageTheme = window.localStorage.getItem('theme') as ColorScheme

  if (storageTheme) {
    setTheme(storageTheme)
    return storageTheme
  } else {
    const darkScheme = window.matchMedia('(prefers-color-scheme: dark)')

    if (darkScheme.matches) {
      setTheme('dark')
      return 'dark'
    } else {
      setTheme('light')
      return 'light'
    }
  }
}

export default ThemeContext
