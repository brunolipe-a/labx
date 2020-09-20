import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  Flex,
  Stack
} from '@chakra-ui/core'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { sidebar } from './sidebar-content'

export default function SideNav({ isNav = true }) {
  const router = useRouter()

  return (
    <Stack
      display={{ xs: isNav ? 'none' : 'flex', lg: 'flex' }}
      gridArea="sidebar"
      justifyContent="space-between"
      alignItems="stretch"
      backgroundColor="gray.700"
      overflowY="hidden"
      _hover={{ overflow: 'overlay' }}
    >
      <Accordion allowToggle py={6}>
        {sidebar.map(({ toRouter, title, subtitle, links, icon }, index) => (
          <AccordionItem key={title + index} border={0} color="gray.200">
            <AccordionButton
              px={8}
              h="50px"
              onClick={() => toRouter && router.push(toRouter)}
              transition="0.3s"
              _hover={{ color: 'white' }}
              _expanded={{ color: 'white' }}
            >
              <Flex flex="1" alignItems="center" justifyContent="space-between">
                <Stack flex="1" spacing={0} textAlign="left">
                  <Text fontSize="md" fontWeight="normal">
                    {title}
                  </Text>
                  {subtitle && (
                    <Text fontSize="xs" fontWeight="medium" opacity={0.5}>
                      {subtitle}
                    </Text>
                  )}
                </Stack>
                {links && <AccordionIcon />}
                {icon}
              </Flex>
            </AccordionButton>
            {links && (
              <AccordionPanel
                py={5}
                pl={10}
                pr={8}
                color="gray.300"
                bg="gray.800"
              >
                <Stack spacing={4}>
                  {links.map(({ title, icon, toRouter }, index) => (
                    <NextLink href={toRouter} key={title + index}>
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        transition="0.3s"
                        _hover={{ color: 'white' }}
                        cursor="pointer"
                        fontWeight="medium"
                        fontSize="sm"
                      >
                        {title}
                        {icon}
                      </Flex>
                    </NextLink>
                  ))}
                </Stack>
              </AccordionPanel>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Stack>
  )
}
