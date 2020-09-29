import React from 'react'

import { Grid } from '@chakra-ui/core'

import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'

import { Crumbs } from '~/components/Breadcrumb'
import Content from '~/components/Content'
import Header from '~/components/Header'
import SideHeader from '~/components/SideHeader'
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
          md: "'sideheader header''sidebar content'"
        }}
      >
        <NextNprogress color="#6c6cFF" options={{ showSpinner: false }} />
        <SideHeader />
        <Header />
        <SideNav />
        <Content breadcrumbs={breadcrumbs}>{children}</Content>
      </Grid>
    </>
  )
}
