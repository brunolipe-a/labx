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
  MenuDivider
} from '@chakra-ui/core'
import { Icon } from '@chakra-ui/icons'

import ToggleThemeButton from '../ToggleThemeButton'

export default function LeftSideHeader() {
  const bgAvatar = useColorModeValue('brand.500', 'brand.300')
  const menuColor = useColorModeValue('gray.700', 'gray.300')

  return (
    <HStack spacing={4}>
      <Menu closeOnSelect={false}>
        <MenuButton as={Avatar} size="sm" bg={bgAvatar} />
        <MenuTransition>
          {styles => (
            <MenuList sx={styles} color={menuColor}>
              <MenuGroup title="Preferências">
                <ToggleThemeButton isMenuList />
              </MenuGroup>
              <MenuDivider />
              <MenuItem>
                <Icon as={CgLogOut} boxSize={4} mr={4} />
                <span>Logout</span>
              </MenuItem>
            </MenuList>
          )}
        </MenuTransition>
      </Menu>
    </HStack>
  )
}
