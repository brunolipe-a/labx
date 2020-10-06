import { useCallback, useRef, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { CgCornerDownLeft } from 'react-icons/cg'

import {
  Button,
  Fade,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SlideFade,
  Image,
  HStack,
  Input,
  Text,
  Flex,
  useColorModeValue,
  Stack,
  Divider,
  Box,
  Tooltip,
  Collapse,
  Editable,
  EditableInput,
  EditablePreview
} from '@chakra-ui/core'

import BrandLogo from '~/assets/brand-icon-back.png'

type ModalTaskProps = {
  isOpen: boolean
  onClose(): void
}

type Task = {
  id: string
  value: string
  deleted: boolean
}

export default function ModalTask({ isOpen, onClose }: ModalTaskProps) {
  const [hasTasks, setHasTasks] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const headerBg = useColorModeValue('gray.100', 'gray.750')

  const handleAddTask = useCallback(() => {
    const { value } = inputRef.current

    if (value) {
      setTasks(state => [
        { id: `${state.length + 1}`, value, deleted: false },
        ...state
      ])

      inputRef.current.value = ''
      setHasTasks(true)
      inputRef.current.focus()
    }
  }, [])

  const handleEnterPress = useCallback(
    e => {
      if (e.key === 'Enter') {
        handleAddTask()
      }
    },
    [handleAddTask]
  )

  const handleSaveButton = useCallback(() => {
    setHasTasks(false)

    setTimeout(() => {
      setTasks([])
    }, 300)
  }, [])

  const handleRemove = useCallback(
    (id: string) => {
      const numberOfTasks = tasks.filter(task => !task.deleted).length

      if (numberOfTasks === 1) {
        setHasTasks(false)
        setTimeout(() => {
          setTasks([])
        }, 300)

        return
      }

      setTasks(state => {
        const index = state.findIndex(item => item.id === id)

        state[index].deleted = true

        return [...state]
      })
    },
    [tasks]
  )

  const handleEditting = useCallback((id: string, nextValue: string) => {
    setTasks(state => {
      const index = state.findIndex(item => item.id === id)

      state[index].value = nextValue

      return [...state]
    })
  }, [])

  return (
    <Fade timeout={300} in={isOpen}>
      {styles => (
        <Modal
          initialFocusRef={inputRef}
          onClose={onClose}
          isOpen={true}
          size="xl"
          scrollBehavior="inside"
        >
          <ModalOverlay style={styles}>
            <SlideFade timeout={200} in={isOpen} unmountOnExit={false}>
              {styles => (
                <ModalContent style={styles} maxW="60rem">
                  <ModalHeader
                    as={Flex}
                    borderTopRadius="md"
                    bg={headerBg}
                    alignItems="center"
                    p={4}
                  >
                    <Image src={BrandLogo} boxSize={6} mr={5} />
                    <Button
                      size="sm"
                      colorScheme="green"
                      p={2}
                      variant="ghost"
                      onClick={handleSaveButton}
                    >
                      Salvar
                    </Button>
                    <ModalCloseButton position="inherit" size="sm" ml="auto" />
                  </ModalHeader>
                  <ModalBody as={Stack} px={0} overflow="overlay">
                    <HStack alignItems="center" px={5} py={3}>
                      <BiPlus size={22} />
                      <Text fontWeight="bold" color="green.500" pl={1}>
                        Criar
                      </Text>
                      <Input
                        ref={inputRef}
                        variant="unstyled"
                        placeholder="nova tarefa"
                        pl={0}
                        onKeyDown={handleEnterPress}
                      />
                      <Button
                        size="sm"
                        colorScheme="green"
                        borderRadius="sm"
                        w={70}
                        onClick={handleAddTask}
                      >
                        Add
                      </Button>
                      <CgCornerDownLeft size={24} style={{ opacity: '0.5' }} />
                    </HStack>

                    <Collapse
                      display="flex"
                      flexDir="column"
                      style={styles}
                      alignItems="flex-start"
                      isOpen={hasTasks}
                      p={0}
                    >
                      <Divider opacity="1" />
                      <Box px={4} py={1}>
                        <Text fontSize="xs" fontWeight="medium" opacity="0.7">
                          CRIADAS RECENTEMENTE
                        </Text>
                      </Box>

                      {tasks.map(({ id, value, deleted }) => (
                        <Flex flexDir="column" key={id} w="100%">
                          <Divider
                            opacity="1"
                            display={deleted ? 'none' : 'block'}
                          />
                          <Collapse
                            p={4}
                            display="flex"
                            alignItems="center"
                            isOpen={!deleted}
                            delay={100}
                            maxW="100%"
                          >
                            <Text
                              fontSize="sm"
                              fontWeight="medium"
                              color="brand.500"
                            >
                              {`TASKID-${id}`}
                            </Text>

                            <Editable
                              defaultValue={value}
                              fontWeight="medium"
                              mx={4}
                              flex="1"
                              onSubmit={nextValue =>
                                handleEditting(id, nextValue)
                              }
                            >
                              <EditablePreview noOfLines={1} />
                              <EditableInput />
                            </Editable>
                            <Tooltip hasArrow label="Remover da lista">
                              <Button
                                size="sm"
                                fontSize="xs"
                                color="pink.400"
                                variant="link"
                                _hover={{
                                  textDecor: 'none',
                                  opacity: '0.5'
                                }}
                                onClick={() => handleRemove(id)}
                                ml="auto"
                              >
                                Tarefa não salva
                              </Button>
                            </Tooltip>
                          </Collapse>
                        </Flex>
                      ))}
                    </Collapse>
                  </ModalBody>
                </ModalContent>
              )}
            </SlideFade>
          </ModalOverlay>
        </Modal>
      )}
    </Fade>
  )
}
