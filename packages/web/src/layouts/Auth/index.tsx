import React from 'react'

import { Flex, Grid, Heading, Stack, useColorModeValue } from '@chakra-ui/core'

import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'

import AuthImage from '~/assets/auth-image.png'

import Link from '~/components/Link'

type AuthProps = WithChildren<{
  title: string
  reverse?: boolean
  image?: string
  sideTitle: string | React.ReactNode
}>

export default function AuthLayout({
  children,
  title,
  sideTitle,
  reverse = false,
  image = AuthImage
}: AuthProps) {
  const bgContent = useColorModeValue('white', 'gray.800')

  return (
    <>
      <Head>
        <title>Labx - {title}</title>
      </Head>
      <Grid
        as="main"
        height="100vh"
        templateColumns={{
          base: '1fr',
          md: !reverse ? '1fr 496px' : '496px 1fr'
        }}
        templateRows="1fr"
        flexDirection="revert"
        templateAreas={{
          base: "'form'",
          md: !reverse ? "'image form'" : "'form image'"
        }}
      >
        <Flex
          display={{ base: 'none', md: 'flex' }}
          gridArea="image"
          bg="brand.500"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgPos="center"
          backgroundImage={`url(${image})`}
        >
          <Stack
            maxW="34rem"
            h="full"
            justifyContent="flex-end"
            p={6}
            color="gray.50"
          >
            <Heading
              as="h1"
              fontSize={{ base: '3xl', lg: '5xl' }}
              fontWeight="medium"
              lineHeight={1.1}
            >
              {sideTitle}
            </Heading>

            <Link
              href="https://dribbble.com/Unini"
              target="_blank"
              rel="noopener noreferrer"
              fontSize="sm"
              colorScheme="brand"
            >
              illustration by Unini
            </Link>
          </Stack>
        </Flex>
        <Stack
          gridArea="form"
          bg={bgContent}
          px={12}
          py={8}
          overflow="overlay"
          boxShadow="rgba(14,14,20,0.1) -5px 1px 8px 3px"
          zIndex={1}
        >
          <NextNprogress color="#6c6cFF" options={{ showSpinner: false }} />
          {children}
        </Stack>
      </Grid>
    </>
  )
}
