import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Paper, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, LinearProgress } from '@mui/material'
import { styled } from '@mui/system'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import BarChartIcon from '@mui/icons-material/BarChart'
import { useNavigate } from 'react-router-dom'
import theme from '../styles/theme'
import WaterIntake from '../components/WaterIntake'
import Sidebar from '../components/Sidebar'
import { useUserInfo } from '../hooks/useUserInfo'
import DashboardProfile from '../components/DashboardProfile'
import { useTrainingHistory } from '../hooks/useTrainingHistory'
import StatisticsPreview from '../components/StatisticsPreview '

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: '300px',
  marginRight: '300px',
  backgroundColor: '#d2cfc9',
  minHeight: '100vh',
  [theme.breakpoints.down('lg')]: {
    maxWidth: 'calc(100% - 300px)',
  },
}))

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}))

const StyledIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.primary.main,
}))

const HomePage = ({ user }) => {
  const navigate = useNavigate()
  const monthlyProgress = 80
  const stepsProgress = 50
  const { data: fetchedUserInfo } = useUserInfo()
  const [userInfo, setUserInfo] = useState(null)

  const [goals, setGoals] = useState([])
  const [goalDialogOpen, setGoalDialogOpen] = useState(false)
  const [newGoal, setNewGoal] = useState('')
  const { data: trainingHistory, isLoading: isTrainingHistoryLoading } = useTrainingHistory()

  useEffect(() => {
    if (fetchedUserInfo) {
      setUserInfo(fetchedUserInfo)
    }
  }, [fetchedUserInfo])

  const handleOpenGoalDialog = () => {
    setGoalDialogOpen(true)
  }

  const handleCloseGoalDialog = () => {
    setGoalDialogOpen(false)
  }

  const handleAddGoal = () => {
    setGoals([...goals, { title: newGoal, progress: 0 }])
    setNewGoal('')
    setGoalDialogOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#d2cfc9', minHeight: '100vh' }}>
      <Sidebar />
      <MainContent>
        <Typography variant="h4" sx={{ mb: 3, color: '#3fa2ad', fontWeight: 'bold' }}>
          Welcome Back, {userInfo?.personalInfo.name}!
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard>
              <IconWrapper>
                <StyledIcon>
                  <DirectionsRunIcon />
                </StyledIcon>
                <Typography variant="subtitle1">Steps</Typography>
              </IconWrapper>
              <Typography variant="h4" sx={{ mb: 1 }}>
                2,500
              </Typography>
              <LinearProgress variant="determinate" value={stepsProgress} sx={{ height: 8, borderRadius: 4 }} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {stepsProgress}% of daily goal
              </Typography>
            </DashboardCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard>
              <WaterIntake />
            </DashboardCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard onClick={() => navigate('/myplan')} sx={{ cursor: 'pointer' }}>
              <IconWrapper>
                <StyledIcon>
                  <AssignmentIcon />
                </StyledIcon>
                <Typography variant="subtitle1">My Plan</Typography>
              </IconWrapper>
            </DashboardCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Set your Goals
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleOpenGoalDialog}>
                ADD GOAL
              </Button>
            </DashboardCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <DashboardCard onClick={() => navigate('/trainingrecord')} sx={{ cursor: 'pointer' }}>
              <IconWrapper>
                <StyledIcon>
                  <ShowChartIcon />
                </StyledIcon>
                <Typography variant="h6">Training Record</Typography>
              </IconWrapper>
              <Typography variant="body1">View and manage your training sessions</Typography>
            </DashboardCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <DashboardCard>
              <IconWrapper>
                <StyledIcon>
                  <BarChartIcon />
                </StyledIcon>
                <Typography variant="h6">Progress</Typography>
              </IconWrapper>
              <LinearProgress variant="determinate" value={monthlyProgress} sx={{ height: 8, borderRadius: 4, mb: 1 }} />
              <Typography variant="body2">{monthlyProgress}% of monthly goal achieved</Typography>
            </DashboardCard>
          </Grid>
          <Grid item xs={12}>
            <DashboardCard>
              <StatisticsPreview />
            </DashboardCard>
          </Grid>
        </Grid>

        <Dialog open={goalDialogOpen} onClose={handleCloseGoalDialog}>
          <DialogTitle>Set a New Goal</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Goal Title" type="text" fullWidth value={newGoal} onChange={e => setNewGoal(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseGoalDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddGoal} color="primary" variant="contained">
              Add Goal
            </Button>
          </DialogActions>
        </Dialog>
      </MainContent>
      <DashboardProfile
        user={{
          name: `${userInfo?.personalInfo.name} ${userInfo?.personalInfo.lastName}` ?? '',
          avatar: userInfo?.photoUrl ?? '',
          email: userInfo?.email ?? '',
          city: userInfo?.address?.city ?? '',
        }}
        goals={goals}
        monthlyProgress={monthlyProgress}
      />
    </Box>
  )
}

export default HomePage
