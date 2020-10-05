import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/core'

import { useAuth } from '~/context/auth'

import LoadingPage from '../LoadingPage'

const TIMEOUT = 500

export function PrivateRoute({ children }: WithChildren) {
  const { loading, isAuthenticated, signOut } = useAuth()
  const [inFade, setInFade] = useState(loading)

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      signOut()
    }

    if (isAuthenticated && !loading) {
      setTimeout(() => {
        setInFade(false)
      }, TIMEOUT)
    }
  }, [isAuthenticated, signOut, loading])

  return (
    <Box position="relative">
      <LoadingPage inFade={inFade} timeout={TIMEOUT} />

      {!inFade && children}
    </Box>
  )
}
