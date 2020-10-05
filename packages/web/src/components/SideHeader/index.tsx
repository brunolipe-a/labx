import { Flex, Image } from '@chakra-ui/core'

import logoLabx from '~/assets/images/labx-logo-dark.png'

export default function SideHeader() {
  return (
    <Flex
      display={{ base: 'none', md: 'flex' }}
      gridArea="sideheader"
      bg="gray.800"
      px={8}
      alignItems="center"
    >
      <Image src={logoLabx} h={6} alt="Logo Labx" />
    </Flex>
  )
}
