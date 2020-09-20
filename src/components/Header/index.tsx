import { useRef } from 'react'

import {
  Button,
  Flex,
  useColorMode,
  Heading,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/core'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'

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
      boxShadow="rgba(14, 14, 20, 0.25) 0px 1px 4px 2px"
      zIndex={1}
      px={8}
      alignItems="center"
      justifyContent="space-between"
    >
      <HamburgerIcon
        display={{ base: 'block', lg: 'none' }}
        onClick={onOpen}
        ref={btnRef}
        fontSize="2xl"
        cursor="pointer"
      />
      <Heading fontSize="3xl">labx</Heading>
      <Button colorScheme="brand" onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay zIndex={2}>
          <DrawerContent bg="gray.700" pt={4}>
            <DrawerCloseButton color="gray.100" />
            <SideNav isNav={false} />
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  )
}
