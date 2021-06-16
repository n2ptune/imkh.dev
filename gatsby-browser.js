import React from 'react'
import './src/styles/global.css'
import { ThemeProvider, useDefaultTheme } from './src/context/theme'

export function onClientEntry() {
  /* eslint-disable-next-line */
  useDefaultTheme()
}

export function wrapRootElement({ element }) {
  /* eslint-disable-next-line */
  const theme = useDefaultTheme()

  return <ThemeProvider color={theme}>{element}</ThemeProvider>
}
