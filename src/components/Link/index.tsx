import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  useColorModeValue
} from '@chakra-ui/core'

import NextLink from 'next/link'

export default function Link({ children, href, ...rest }: ChakraLinkProps) {
  const linkColor = useColorModeValue('brand.500', 'brand.300')

  return (
    <ChakraLink
      as="div"
      textDecor="none"
      transition="0.3s"
      fontSize="xs"
      _hover={{ color: linkColor }}
      {...rest}
    >
      <NextLink href={href}>{children}</NextLink>
    </ChakraLink>
  )
}
