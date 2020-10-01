import { useCallback, useRef, useState } from 'react'
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import { FiHash } from 'react-icons/fi'

import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/core'

import { useRouter } from 'next/router'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import AuthImage from '~/assets/auth-image-register.png'
import BrandLogo from '~/assets/brand-icon-back.png'

import Input from '~/components/Input'
import Link from '~/components/Link'

import { CreateFormData, useAuth } from '~/context/auth'
import AuthLayout from '~/layouts/Auth'
import { setFormErrors, validateErrors } from '~/utils/validateFrom'

const shape = Yup.object().shape<CreateFormData>({
  email: Yup.string().required('Campo obrigatório'),
  name: Yup.string().required('Campo obrigatório'),
  username: Yup.string().required('Campo obrigatório'),
  password: Yup.string().min(6, 'Senha deve ter no mínimo seis caracteres'),
  password_confirmation: Yup.string()
    .min(6, 'Confirmação deve ter no mínimo seis caracteres')
    .oneOf([Yup.ref('password'), null], 'Senhas não conferem')
})

export default function Login() {
  const router = useRouter()
  const { createUser } = useAuth()

  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data: CreateFormData) => {
      console.log(data)
      setLoading(true)

      const isValid = await validateErrors({ formRef, data, shape })

      if (!isValid) {
        setLoading(false)
        return
      }

      const { isSuccess, errors } = await createUser(data)

      if (isSuccess) {
        router.push('/login')
      } else {
        setLoading(false)
        setFormErrors({ errors, formRef })
      }
    },
    [router, createUser]
  )

  return (
    <AuthLayout title="Sign Up" image={AuthImage} sideTitle="Bem-vindo">
      <Flex direction="column" mt={10}>
        <Image src={BrandLogo} mb={8} alignSelf="flex-start" />
        <Heading fontWeight="medium" fontSize="3xl" lineHeight={1.25}>
          Crie sua conta Labx
        </Heading>
        <Text fontSize="sm" opacity={0.75} mb={5}>
          Começe hoje a planejar
        </Text>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Stack spacing={4}>
            <Input
              name="email"
              placeholder="E-mail"
              label="Email"
              type="text"
              variant="flushed"
              icon={AiOutlineMail}
            />
            <Input
              name="username"
              placeholder="ex: joaosilva"
              label="Usuário"
              type="text"
              variant="flushed"
              icon={FiHash}
            />
            <Input
              name="name"
              placeholder="ex: João Silva"
              label="Nome"
              type="text"
              variant="flushed"
              icon={AiOutlineUser}
            />
            <Input
              name="password"
              placeholder="Senha"
              label="Senha"
              type="password"
              variant="flushed"
              icon={AiOutlineLock}
            />
            <Input
              name="password_confirmation"
              placeholder="Confirmação"
              label="Confirme a senha"
              type="password"
              variant="flushed"
              icon={AiOutlineLock}
            />
            <Button
              borderRadius="sm"
              colorScheme="brand"
              type="submit"
              isLoading={loading}
            >
              Criar conta
            </Button>
          </Stack>
        </Form>

        <Link href="/login" mt={8} mb={4}>
          Já tem conta? Faça login.
        </Link>
      </Flex>
      <Text mt="auto !important" fontSize="xs" opacity={0.5}>
        ©2019-2020 All Rights Reserved. Pages® is a registered trademark of
        Revox Ltd. Cookie Policy, Privacy and Terms.
      </Text>
    </AuthLayout>
  )
}
