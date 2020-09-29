import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from 'react'

import { useRouter } from 'next/router'

import { AxiosError } from 'axios'

import { api, ApiFieldError } from '~/services/api'

export type SignInFormData = {
  username: string
  password: string
  keep: boolean
}

export type CreateFormData = {
  name: string
  email: string
  username: string
  password: string
  password_confirmation: string
}

type User = {
  id: string | number
  name: string
  email: string
  username: string
}

type AuthData = {
  token: string
  user: User
}

type CheckMe = {
  user: User
}

type ApiResponse = {
  isSuccess: boolean
  errors?: ApiFieldError[]
}

type AuthContextValue = {
  user: User
  isAuthenticated: boolean
  loading: boolean
  signIn(data: SignInFormData): Promise<ApiResponse>
  createUser(data: CreateFormData): Promise<ApiResponse>
  signOut(): Promise<void>
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

const AuthProvider = ({ children }: WithChildren) => {
  const router = useRouter()

  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(true)

  const signOut = useCallback(async (): Promise<void> => {
    localStorage.removeItem('@Labx:token')
    localStorage.removeItem('@Labx:keep')

    setUser({} as User)

    router.push('/')
  }, [router])

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const token = localStorage.getItem('@Labx:token')
      const keep = localStorage.getItem('@Labx:keep')

      if (token && JSON.parse(keep)) {
        api.defaults.headers.authorization = `Bearer ${token}`

        try {
          const { data } = await api.get<CheckMe>('users/me')

          setUser(data.user)
        } catch (e) {
          console.error(e)
        }
      }

      setLoading(false)
    }

    loadData()
  }, [])

  const signIn = useCallback(
    async ({ username, password, keep }: SignInFormData) => {
      try {
        const { data } = await api.post<AuthData>('/sessions', {
          username,
          password
        })

        const { token, user } = data

        localStorage.setItem('@Labx:token', token)
        localStorage.setItem('@Labx:keep', JSON.stringify(keep))

        api.defaults.headers.authorization = `Bearer ${token}`

        setUser(user)

        return { isSuccess: true }
      } catch (err) {
        const { response } = err as AxiosError<{
          errors: ApiFieldError[]
        }>

        console.log(response.data.errors)

        return { isSuccess: false, errors: response.data.errors }
      }
    },
    []
  )

  const createUser = useCallback(async (payload: CreateFormData) => {
    try {
      const { data } = await api.post<{ message: string }>('/users', payload)

      console.log(data)

      return { isSuccess: true }
    } catch (err) {
      const { response } = err as AxiosError<{
        errors: ApiFieldError[]
      }>

      console.log(response?.data.errors)

      return { isSuccess: false, errors: response?.data.errors }
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        signIn,
        signOut,
        createUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextValue {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
