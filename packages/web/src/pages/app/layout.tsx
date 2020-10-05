import { Heading } from '@chakra-ui/core'

import Breadcrumb, { Crumbs } from '~/components/Breadcrumb'

import MainLayout from '~/layouts/Main'

const crumbs: Crumbs[] = [
  {
    title: 'home',
    route: '/app'
  },
  {
    title: 'layout',
    route: '#'
  }
]

export default function Layout() {
  return (
    <MainLayout title="Layout">
      <Breadcrumb crumbs={crumbs} />
      <Heading>Layout</Heading>
    </MainLayout>
  )
}
