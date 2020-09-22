import { Heading } from '@chakra-ui/core'

import Breadcrumb, { Crumbs } from '~/components/Breadcrumb'

import MainLayout from '~/layouts/Main'

const crumbs: Crumbs[] = [
  {
    title: 'home',
    route: '/'
  }
]

export default function Home() {
  return (
    <MainLayout title="Home">
      <Breadcrumb crumbs={crumbs} />
      <Heading>Home</Heading>
    </MainLayout>
  )
}
