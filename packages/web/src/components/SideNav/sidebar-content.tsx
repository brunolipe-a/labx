import { IconType } from 'react-icons'
import {
  AiFillHome,
  AiOutlineBorderInner,
  AiOutlineInbox,
  AiOutlinePicCenter,
  AiOutlinePicLeft,
  AiOutlinePicRight,
  AiOutlineTeam
} from 'react-icons/ai'
import { CgLogIn, CgUserAdd } from 'react-icons/cg'
import { HiOutlineSparkles } from 'react-icons/hi'

import { Icon as ChakraIcon } from '@chakra-ui/icons'

interface SideBarItem {
  title: string
  icon?: JSX.Element
  toRouter?: string
}

interface SideBarItemParent extends SideBarItem {
  subtitle?: string
  links?: SideBarItem[]
}

function Icon(icon: IconType) {
  return <ChakraIcon as={icon} boxSize={5} ml={10} />
}

export const sidebar: SideBarItemParent[] = [
  {
    title: 'Dashboard',
    subtitle: '12 Atualizações',
    icon: Icon(AiFillHome),
    toRouter: '/app'
  },
  {
    title: 'Email',
    subtitle: '254 Novos Emails',
    icon: Icon(AiOutlineInbox),
    toRouter: '/app/email'
  },
  {
    title: 'Social',
    icon: Icon(AiOutlineTeam),
    toRouter: '/app/social'
  },
  {
    title: 'Layouts',
    icon: Icon(AiOutlineBorderInner),
    links: [
      {
        title: 'Default',
        icon: Icon(AiOutlinePicCenter),
        toRouter: '/app/layout'
      },
      {
        title: 'Secundary',
        icon: Icon(AiOutlinePicLeft),
        toRouter: '/app/layout'
      },
      {
        title: 'Boxed',
        icon: Icon(AiOutlinePicRight),
        toRouter: '/app/layout'
      }
    ]
  },
  {
    title: 'Extra',
    icon: Icon(HiOutlineSparkles),
    links: [
      {
        title: 'Login',
        icon: Icon(CgLogIn),
        toRouter: '/login'
      },
      {
        title: 'Registre-se',
        icon: Icon(CgUserAdd),
        toRouter: '/register'
      }
    ]
  }
]
