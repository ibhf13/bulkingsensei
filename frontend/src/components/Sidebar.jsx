import React from 'react'
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Button } from '@mui/material'
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
  height: 'calc(100vh - 40px)',
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
  },
}))

const StyledListItem = styled(ListItem)({
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
  },
})

const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
  },
})

const LogoutButton = styled(Button)({
  marginTop: 'auto',
  borderRadius: '8px',
})

const Sidebar = () => {
  const navigate = useNavigate()

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
          <StyledListItemText primary="Home" />
        </StyledListItem>
        <StyledListItem onClick={() => handleNavigation('/profile')}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <StyledListItemText primary="Profile" />
        </StyledListItem>
        <StyledListItem onClick={() => handleNavigation('/myplan')}>
          <ListItemIcon>
            <FitnessCenterIcon />
          </ListItemIcon>
          <StyledListItemText primary="My Plan" />
        </StyledListItem>
        <StyledListItem onClick={() => handleNavigation('/trainingrecord')}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <StyledListItemText primary="Training Record" />
        </StyledListItem>
      </List>
      <LogoutButton variant="outlined" startIcon={<LogoutIcon />} onClick={handleLogout} fullWidth>
        Logout
      </LogoutButton>
    </SidebarContainer>
  )
}

export default Sidebar
