import React from 'react'

import { ChakraProvider } from '@chakra-ui/core'

import { customTheme } from '~/styles/theme'

export function ThemeContainer({ children }: WithChildren) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      {children}
    </ChakraProvider>
  )
}
