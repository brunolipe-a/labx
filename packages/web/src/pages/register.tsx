import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from 'react-icons/ai'

import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/core'

import { useRouter } from 'next/router'

import AuthImage from '~/assets/auth-image-register.png'
import BrandLogo from '~/assets/brand-icon-back.png'

import Input from '~/components/Input'
import Link from '~/components/Link'

import AuthLayout from '~/layouts/Auth'

export default function Login() {
  const router = useRouter()

  return (
    <AuthLayout title="Sign Up" image={AuthImage} sideTitle="Bem-vindo">
      <Flex direction="column" alignItems="flex-start" mt={10}>
        <Image src={BrandLogo} mb={8} />
        <Heading fontWeight="medium" fontSize="3xl" lineHeight={1.25}>
          Crie sua conta Labx
        </Heading>
        <Text fontSize="sm" opacity={0.75} mb={5}>
          Começe hoje a planejar
        </Text>
        <Stack as="form" alignItems="stretch" w="full" spacing={3}>
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
            placeholder="ex: @joaosilva"
            label="Nome de Usuário"
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
            name="confirm-password"
            placeholder="Confirmação"
            label="Confirme a senha"
            type="password"
            variant="flushed"
            icon={AiOutlineLock}
          />
        </Stack>
        <Button
          onClick={() => router.push('/app')}
          borderRadius="sm"
          w="100%"
          colorScheme="brand"
          mt={4}
        >
          Criar conta
        </Button>

        <Link href="/login" mt={8}>
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
