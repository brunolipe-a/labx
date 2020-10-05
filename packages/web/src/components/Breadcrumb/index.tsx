import {
  useColorModeValue,
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/core'
import { ChevronRightIcon } from '@chakra-ui/icons'

import NextLink from 'next/link'

export type Crumbs = {
  title: string
  route: string
}

type BreadcrumbProps = {
  crumbs: Crumbs[]
}

export default function Breadcrumb({ crumbs }: BreadcrumbProps) {
  const breadcrumbColor = useColorModeValue('brand.500', 'brand.300')

  const numberOfCrumbs = crumbs.length - 1

  return (
    <ChakraBreadcrumb
      mb={4}
      spacing={3}
      separator={<ChevronRightIcon color="gray.500" />}
    >
      {crumbs.map(({ title, route }, index) => (
        <BreadcrumbItem
          key={title}
          textDecor="none"
          transition="0.3s"
          fontSize="xs"
          _hover={{ color: breadcrumbColor }}
          isCurrentPage={index === numberOfCrumbs}
        >
          {index !== numberOfCrumbs ? (
            <BreadcrumbLink as={NextLink} href={route}>
              {title.toUpperCase()}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink color={breadcrumbColor}>
              {title.toUpperCase()}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  )
}
