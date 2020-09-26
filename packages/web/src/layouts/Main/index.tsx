import React from 'react'

import { Grid, Stack, useColorModeValue } from '@chakra-ui/core'

import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'

import Breadcrumb, { Crumbs } from '~/components/Breadcrumb'
import Header from '~/components/Header'
import SideNav from '~/components/SideNav'

type MainProps = WithChildren<{
  title: string
  breadcrumbs?: Crumbs[]
}>

export default function MainLayout({
  children,
  title,
  breadcrumbs
}: MainProps) {
  const bgContent = useColorModeValue('gray.100', 'gray.800')

  return (
    <>
      <Head>
        <title>Labx - {title}</title>
      </Head>
      <Grid
        as="main"
        height="100vh"
        templateColumns={{ base: '1fr', md: '250px 1fr' }}
        templateRows="60px 1fr"
        templateAreas={{
          base: "'header''content'",
          md: "'header header''sidebar content'"
        }}
      >
        <Header />
        <SideNav />
        <Stack gridArea="content" bg={bgContent} px={8} overflow="overlay">
          <NextNprogress color="#6c6cFF" options={{ showSpinner: false }} />
          {breadcrumbs && <Breadcrumb crumbs={breadcrumbs} />}
          {children}
        </Stack>
      </Grid>
    </>
  )
}
