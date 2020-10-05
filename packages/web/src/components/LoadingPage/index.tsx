import { Fade, Flex, Spinner, useColorModeValue } from '@chakra-ui/core'

type LoadingPageProps = {
  inFade: boolean
  timeout?: number
}

export default function LoadingPage({
  inFade,
  timeout = 500
}: LoadingPageProps) {
  const color = useColorModeValue('brand.500', 'brand.300')
  const bg = useColorModeValue('gray.100', 'gray.900')
  const emptyColor = useColorModeValue('gray.300', 'gray.600')

  return (
    <Fade in={inFade} timeout={timeout}>
      {styles => (
        <Flex
          w="100%"
          h="100vh"
          justify="center"
          align="center"
          background={bg}
          style={styles}
          position="absolute"
          zIndex={10000}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor={emptyColor}
            color={color}
            size="xl"
          />
        </Flex>
      )}
    </Fade>
  )
}
