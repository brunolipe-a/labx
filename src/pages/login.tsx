import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'

import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Checkbox
} from '@chakra-ui/core'

import { useRouter } from 'next/router'

import brandLogo from '~/assets/brand-icon.png'

// import Checkbox from '~/components/Checkbox'
import Input from '~/components/Input'
import Link from '~/components/Link'

import AuthLayout from '~/layouts/Auth'

export default function Login() {
  const router = useRouter()

  return (
    <AuthLayout title="Sign In">
      <Flex direction="column" alignItems="flex-start" mt={10}>
        <Image src={brandLogo} mb={8} />
        <Heading fontWeight="medium" fontSize="3xl" lineHeight={1.25}>
          Get Started
          <br />
          with your Dashboard
        </Heading>
        <Text fontSize="sm" opacity={0.75} mb={5}>
          Sign in to your account
        </Text>
        <Stack as="form" alignItems="stretch" w="full" spacing={3}>
          <Input
            name="email"
            placeholder="E-mail"
            label="Usuário/Email"
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
          <HStack spacing={2}>
            <Checkbox defaultIsChecked colorScheme="brand" />
            <Text fontSize="sm" opacity={0.7}>
              Remember me
            </Text>
          </HStack>
          {/* <Checkbox colorScheme="brand" spacing={2}>
            Remember me
          </Checkbox> */}
        </Stack>
        <Button
          onClick={() => router.push('/')}
          borderRadius="sm"
          size="sm"
          colorScheme="brand"
          alignSelf="flex-end"
          mt={2}
        >
          Sign in
        </Button>

        <Link href="/reset-password" mt={8}>
          Lost your password?
        </Link>
        <Link href="/register" mt={2}>
          Not a member yet? Signup now.
        </Link>
      </Flex>
      <Text mt="auto !important" fontSize="xs" opacity={0.5}>
        ©2019-2020 All Rights Reserved. Pages® is a registered trademark of
        Revox Ltd. Cookie Policy, Privacy and Terms.
      </Text>
    </AuthLayout>
  )
}
