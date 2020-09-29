import { AiOutlineLink } from 'react-icons/ai'
import { BiWorld } from 'react-icons/bi'
import { HiViewGrid } from 'react-icons/hi'

import { HStack, IconButton, Divider, useColorModeValue } from '@chakra-ui/core'

export default function RightSideHeader() {
  const dividerColor = useColorModeValue('gray.300', 'gray.600')

  return (
    <HStack spacing={2} display={{ base: 'none', md: 'flex' }} h={8}>
      <IconButton
        aria-label="Notifications"
        size="sm"
        variant="ghost"
        borderRadius="50%"
        colorScheme="gray"
        icon={<BiWorld size={20} />}
      />
      <IconButton
        aria-label="Link"
        size="sm"
        variant="ghost"
        borderRadius="50%"
        icon={<AiOutlineLink size={18} />}
      />
      <IconButton
        aria-label="Random"
        size="sm"
        variant="ghost"
        borderRadius="50%"
        icon={<HiViewGrid size={18} />}
      />
      <Divider orientation="vertical" h="75%" borderLeftColor={dividerColor} />
    </HStack>
  )
}
