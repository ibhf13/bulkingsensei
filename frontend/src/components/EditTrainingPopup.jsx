import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material'
import { useRecordTrainingSession } from '../hooks/useTrainingHistory'

const EditTrainingPopup = ({ open, onClose, exercise, onSave }) => {
  const [sets, setSets] = useState(exercise.defaultSets || 1)
  const [reps, setReps] = useState(exercise.defaultReps || '')
  const [weight, setWeight] = useState(exercise.weight || '')
  const [duration, setDuration] = useState('')
  const [durationUnit, setDurationUnit] = useState('seconds')
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const recordTrainingMutation = useRecordTrainingSession()

  const handleSave = async () => {
    const trainingData = {
      exercises: [
        {
          exerciseId: exercise._id,
          sets: parseInt(sets),
          reps: parseInt(reps),
          weight: weight ? parseFloat(weight) : undefined,
          duration: duration
            ? {
                value: parseInt(duration),
                unit: durationUnit,
              }
            : undefined,
        },
      ],
    }

    try {
      await recordTrainingMutation.mutateAsync(trainingData)
      setSnackbar({ open: true, message: 'Training session recorded successfully', severity: 'success' })
      onSave(trainingData)
      onClose()
    } catch (error) {
      console.error('Error recording training session:', error)
      setSnackbar({ open: true, message: 'Failed to record training session', severity: 'error' })
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{exercise.name}</DialogTitle>
        <DialogContent>
          <Box display="flex" mb={2}>
            <Box mr={2}>
              <img src={exercise.gifUrl} alt={exercise.name} style={{ width: 100, height: 100, objectFit: 'cover' }} />
            </Box>
            <Box>
              <Typography variant="body1">{exercise.description}</Typography>
            </Box>
          </Box>
          <FormControl fullWidth margin="normal">
            <InputLabel>Sets</InputLabel>
            <Select value={sets} onChange={e => setSets(e.target.value)}>
              {[...Array(10)].map((_, i) => (
                <MenuItem key={i} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField fullWidth margin="normal" label="Reps" type="number" value={reps} onChange={e => setReps(e.target.value)} />
          {exercise.weight && (
            <TextField fullWidth margin="normal" label="Weight (kg)" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
          )}
          {!exercise.weight && (
            <Box display="flex" alignItems="center" mt={2}>
              <TextField fullWidth margin="normal" label="Duration" type="number" value={duration} onChange={e => setDuration(e.target.value)} />
              <FormControl style={{ minWidth: 120, marginLeft: 8 }}>
                <Select value={durationUnit} onChange={e => setDurationUnit(e.target.value)}>
                  <MenuItem value="seconds">Seconds</MenuItem>
                  <MenuItem value="minutes">Minutes</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained" disabled={recordTrainingMutation.isLoading}>
            {recordTrainingMutation.isLoading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          // @ts-ignore
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default EditTrainingPopup
