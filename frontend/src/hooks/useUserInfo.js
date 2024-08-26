import { useQuery } from 'react-query'
import { getUserInfo } from '../api/index.api'
import { useAuth } from '../context/AuthContext' // Import useAuth

export const useUserInfo = () => {
  const { isAuthenticated } = useAuth() // Get authentication status

  return useQuery('userInfo', getUserInfo, {
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: isAuthenticated, // Only run the query if the user is authenticated
  })
}
