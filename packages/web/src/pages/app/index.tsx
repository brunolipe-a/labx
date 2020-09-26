import { Heading } from '@chakra-ui/core'

import { Crumbs } from '~/components/Breadcrumb'

import MainLayout from '~/layouts/Main'

const crumbs: Crumbs[] = [
  {
    title: 'home',
    route: '/'
  }
]

export default function Home() {
  return (
    <MainLayout title="Home" breadcrumbs={crumbs}>
      <Heading>Home</Heading>
    </MainLayout>
  )
}
