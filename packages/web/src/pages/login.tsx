import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'

import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/core'

import { useRouter } from 'next/router'

import BrandLogo from '~/assets/brand-icon-back.png'

import Checkbox from '~/components/Checkbox'
import Input from '~/components/Input'
import Link from '~/components/Link'

import AuthLayout from '~/layouts/Auth'

export default function Login() {
  const router = useRouter()

  return (
    <AuthLayout
      title="Sign In"
      reverse
      sideTitle="Meet pages - The simplest and fastest way to build web UI for your
    dashboard or app."
    >
      <Flex direction="column" alignItems="flex-start" mt={10}>
        <Image src={BrandLogo} mb={8} />
        <Heading fontWeight="medium" fontSize="3xl" lineHeight={1.25}>
          Começe hoje a
          <br />
          planejar suas sprints
        </Heading>
        <Text fontSize="sm" opacity={0.75} mb={5} mt={2}>
          Faça login na sua conta
        </Text>
        <Stack as="form" alignItems="stretch" w="full" spacing={3}>
          <Input
            name="username"
            placeholder="ex: @joaosilva ou joao@example.com"
            label="Usuário/E-mail"
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
          <Checkbox colorScheme="brand" spacing={2}>
            Manter conectado
          </Checkbox>
        </Stack>
        <Button
          onClick={() => router.push('/app')}
          borderRadius="sm"
          w="100%"
          colorScheme="brand"
          mt={4}
        >
          Entrar
        </Button>

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
