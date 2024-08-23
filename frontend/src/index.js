import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './styles/theme'

// Pages
import Login from './Pages/Login'
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
import { QueryClient, QueryClientProvider } from 'react-query'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/1',
    element: <ExerciseList />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/myplan',
    element: <MyPlan />,
  },
  {
    path: '/biceps',
    element: <Biceps />,
  },
  {
    path: '/shoulder',
    element: <Shoulder />,
  },
  {
    path: '/chest',
    element: <Chest />,
  },
  {
    path: '/back',
    element: <Back />,
  },
  {
    path: '/arm',
    element: <Arm />,
  },
  {
    path: '/forearm',
    element: <Forearm />,
  },
  {
    path: '/legs',
    element: <Legs />,
  },
  {
    path: '/glutes',
    element: <Glutes />,
  },
])

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
