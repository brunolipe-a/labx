import { useMemo } from 'react'

import { Stack, useColorMode, useColorModeValue } from '@chakra-ui/core'

import Breadcrumb, { Crumbs } from '../Breadcrumb'

type ContentProps = WithChildren<{
  breadcrumbs?: Crumbs[]
}>

export default function Content({ children, breadcrumbs }: ContentProps) {
  const bgContent = useColorModeValue('gray.100', 'gray.900')

  const { colorMode } = useColorMode()

  const borderSize = useMemo(() => (colorMode === 'light' ? 0 : 16), [
    colorMode
  ])

  return (
    <Stack
      gridArea="content"
      bg={bgContent}
      px={8}
      overflow="overlay"
      borderTopRightRadius={{ base: borderSize, md: 0 }}
      borderBottomLeftRadius={{ base: 0, md: borderSize }}
      borderTopLeftRadius={borderSize}
    >
      {breadcrumbs && <Breadcrumb crumbs={breadcrumbs} />}
      {children}
    </Stack>
  )
}
