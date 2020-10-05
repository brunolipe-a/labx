import { AiOutlineLink } from 'react-icons/ai'
import { BiWorld, BiPlus } from 'react-icons/bi'

import {
  HStack,
  IconButton,
  Divider,
  useColorModeValue,
  Tooltip,
  useDisclosure
} from '@chakra-ui/core'

import ModalTask from '../ModalTask'

export default function LeftSideHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dividerColor = useColorModeValue('gray.300', 'gray.600')

  return (
    <>
      <HStack spacing={2} display={{ base: 'none', md: 'flex' }} h={8}>
        <Tooltip hasArrow label="Notificações">
          <IconButton
            aria-label="Notifications"
            size="sm"
            variant="ghost"
            borderRadius="50%"
            colorScheme="gray"
            icon={<BiWorld size={20} />}
          />
        </Tooltip>
        <IconButton
          aria-label="Link"
          size="sm"
          variant="ghost"
          borderRadius="50%"
          icon={<AiOutlineLink size={18} />}
        />
        <Tooltip hasArrow label="Criar Tarefa">
          <IconButton
            aria-label="Random"
            size="sm"
            variant="ghost"
            borderRadius="50%"
            icon={<BiPlus size={18} />}
            onClick={onOpen}
          />
        </Tooltip>

        <Divider
          orientation="vertical"
          h="75%"
          borderLeftColor={dividerColor}
        />
      </HStack>
      <ModalTask isOpen={isOpen} onClose={onClose} />
    </>
  )
}
