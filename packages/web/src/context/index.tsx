import React from 'react'

import { AuthProvider } from './auth'
import { ThemeContainer } from './theme'

export function AppProvider({ children }: WithChildren) {
  return (
    <ThemeContainer>
      <AuthProvider>{children}</AuthProvider>
    </ThemeContainer>
  )
}
