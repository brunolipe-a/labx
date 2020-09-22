import React from 'react'

import {
  Box,
  Grid,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/core'

import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'

type AuthProps = WithChildren<{
  title: string
  reverse?: boolean
}>

export default function AuthLayout({
  children,
  title,
  reverse = false
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
        <Box
          display={{ base: 'none', md: 'block' }}
          gridArea="image"
          bg="brand.500"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgPos="bottom"
          backgroundImage="url(https://storage.googleapis.com/kepler-marketing/community_login_cover_c.jpg)"
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
              Meet pages - The simplest and fastest way to build web UI for your
              dashboard or app.
            </Heading>
            <Text as="span" fontSize="xs" fontWeight="regular" noOfLines={3}>
              Our beautifully-designed UI Framework come with hundreds of
              customizable features. Every Layout is just a starting point.
              ©2019-2020 All Rights Reserved. Pages® is a registered trademark
              of Revox Ltd.
            </Text>
          </Stack>
        </Box>
        <Stack
          gridArea="form"
          bg={bgContent}
          px={12}
          py={8}
          overflowY="hidden"
          _hover={{ overflow: 'overlay' }}
        >
          <NextNprogress color="#6c6cFF" options={{ showSpinner: false }} />
          {children}
        </Stack>
      </Grid>
    </>
  )
}
