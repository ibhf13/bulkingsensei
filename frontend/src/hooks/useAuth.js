import { useMutation, useQueryClient } from 'react-query'
import { loginUser, registerUser } from '../api/index.api'
import { useAuth } from '../context/AuthContext'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const { setIsAuthenticated } = useAuth()

  return useMutation(loginUser, {
    onSuccess: data => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.userId)
      setIsAuthenticated(true)
      queryClient.invalidateQueries('userInfo')
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  const { setIsAuthenticated } = useAuth()

  return useMutation(registerUser, {
    onSuccess: data => {
      localStorage.setItem('token', data.token)
      setIsAuthenticated(true)
      queryClient.invalidateQueries('user')
    },
  })
}
