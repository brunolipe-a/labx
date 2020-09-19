import { theme } from '@chakra-ui/core'
import { merge } from '@chakra-ui/utils'

export const customTheme = merge(theme, {
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
    mono: 'Menlo, monospace'
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  radii: {
    sm: '5px',
    md: '8px'
  },
  colors: {
    brand: {
      100: '#D6D6FF',
      200: '#B8B8FF',
      300: '#9E9EFF',
      400: '#8585FF',
      500: '#6C6CFF',
      600: '#5656CC',
      700: '#404099',
      800: '#2B2B66',
      900: '#20204D'
    },
    gray: {
      100: '#F5F5FA',
      200: '#CCCCE0',
      300: '#A7A7C7',
      400: '#8484AB',
      500: '#666691',
      600: '#545478',
      700: '#393952',
      800: '#1F1F2C',
      900: '#0E0E14'
    },
    red: {
      100: '#EFB6C3',
      200: '#EF8FA6',
      300: '#EF7894',
      400: '#EF6082',
      500: '#EF476F',
      600: '#BF264B',
      700: '#9E203E',
      800: '#7A1830',
      900: '#591223'
    },
    green: {
      100: '#CAF2EA',
      200: '#62E3C9',
      300: '#2FC9AB',
      400: '#29B095',
      500: '#23967F',
      600: '#1E806C',
      700: '#1A6E5D',
      800: '#145447',
      900: '#0F4036'
    }
  }
})
