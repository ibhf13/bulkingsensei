import React, { useState } from 'react'
import { Box, Typography, IconButton, Card, CardContent, CardMedia, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ExerciseEditDialog from './EditTrainingPopup'
import { useExercisesImages, ExerciseType } from '../hooks/useExercisesImages'

const MusclesList = ({ isOpen, onClose, exercises, muscleType, isLoading }) => {
  const [selectedExercise, setSelectedExercise] = useState(null)
  const { getExerciseImage } = useExercisesImages()

  const handleExerciseClick = exercise => {
    setSelectedExercise(exercise)
  }

  const handleDialogClose = () => {
    setSelectedExercise(null)
  }

  const handleSaveTraining = trainingData => {
    console.log('Saving training data:', trainingData)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: 300,
        backgroundColor: 'background.paper',
        boxShadow: 3,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        overflowY: 'auto',
        zIndex: 1200,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6">{muscleType} Exercises</Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: 2 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : exercises.length > 0 ? (
          exercises.map(exercise => (
            <Card key={exercise._id} sx={{ mb: 2, cursor: 'pointer' }} onClick={() => handleExerciseClick(exercise)}>
              <CardMedia component="img" height="140" image={getExerciseImage(exercise.name)} alt={exercise.name} />
              <CardContent>
                <Typography variant="h6">{exercise.name}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No exercises found for this muscle type.</Typography>
        )}
      </Box>
      {selectedExercise && (
        <ExerciseEditDialog open={!!selectedExercise} onClose={handleDialogClose} exercise={selectedExercise} onSave={handleSaveTraining} />
      )}
    </Box>
  )
}

export default MusclesList
