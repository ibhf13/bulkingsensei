import React from 'react'
import { useExercises } from '../hooks/useExercises'
import { CircularProgress, Alert, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Container, Box } from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'

const ExerciseList = () => {
  const { data: exercises, isLoading, error } = useExercises()
  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    )
  if (error)
    return (
      <Container maxWidth="sm">
        <Alert severity="error">Error loading exercises</Alert>
      </Container>
    )

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom mt={4}>
        Exercises
      </Typography>
      <List>
        {exercises.map(exercise => (
          <ListItem key={exercise._id} divider>
            <ListItemAvatar>
              <Avatar>
                <FitnessCenterIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={exercise.name} secondary={exercise.description} />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default ExerciseList
