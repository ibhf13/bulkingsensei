import React from 'react'
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Button, useTheme, useMediaQuery } from '@mui/material'
import { styled } from '@mui/system'
import theme from '../styles/theme'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import HistoryIcon from '@mui/icons-material/History'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '280px',
  height: '90%',
  position: 'fixed',
  left: '20px',
  top: '20px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  boxSizing: 'border-box',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '20%',
    maxHight: '80%',
    padding: theme.spacing(2),
  },
}))

const StyledListItem = styled(ListItem)({
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '20%',
    maxHight: '80%',
    padding: theme.spacing(1),
  },
})

const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
  },
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(0),
  },
})

const LogoutButton = styled(Button)({
  marginTop: 'auto',
  borderRadius: '8px',
  minWidth: '10%',
  maxWidth: '10%',
})

const Sidebar = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleNavigation = path => {
    navigate(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/', { replace: true })
    window.location.reload()
  }

  return (
    <SidebarContainer>
      <Logo />
      <List component="nav">
        <StyledListItem onClick={() => handleNavigation('/home')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          {!isMobile && <StyledListItemText primary="Home" />}
        </StyledListItem>
        <StyledListItem onClick={() => handleNavigation('/profile')}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          {!isMobile && <StyledListItemText primary="Profile" />}
        </StyledListItem>
        <StyledListItem onClick={() => handleNavigation('/myplan')}>
          <ListItemIcon>
            <FitnessCenterIcon />
          </ListItemIcon>
          {!isMobile && <StyledListItemText primary="My Plan" />}
        </StyledListItem>
        <StyledListItem onClick={() => handleNavigation('/trainingrecord')}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          {!isMobile && <StyledListItemText primary="Training Record" />}
        </StyledListItem>
      </List>
      <LogoutButton variant="contained" startIcon={<LogoutIcon sx={{ ml: 2 }} />} onClick={handleLogout} fullWidth>
        {!isMobile && 'Logout'}
      </LogoutButton>
    </SidebarContainer>
  )
}

export default Sidebar
