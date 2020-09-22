import { useRef } from 'react'

import {
  Flex,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  IconButton
} from '@chakra-ui/core'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'

import logoDark from '~/assets/images/labx-logo-dark.png'
import logoLight from '~/assets/images/labx-logo-light.png'

import SideNav from '../SideNav'

export default function Header() {
  const { toggleColorMode, colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const btnRef = useRef()

  const bgHeader = useColorModeValue('white', 'gray.750')

  return (
    <Flex
      gridArea="header"
      bg={bgHeader}
      boxShadow="rgba(14, 14, 20, 0.1) 0px 1px 4px 2px"
      zIndex={1}
      px={8}
      alignItems="center"
      justifyContent="space-between"
    >
      <HamburgerIcon
        display={{ base: 'block', md: 'none' }}
        onClick={onOpen}
        ref={btnRef}
        fontSize="2xl"
        cursor="pointer"
      />
      <Image
        src={colorMode === 'dark' ? logoDark : logoLight}
        h={6}
        alt="Logo Labx"
      />
      <IconButton
        colorScheme="gray"
        variant="link"
        onClick={toggleColorMode}
        aria-label="Toggle theme"
        boxSize={8}
        icon={
          colorMode === 'light' ? (
            <MoonIcon boxSize={5} />
          ) : (
            <SunIcon boxSize={5} />
          )
        }
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay zIndex={2}>
          <DrawerContent bg="gray.700" pt={4}>
            <DrawerCloseButton color="gray.100" size="sm" />
            <SideNav isNav={false} />
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  )
}
