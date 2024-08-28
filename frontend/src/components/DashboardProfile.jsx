import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Typography, Box, LinearProgress } from '@mui/material'
import { styled } from '@mui/system'

const ProfileContainer = styled(Box)(({ theme }) => ({
  width: '270px',
  height: 'calc(100vh - 40px)', // Full height minus top and bottom margins
  position: 'fixed',
  right: '20px',
  top: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  overflowY: 'auto',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '20%',
    maxHight: '80%',
  },
}))

const AvatarContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px',
})

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}))

const DashboardProfile = ({ user, goals, monthlyProgress }) => {
  return (
    <ProfileContainer>
      <AvatarContainer>
        <Avatar alt={user.name} src={user.avatar} sx={{ width: 80, height: 80 }} />
      </AvatarContainer>
      <Typography variant="h6" align="center">
        {user.name}
      </Typography>
      <Typography variant="body2" align="center">
        {user.city}
      </Typography>

      <SectionTitle variant="h6">Your Goals</SectionTitle>
      {goals.length === 0 ? (
        <Typography variant="body2">No goals set yet.</Typography>
      ) : (
        goals.map((goal, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body2">{goal.title}</Typography>
            <LinearProgress variant="determinate" value={goal.progress} />
          </Box>
        ))
      )}

      <SectionTitle variant="h6">Monthly Progress</SectionTitle>
      <LinearProgress variant="determinate" value={monthlyProgress} sx={{ mb: 1 }} />
      <Typography variant="body2">{monthlyProgress}% achieved</Typography>

      <SectionTitle variant="h6">Scheduled</SectionTitle>
      <Typography variant="body2">Training - Yoga Class</Typography>
      <Typography variant="body2">22 Mar</Typography>
      <Typography variant="body2">Training - Swimming</Typography>
      <Typography variant="body2">22 Mar</Typography>
    </ProfileContainer>
  )
}

export default DashboardProfile
