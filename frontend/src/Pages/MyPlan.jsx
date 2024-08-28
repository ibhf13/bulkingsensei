import React, { useState, useCallback } from 'react'
import { Typography, Box, Paper, CircularProgress } from '@mui/material'
import { styled } from '@mui/system'
import theme from '../styles/theme'
import Logo from '../components/Logo'
import { useExercises } from '../hooks/useExercises'
import MusclesList from '../components/MusclesList'

const MainContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#d2cfc9',
  padding: theme.spacing(6),
})

const ButtonBox = styled(Paper)({
  display: 'flex',
  minHeight: '40vh',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
  },
  '&:active': {
    transform: 'scale(0.98)',
    boxShadow: theme.shadows[12],
  },
})

const MyPlan = () => {
  const { muscleTypes, getExercisesByMuscleType } = useExercises()
  const [selectedMuscleType, setSelectedMuscleType] = useState(null)
  const [isMusclesToOpen, setIsMusclesToOpen] = useState(false)

  const handleMuscleTypeClick = useCallback((muscleTypeId, muscleName) => {
    setSelectedMuscleType({ id: muscleTypeId, name: muscleName })
    setIsMusclesToOpen(true)
  }, [])

  const handleCloseExercises = useCallback(() => {
    setIsMusclesToOpen(false)
  }, [])

  const { data: exercisesData, isLoading: isLoadingExercises } = getExercisesByMuscleType(selectedMuscleType?.id || '')

  if (muscleTypes.isLoading) {
    return (
      <MainContent>
        <Logo />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </MainContent>
    )
  }

  return (
    <MainContent>
      <Logo />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        {muscleTypes.data?.map(muscleType => (
          <Box
            key={muscleType._id}
            sx={{
              flex: '1 0 calc(50% - 20px)',
              maxWidth: 'calc(50% - 20px)',
              marginTop: '24px',
            }}
          >
            <ButtonBox onClick={() => handleMuscleTypeClick(muscleType._id, muscleType.name)}>
              <Typography variant="h5" sx={{ fontFamily: 'Nanum Gothic, sans-serif' }}>
                {muscleType.name}
              </Typography>
            </ButtonBox>
          </Box>
        ))}
      </Box>

      <MusclesList
        isOpen={isMusclesToOpen}
        onClose={handleCloseExercises}
        exercises={exercisesData || []}
        muscleType={selectedMuscleType?.name}
        isLoading={isLoadingExercises}
      />
    </MainContent>
  )
}

export default MyPlan
