import { useColorMode } from '@chakra-ui/core'
import { MoonIcon, SunIcon, IconProps } from '@chakra-ui/icons'

type ColorIconProps = IconProps

export default function ColorIcon(props: ColorIconProps) {
  const { colorMode } = useColorMode()

  return colorMode === 'light' ? (
    <MoonIcon boxSize={4} {...props} />
  ) : (
    <SunIcon boxSize={4} {...props} />
  )
}
