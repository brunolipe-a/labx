import {
  Heading,
  Stack,
  Text,
  Link,
  Grid,
  Divider,
  Box,
  useColorModeValue,
  Button
} from '@chakra-ui/core'

import { DashboardCard, dashboardData } from '~/components/DashboardComponents'

import MainLayout from '~/layouts/Main'

export default function Home() {
  const image = useColorModeValue('gray.200', 'gray.700')
  const heading = useColorModeValue('brand.600', 'brand.500')

  return (
    <MainLayout title="Home">
      <Stack spacing={4}>
        <Stack
          bg="gradient.brand600"
          color="text.light"
          px={6}
          py={8}
          borderRadius="sm"
        >
          <Text
            fontSize="md"
            mt={8}
            fontWeight="bold"
            color="rgba(255,255,255,0.5)"
          >
            LABX
          </Text>
          <Heading as="h2" fontSize="2xl">
            Bem-vindo, Bruno!
          </Heading>
        </Stack>
        <Grid
          templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gridGap={4}
        >
          <Stack py={20} spacing={4}>
            <Heading as="h3" fontSize="2xl" color="brand.600">
              How Labx works?
            </Heading>
            <Text maxW={350} fontWeight="medium">
              {
                "Labx is intentionally built to grow with you and your team. Here's aglance at what you can achieve in Tara."
              }
            </Text>
            <Link opacity="0.6" fontSize="sm" fontWeight="medium">
              Skip explanation
            </Link>
          </Stack>

          {dashboardData.cards.map(
            ({
              colorScheme,
              description,
              number,
              title,
              buttonText,
              linkText
            }) => (
              <DashboardCard
                key={number}
                number={number}
                title={title}
                colorScheme={colorScheme}
                description={description}
                buttonText={buttonText}
                linkText={linkText}
              />
            )
          )}
        </Grid>
        <Divider />
        <Heading as="h4" textAlign="center" fontSize="xl" color={heading}>
          Começe com Labx
        </Heading>
        <Grid
          templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gridGap={4}
        >
          {dashboardData.imports.map(
            ({ buttonBg, buttonText, description, linkText, title }, index) => (
              <Stack
                px={8}
                py={3}
                key={index}
                align="center"
                justify="center"
                spacing={4}
                textAlign="center"
              >
                <Box w="50%" h={150} bg={image} />
                <Heading as="h6" fontSize="md">
                  {title}
                </Heading>
                <Text
                  noOfLines={2}
                  opacity="0.8"
                  fontWeight="medium"
                  mt={3}
                  maxW={500}
                >
                  {description}
                </Text>
                <Button colorScheme={buttonBg} size="lg" borderRadius="sm">
                  {buttonText}
                </Button>
                <Link opacity="0.6" fontSize="sm" fontWeight="medium">
                  {linkText}
                </Link>
              </Stack>
            )
          )}
        </Grid>
        {/* <Divider />
        <Card colorScheme="purple" borderSize={1} h={300} align="center">
          OPA
        </Card> */}
      </Stack>
    </MainLayout>
  )
}
