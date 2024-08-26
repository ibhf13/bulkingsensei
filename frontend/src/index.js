import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './styles/theme'

// Pages
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ForgotPassword from './components/ForgotPassword'
import HomePage from './Pages/HomePage'
import MyPlan from './Pages/MyPlan'
import Shoulder from './Pages/Exercises/Shoulder'
import Biceps from './Pages/Exercises/Biceps'
import Chest from './Pages/Exercises/Chest'
import Back from './Pages/Exercises/Back'
import Arm from './Pages/Exercises/Arm'
import Forearm from './Pages/Exercises/Forearm'
import Legs from './Pages/Exercises/Legs'
import Glutes from './Pages/Exercises/Glutes'
import ExerciseList from './components/ExerciseList'
import Profile from './Pages/Profile'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider, useAuth } from './context/AuthContext'
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
        path: 'exercises',
        element: <ExerciseList />,
      },
      {
        path: 'exercises',
        children: [
          { path: 'biceps', element: <Biceps /> },
          { path: 'shoulder', element: <Shoulder /> },
          { path: 'chest', element: <Chest /> },
          { path: 'back', element: <Back /> },
          { path: 'arm', element: <Arm /> },
          { path: 'forearm', element: <Forearm /> },
          { path: 'legs', element: <Legs /> },
          { path: 'glutes', element: <Glutes /> },
        ],
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
