import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme'; // Adjust the path if necessary

import App from './App';
import Login from './Pages/Login'; // Adjust the path if necessary
import HomePage from './Pages/HomePage'; // Ensure this import is correct

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />, // Use HomePage for the root path
  },
  {
    path: '/login',
    element: <Login />,
  },
  // Other routes can be added here
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
