import { useCallback, useRef, useState } from 'react'
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'

import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/core'

import { useRouter } from 'next/router'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import BrandLogo from '~/assets/brand-icon-back.png'

import Checkbox from '~/components/Checkbox'
import Input from '~/components/Input'
import Link from '~/components/Link'

import { SignInFormData, useAuth } from '~/context/auth'
import AuthLayout from '~/layouts/Auth'
import { setFormErrors, validateErrors } from '~/utils/validateFrom'

const shape = Yup.object().shape<SignInFormData>({
  username: Yup.string().required('Campo obrigatório'),
  password: Yup.string().min(6, 'Senha deve ter no mínimo seis caracteres'),
  keep: Yup.bool()
})

export default function Login() {
  const router = useRouter()
  const { signIn } = useAuth()

  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setLoading(true)

      const isValid = await validateErrors({ formRef, data, shape })

      if (!isValid) {
        setLoading(false)
        return
      }

      const { isSuccess, errors } = await signIn(data)

      if (isSuccess) {
        router.push('/app')
      } else {
        setLoading(false)
        setFormErrors({ errors, formRef })
      }
    },
    [router, signIn]
  )

  return (
    <AuthLayout
      title="Sign In"
      reverse
      sideTitle="Meet pages - The simplest and fastest way to build web UI for your
    dashboard or app."
    >
      <Flex direction="column" mt={10}>
        <Image src={BrandLogo} mb={8} alignSelf="flex-start" />
        <Heading fontWeight="medium" fontSize="3xl" lineHeight={1.25}>
          Começe hoje a
          <br />
          planejar suas sprints
        </Heading>
        <Text fontSize="sm" opacity={0.75} mb={5} mt={2}>
          Faça login na sua conta
        </Text>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Stack alignItems="stretch" w="full" spacing={4}>
            <Input
              name="username"
              placeholder="ex: @joaosilva ou joao@example.com"
              label="Usuário/E-mail"
              type="text"
              variant="flushed"
              isObligatory
              icon={AiOutlineUser}
            />
            <Input
              name="password"
              placeholder="Senha"
              label="Senha"
              type="password"
              variant="flushed"
              isObligatory
              icon={AiOutlineLock}
            />
            <Checkbox colorScheme="brand" spacing={2} name="keep">
              Manter conectado
            </Checkbox>
            <Button
              type="submit"
              borderRadius="sm"
              colorScheme="brand"
              isLoading={loading}
            >
              Entrar
            </Button>
          </Stack>
        </Form>

        <Link href="/reset-password" mt={8}>
          Esqueceu sua senha?
        </Link>
        <Link href="/register" mt={2}>
          Não conta ainda? Registre-se.
        </Link>
      </Flex>
      <Text mt="auto !important" fontSize="xs" opacity={0.5}>
        ©2019-2020 All Rights Reserved. Pages® is a registered trademark of
        Revox Ltd. Cookie Policy, Privacy and Terms.
      </Text>
    </AuthLayout>
  )
}
