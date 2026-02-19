import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { LenisProvider } from './Lenis'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <LenisProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </LenisProvider>
    </ThemeProvider>
  )
}
