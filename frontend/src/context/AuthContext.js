import React, { createContext, useState, useContext, useEffect } from 'react'

// @ts-ignore
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const userId = localStorage.getItem('userId')
      setIsAuthenticated(!!userId)
      setLoading(false)
    }
    checkAuth()
  }, [])

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
