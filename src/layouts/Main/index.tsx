import React from 'react'

import { Grid, Stack, useColorModeValue } from '@chakra-ui/core'

import Head from 'next/head'

import Header from '~/components/Header'
import SideNav from '~/components/SideNav'

type MainProps = WithChildren<{
  title: string
}>

export default function MainLayout({ children, title }: MainProps) {
  const bgContent = useColorModeValue('gray.100', 'gray.800')

  return (
    <>
      <Head>
        <title>Labx - {title}</title>
      </Head>
      <Grid
        as="main"
        height="100vh"
        templateColumns="250px 1fr"
        templateRows="60px 1fr"
        templateAreas="
        'header header'
        'sidebar content'
      "
      >
        <Header />
        <SideNav />
        <Stack
          gridArea="content"
          bg={bgContent}
          px={8}
          overflowY="hidden"
          _hover={{ overflow: 'overlay' }}
        >
          {children}
        </Stack>
      </Grid>
    </>
  )
}
