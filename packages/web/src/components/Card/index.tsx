import { Box, Flex, useColorModeValue, FlexProps } from '@chakra-ui/core'

type CardProps = FlexProps &
  WithChildren<{
    colorScheme?: string
    borderSize?: number
  }>

export default function Card({
  colorScheme,
  borderSize = 2,
  children,
  ...rest
}: CardProps) {
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Flex bg={bg} boxShadow="md" borderRadius="md" direction="column" {...rest}>
      {colorScheme && (
        <Box
          bg={`gradient.${colorScheme}`}
          h={borderSize}
          w="100%"
          borderTopRadius="md"
        />
      )}
      {children}
    </Flex>
  )
}
