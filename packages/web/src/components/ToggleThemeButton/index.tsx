import { IconButton, MenuItem, useColorMode } from '@chakra-ui/core'

import ColorIcon from './ColorIcon'

type ToggleThemeButtonProps = {
  isMenuList?: boolean
}

export default function ToggleThemeButton({
  isMenuList = false
}: ToggleThemeButtonProps) {
  const { toggleColorMode, colorMode } = useColorMode()

  if (isMenuList) {
    return (
      <MenuItem onClick={toggleColorMode}>
        <ColorIcon mr={4} />
        <span>{`Tema ${colorMode === 'light' ? 'Escuro' : 'Claro'}`}</span>
      </MenuItem>
    )
  }

  return (
    <IconButton
      colorScheme="gray"
      variant="link"
      onClick={toggleColorMode}
      aria-label="Toggle theme"
      boxSize={8}
      icon={<ColorIcon />}
    />
  )
}
