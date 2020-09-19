import React from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Text,
  Flex,
  Grid,
  Stack,
  useColorMode,
  Heading,
  Link,
  useColorModeValue
} from '@chakra-ui/core'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Head from 'next/head'

type MainProps = WithChildren<{
  title: string
}>

export default function MainLayout({ children, title }: MainProps) {
  const { toggleColorMode, colorMode } = useColorMode()

  const bgHeader = useColorModeValue('white', 'gray.750')
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
        <Flex
          gridArea="header"
          bg={bgHeader}
          boxShadow="rgba(14, 14, 20, 0.2) 0px 1px 4px 2px"
          zIndex={2}
          px={8}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading fontSize="3xl">labx</Heading>
          <Button colorScheme="brand" onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>

        <Stack
          gridArea="sidebar"
          justifyContent="space-between"
          alignItems="stretch"
          backgroundColor="gray.700"
        >
          <Accordion allowToggle>
            <AccordionItem border={0}>
              <AccordionButton
                onClick={() => console.log('teste')}
                color="gray.200"
                _hover={{ color: 'white' }}
              >
                <Stack flex="1" p={1} spacing={1} textAlign="left">
                  <Text fontSize="md" fontWeight="600">
                    Dashboard
                  </Text>
                  <Text fontSize="sm" fontWeight="500" opacity={0.5}>
                    12 atualizações
                  </Text>
                </Stack>
              </AccordionButton>
            </AccordionItem>

            <AccordionItem border={0} color="gray.200">
              <AccordionButton
                _hover={{ color: 'white' }}
                _expanded={{ color: 'white' }}
              >
                <Stack flex="1" p={1} spacing={1} textAlign="left">
                  <Text fontSize="md" fontWeight="600">
                    Extra
                  </Text>
                </Stack>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} color="gray.200" bg="gray.800">
                <Stack>
                  <Link>asdasdas</Link>
                  <Link>asdasdas</Link>
                  <Link>asdasdas</Link>
                  <Link>asdasdas</Link>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>

        <Flex gridArea="content" bg={bgContent} px={4} py={2}>
          {children}
        </Flex>
      </Grid>
    </>
  )
}
