import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  useColorModeValue
} from '@chakra-ui/core'

import NextLink from 'next/link'

export default function Link({
  children,
  href,
  colorScheme = 'brand',
  ...rest
}: ChakraLinkProps) {
  const linkColor = useColorModeValue(
    `${colorScheme}.500`,
    `${colorScheme}.300`
  )

  return (
    <NextLink passHref href={href}>
      <ChakraLink
        as="a"
        textDecor="none"
        transition="0.3s"
        fontSize="xs"
        _hover={{ color: linkColor }}
        {...rest}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
