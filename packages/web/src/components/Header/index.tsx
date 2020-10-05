import { useRef } from 'react'

import {
  Flex,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  IconButton
} from '@chakra-ui/core'
import { HamburgerIcon } from '@chakra-ui/icons'

import logoLabx from '~/assets/images/labx-logo-light.png'

import SideNav from '../SideNav'
import LeftSideHeader from './LeftSideHeader'
import RightSideHeader from './RightSideHeader'

export default function Header() {
  const bgHeader = useColorModeValue('white', 'gray.800')
  const bgSideNav = useColorModeValue('gray.750', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.800')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const btnRef = useRef()

  return (
    <Flex
      gridArea="header"
      bg={bgHeader}
      px={5}
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderBottomColor={borderColor}
    >
      <IconButton
        ref={btnRef}
        display={{ base: 'block', md: 'none' }}
        onClick={onOpen}
        aria-label="Toggle SideMenu"
        icon={<HamburgerIcon boxSize={6} />}
        variant="ghost"
        colorScheme="gray"
      />
      <Image
        src={logoLabx}
        h={6}
        alt="Logo Labx"
        display={{ base: 'block', md: 'none' }}
      />
      <LeftSideHeader />
      <RightSideHeader />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay zIndex={2}>
          <DrawerContent bg={bgSideNav} pt={4}>
            <DrawerCloseButton color="gray.100" zIndex={100} />
            <SideNav isNav={false} />
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  )
}
