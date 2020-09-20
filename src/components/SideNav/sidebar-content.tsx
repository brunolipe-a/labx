import { IconType } from 'react-icons'
import {
  AiFillHome,
  AiOutlineBorderInner,
  AiOutlinePicCenter,
  AiOutlinePicLeft,
  AiOutlinePicRight
} from 'react-icons/ai'
import { BiMap, BiMapPin } from 'react-icons/bi'

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
  return <ChakraIcon as={icon} ml={10} />
}

export const sidebar: SideBarItemParent[] = [
  {
    title: 'Dashboard',
    subtitle: '12 atualizações',
    icon: Icon(AiFillHome),
    toRouter: '/'
  },
  {
    title: 'Layouts',
    icon: Icon(AiOutlineBorderInner),
    links: [
      {
        title: 'Default',
        icon: Icon(AiOutlinePicCenter),
        toRouter: '/layout'
      },
      {
        title: 'Secundary',
        icon: Icon(AiOutlinePicLeft),
        toRouter: '/layout'
      },
      {
        title: 'Boxed',
        icon: Icon(AiOutlinePicRight),
        toRouter: '/layout'
      }
    ]
  },
  {
    title: 'Maps',
    icon: Icon(BiMapPin),
    links: [
      {
        title: 'GoogleMaps',
        icon: Icon(BiMap),
        toRouter: '/maps'
      }
    ]
  }
]
