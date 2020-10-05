/* eslint-disable react/no-children-prop */
import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
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
  FormErrorMessage,
  FormControlProps,
  Text
} from '@chakra-ui/core'

import { useField } from '@unform/core'

type InputProps = FormControlProps & {
  label?: string
  name: string
  type: string
  placeholder: string
  icon: IconType
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled'
  isObligatory?: boolean
}

export default function Input({
  name,
  label,
  type,
  placeholder,
  variant = 'outline',
  icon,
  isObligatory,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [hidePass, setHide] = useState(true)
  const [isFocus, setFocus] = useState(false)
  const [isFilled, setFilled] = useState(false)
  const inputType = useMemo(() => {
    if (type === 'password') {
      return hidePass ? 'password' : 'text'
    }

    return type
  }, [type, hidePass])

  const {
    fieldName,
    registerField,
    error,
    defaultValue = '',
    clearError
  } = useField(name)

  const togglePass = useCallback(() => {
    setHide(state => !state)
  }, [])

  const handleFocus = useCallback(() => {
    setFocus(state => !state)
    clearError()
  }, [clearError])

  const handleBlur = useCallback(() => {
    setFocus(state => !state)

    setFilled(!!inputRef?.current.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [registerField, fieldName])

  return (
    <FormControl id={name} isInvalid={!!error} {...rest}>
      <FormLabel>
        {label}
        <Text as={'span'} color="red.500">
          {isObligatory && ' *'}
        </Text>
      </FormLabel>
      <InputGroup variant={variant}>
        <InputLeftElement
          children={
            <Icon
              as={icon}
              color={isFocus || isFilled ? 'brand.500' : 'gray.300'}
            />
          }
        />
        <ChakraInput
          ref={inputRef}
          defaultValue={defaultValue}
          type={inputType}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
                color={hidePass ? 'gray.300' : 'brand.500'}
              />
            }
          />
        )}
      </InputGroup>

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
