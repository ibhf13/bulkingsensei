import React, { useState } from 'react'
import { Paper, Typography, Box, Button, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { styled } from '@mui/system'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
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

const StepCounter = ({ initialSteps = 0, initialGoal = 10000 }) => {
  const [steps, setSteps] = useState(initialSteps)
  const [dailyGoal, setDailyGoal] = useState(initialGoal)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [inputSteps, setInputSteps] = useState(initialSteps)
  const [inputGoal, setInputGoal] = useState(initialGoal)
  const [isSettingGoal, setIsSettingGoal] = useState(false)

  const handleOpenDialog = (settingGoal = false) => {
    setInputSteps(steps)
    setInputGoal(dailyGoal)
    setIsSettingGoal(settingGoal)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setIsSettingGoal(false)
  }

  const handleUpdate = () => {
    if (isSettingGoal) {
      setDailyGoal(inputGoal)
    } else {
      setSteps(inputSteps)
    }
    setDialogOpen(false)
    setIsSettingGoal(false)
  }

  const stepsProgress = Math.min((steps / dailyGoal) * 100, 100)

  return (
    <>
      <DashboardCard onClick={() => handleOpenDialog(false)}>
        <IconWrapper>
          <StyledIcon>
            <DirectionsRunIcon />
          </StyledIcon>
          <Typography variant="h6">Steps</Typography>
        </IconWrapper>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {steps.toLocaleString()}
        </Typography>
        <LinearProgress variant="determinate" value={stepsProgress} sx={{ height: 8, borderRadius: 4 }} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {stepsProgress.toFixed(1)}% of daily goal ({dailyGoal.toLocaleString()} steps)
        </Typography>
        <Button
          onClick={e => {
            e.stopPropagation()
            handleOpenDialog(true)
          }}
          color="primary"
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Set Goal
        </Button>
      </DashboardCard>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isSettingGoal ? 'Set Daily Goal' : 'Update Step Count'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={isSettingGoal ? 'Daily Goal' : 'Steps'}
            type="number"
            fullWidth
            value={isSettingGoal ? inputGoal : inputSteps}
            onChange={e => (isSettingGoal ? setInputGoal(Number(e.target.value)) : setInputSteps(Number(e.target.value)))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            {isSettingGoal ? 'Set Goal' : 'Update Steps'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default StepCounter
