import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './styles/theme'

// Pages
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ForgotPassword from './components/ForgotPassword'
import HomePage from './Pages/HomePage'
import MyPlan from './Pages/MyPlan'
import Profile from './Pages/Profile'
import TrainingRecord from './Pages/TrainingRecord'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'myplan',
        element: <MyPlan />,
      },
      {
        path: 'trainingrecord',
        element: <TrainingRecord />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
])

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
