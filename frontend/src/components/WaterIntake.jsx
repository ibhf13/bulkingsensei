import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, CircularProgress, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SettingsIcon from '@mui/icons-material/Settings'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

const GlassOfWaterIcon = ({ progress }) => {
  return (
    <svg viewBox="0 0 24 24" style={{ width: '50px', height: '50px', fill: 'none' }}>
      <rect x="7" y={2 + 20 - (progress / 100) * 20} width="10" height={(progress / 100) * 20} fill="#5CB5E1" stroke="none" />
      <rect x="7" y="2" width="10" height="20" rx="2" ry="2" stroke="black" strokeWidth="1" fill="none" />
    </svg>
  )
}

GlassOfWaterIcon.propTypes = {
  progress: PropTypes.number.isRequired,
}

const WaterIntake = () => {
  const [goal, setGoal] = useState(2000)
  const [intake, setIntake] = useState(0)
  const [goalDialogOpen, setGoalDialogOpen] = useState(false)
  const [intakeDialogOpen, setIntakeDialogOpen] = useState(false)
  const [inputIntake, setInputIntake] = useState(200)
  const [inputGoal, setInputGoal] = useState(goal)

  const progress = (intake / goal) * 100

  useEffect(() => {
    const now = new Date()
    const millisUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0).getTime() - now.getTime()

    const timeout = setTimeout(() => {
      setIntake(0)
    }, millisUntilMidnight)

    return () => clearTimeout(timeout)
  }, [])

  const handleGoalDialogOpen = e => {
    e.stopPropagation()
    setInputGoal(goal)
    setGoalDialogOpen(true)
  }

  const handleGoalDialogClose = () => {
    setGoalDialogOpen(false)
  }

  const handleIntakeDialogOpen = () => {
    setInputIntake(250)
    setIntakeDialogOpen(true)
  }

  const handleIntakeDialogClose = () => {
    setIntakeDialogOpen(false)
  }

  const handleGoalSubmit = e => {
    e.preventDefault()
    if (inputGoal > 0) {
      setGoal(inputGoal)
      if (intake > inputGoal) {
        setIntake(inputGoal)
      }
      setGoalDialogOpen(false)
    }
  }

  const handleIntakeSubmit = e => {
    e.preventDefault()
    if (inputIntake > 0) {
      setIntake(prevIntake => prevIntake + inputIntake)
      setIntakeDialogOpen(false)
    }
  }

  const handleResetIntake = e => {
    e.stopPropagation()
    setIntake(0)
  }

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleIntakeDialogOpen}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          position: 'relative',
          padding: '16px',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          aria-label="settings"
          onClick={handleGoalDialogOpen}
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            zIndex: 2,
            scale: 0.8,
          }}
        >
          <SettingsIcon />
        </IconButton>

        <IconButton
          aria-label="reset"
          onClick={handleResetIntake}
          sx={{
            position: 'absolute',
            top: 155,
            right: 4,
            zIndex: 2,
          }}
        >
          <RestartAltIcon />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <WaterDropIcon sx={{ color: '#5CB5E1', mr: 0 }} />
            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
              Water
            </Typography>
          </Box>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={100}
              thickness={6}
              sx={{
                color: '#E0E0E0',
              }}
            />
            {[...Array(Math.ceil(progress / 100))].map((_, i) => (
              <CircularProgress
                key={i}
                variant="determinate"
                value={i === Math.floor(progress / 100) ? progress % 100 : 100}
                size={100}
                thickness={6}
                sx={{
                  color: '#5CB5E1',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  zIndex: 1,
                  borderRadius: '50%',
                  boxShadow: i > 0 ? '0 0 10px rgba(0, 0, 0, 0.3)' : '0 0 10px rgba(0, 0, 0, 0.2) inset',
                  transform: `rotate(${i * 360 + (progress > 100 ? (progress - 100) * 3.6 : progress * 3.6)}deg)`,
                  strokeLinecap: 'round',
                  filter: `drop-shadow(0 0 6px rgba(0, 0, 0, 0.4))`,
                }}
              />
            ))}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <GlassOfWaterIcon progress={progress > 100 ? 100 : progress} />
            </Box>
          </Box>
          <Typography variant="body2" sx={{ mt: 1, color: 'black', fontWeight: 'bold' }}>
            {intake}ml / {goal}ml
          </Typography>
        </Box>
      </Button>

      {/* Dialog for setting daily water goal */}
      <Dialog open={goalDialogOpen} onClose={handleGoalDialogClose}>
        <DialogTitle>
          Set Daily Water Goal
          <IconButton
            aria-label="close"
            onClick={handleGoalDialogClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Daily Water Goal (ml)"
            type="number"
            fullWidth
            value={inputGoal}
            onChange={e => setInputGoal(parseInt(e.target.value) || 0)}
            inputProps={{
              step: 50,
              min: 0,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoalDialogClose}>Cancel</Button>
          <Button onClick={handleGoalSubmit}>Set Goal</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding water intake */}
      <Dialog open={intakeDialogOpen} onClose={handleIntakeDialogClose}>
        <DialogTitle>
          Add Water Intake
          <IconButton
            aria-label="close"
            onClick={handleIntakeDialogClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Water Intake (ml)"
            type="number"
            fullWidth
            value={inputIntake}
            onChange={e => setInputIntake(parseInt(e.target.value) || 0)}
            inputProps={{
              step: 50,
              min: 0,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleIntakeDialogClose}>Cancel</Button>
          <Button onClick={handleIntakeSubmit}>Add Intake</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default WaterIntake
