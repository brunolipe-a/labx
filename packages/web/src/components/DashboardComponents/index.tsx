import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Link
} from '@chakra-ui/core'

import Card from '../Card'

import { dashboard as dashboardData, DashboardCardProps } from './data'

function DashboardCard({
  colorScheme,
  number,
  title,
  description,
  buttonText,
  linkText
}: DashboardCardProps) {
  const image = useColorModeValue('gray.200', 'gray.700')

  return (
    <Card colorScheme={colorScheme}>
      <Stack p={4} spacing={4} flex="1">
        <Flex align="center" justify="space-between">
          <Flex
            bg={`gradient.${colorScheme}`}
            borderRadius="full"
            boxSize={8}
            align="center"
            justify="center"
            color="white"
            fontWeight="bold"
          >
            {number}
          </Flex>
          <CloseButton />
        </Flex>
        <Box w="100%" h={150} bg={image} />
        <Flex direction="column">
          <Heading as="h4" fontSize="lg" opacity="0.9" fontWeight="semibold">
            {title}
          </Heading>
          <Text noOfLines={3} opacity="0.8" fontWeight="medium" mt={3}>
            {description}
          </Text>
          <Flex align="center" justify="space-between" mt={8}>
            <Button variant="outline" colorScheme="brand" size="sm" w={150}>
              {buttonText}
            </Button>
            <Link opacity="0.6" fontSize="sm" fontWeight="medium">
              {linkText}
            </Link>
          </Flex>
        </Flex>
      </Stack>
    </Card>
  )
}

export { DashboardCard, dashboardData }
