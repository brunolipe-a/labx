/* eslint-disable react/no-children-prop */
import { useCallback, useMemo, useState } from 'react'
import { IconType } from 'react-icons'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

import {
  FormControl,
  FormLabel,
  InputGroup,
  Input as ChakraInput,
  InputLeftElement,
  InputRightElement,
  Icon,
  FormErrorMessage
} from '@chakra-ui/core'

type InputProps = {
  label?: string
  name: string
  type: string
  placeholder: string
  icon: IconType
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled'
}

export default function Input({
  name,
  label,
  type,
  placeholder,
  variant = 'outline',
  icon
}: InputProps) {
  const [hidePass, setHide] = useState(true)
  const inputType = useMemo(() => {
    if (type === 'password') {
      return hidePass ? 'password' : 'text'
    }

    return type
  }, [type, hidePass])

  const togglePass = useCallback(() => {
    setHide(state => !state)
  }, [])

  return (
    <FormControl id={name}>
      <FormLabel>{label}</FormLabel>
      <InputGroup variant={variant}>
        <InputLeftElement children={<Icon as={icon} color="gray.300" />} />
        <ChakraInput
          type={inputType}
          placeholder={placeholder}
          focusBorderColor="brand.500"
        />
        {type === 'password' && (
          <InputRightElement
            children={
              <Icon
                as={hidePass ? AiOutlineEye : AiOutlineEyeInvisible}
                boxSize={5}
                onClick={togglePass}
                cursor="pointer"
                color="gray.300"
              />
            }
          />
        )}
      </InputGroup>

      <FormErrorMessage>{'Error'}</FormErrorMessage>
    </FormControl>
  )
}
