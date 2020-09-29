import { theme } from '@chakra-ui/core'
import { merge } from '@chakra-ui/utils'

export const customTheme: typeof theme = merge(theme, {
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
    mono: 'Menlo, monospace'
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
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
      600: '#5656EB',
      700: '#404099',
      800: '#2B2B66',
      900: '#20204D'
    },
    // gray: {
    //   50: '#F7F8FC',
    //   100: '#EDEEF7',
    //   200: '#E2E2F0',
    //   300: '#CBCDE0',
    //   400: '#A0A1C0',
    //   500: '#717196',
    //   600: '#4B4A68',
    //   700: '#2E2D48',
    //   750: '#252339',
    //   800: '#1C1A2C',
    //   900: '#1A1723'
    // },
    gray: {
      50: '#F7FAFC',
      100: '#EDF1F7',
      200: '#E2E7F0',
      300: '#CBD3E0',
      400: '#A0ABC0',
      500: '#717D96',
      600: '#4A5368',
      700: '#2D3548',
      750: '#232839',
      800: '#1A1E2C',
      900: '#171823'
    },
    pink: {
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
