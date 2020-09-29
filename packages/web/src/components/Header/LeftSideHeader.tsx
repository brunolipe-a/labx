import { useCallback } from 'react'
import { CgLogOut } from 'react-icons/cg'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuTransition,
  MenuItem,
  HStack,
  Avatar,
  useColorModeValue,
  MenuGroup,
  MenuDivider,
  AvatarBadge
} from '@chakra-ui/core'
import { Icon } from '@chakra-ui/icons'

import { useAuth } from '~/context/auth'

import ToggleThemeButton from '../ToggleThemeButton'

export default function LeftSideHeader() {
  const { signOut } = useAuth()
  const menuColor = useColorModeValue('gray.700', 'gray.300')

  const handleSignOut = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <HStack spacing={4}>
      <Menu closeOnSelect={false}>
        <Avatar as={MenuButton} size="sm" name="">
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <MenuTransition>
          {styles => {
            return (
              <MenuList sx={styles} color={menuColor}>
                <MenuGroup title="Preferências">
                  <ToggleThemeButton isMenuList />
                </MenuGroup>
                <MenuDivider />
                <MenuItem onClick={handleSignOut}>
                  <Icon as={CgLogOut} boxSize={4} mr={4} />
                  <span>Logout</span>
                </MenuItem>
              </MenuList>
            )
          }}
        </MenuTransition>
      </Menu>
    </HStack>
  )
}
