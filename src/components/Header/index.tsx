import {
  Button,
  Flex,
  useColorMode,
  Heading,
  useColorModeValue
} from '@chakra-ui/core'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function Header() {
  const { toggleColorMode, colorMode } = useColorMode()

  const bgHeader = useColorModeValue('white', 'gray.750')

  return (
    <Flex
      gridArea="header"
      bg={bgHeader}
      boxShadow="rgba(14, 14, 20, 0.25) 0px 1px 4px 2px"
      zIndex={2}
      px={8}
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading fontSize="3xl">labx</Heading>
      <Button colorScheme="brand" onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  )
}
