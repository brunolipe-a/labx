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

export default function Header() {
  const bgHeader = useColorModeValue('white', 'gray.750')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const btnRef = useRef()

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
      <IconButton
        ref={btnRef}
        display={{ base: 'block', md: 'none' }}
        onClick={onOpen}
        aria-label="Toggle SideMenu"
        icon={<HamburgerIcon boxSize={6} />}
        variant="ghost"
        colorScheme="gray"
      />
      <Image src={logoLabx} h={6} alt="Logo Labx" />
      <LeftSideHeader />
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
