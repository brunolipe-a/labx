import {
  HStack,
  Checkbox as ChakraCheckbox,
  Text,
  StackProps
} from '@chakra-ui/core'

interface CheckboxProps extends StackProps {
  colorScheme: string
}

export default function Checkbox({
  children,
  colorScheme,
  ...rest
}: CheckboxProps) {
  return (
    <HStack {...rest}>
      <ChakraCheckbox defaultIsChecked colorScheme={colorScheme} />
      <Text opacity={0.7}>{children}</Text>
    </HStack>
  )
}
