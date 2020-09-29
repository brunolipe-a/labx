import { useEffect, useRef } from 'react'

import {
  HStack,
  Checkbox as ChakraCheckbox,
  Text,
  StackProps
} from '@chakra-ui/core'

import { useField } from '@unform/core'

interface CheckboxProps extends StackProps {
  name: string
  colorScheme: string
}

export default function Checkbox({
  name,
  children,
  colorScheme,
  ...rest
}: CheckboxProps) {
  const checkboxRef = useRef(null)
  const { fieldName, registerField, defaultValue = true } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkboxRef.current,
      path: 'checked'
    })
  }, [fieldName, registerField])

  return (
    <HStack {...rest}>
      <ChakraCheckbox
        ref={checkboxRef}
        defaultIsChecked={defaultValue}
        colorScheme={colorScheme}
      />
      <Text opacity={0.7}>{children}</Text>
    </HStack>
  )
}
