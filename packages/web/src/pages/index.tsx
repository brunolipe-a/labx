import { AiOutlineArrowRight } from 'react-icons/ai'

import { Button, Heading, Stack } from '@chakra-ui/core'

import Head from 'next/head'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'

import ToggleThemeButton from '~/components/ToggleThemeButton'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Labx</title>
      </Head>
      <NextNProgress color="#6c6cFF" options={{ showSpinner: false }} />
      <Stack justify="center" align="center" h="100vh" spacing={6}>
        <Heading textAlign="center" alignItems="center">
          Bem-vindo ao Labx <ToggleThemeButton />
        </Heading>
        <Button
          size="lg"
          colorScheme="brand"
          rightIcon={<AiOutlineArrowRight />}
          onClick={() => router.push('/login')}
        >
          ENTRAR
        </Button>
      </Stack>
    </>
  )
}
