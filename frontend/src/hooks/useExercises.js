import { useQuery, useQueryClient } from 'react-query'
import { fetchMuscleTypes, fetchExercisesByMuscleType, fetchAllExercises } from '../api/index.api'

export const useExercises = () => {
  const queryClient = useQueryClient()

  // Fetch all muscle types
  const muscleTypesQuery = useQuery('muscleTypes', fetchMuscleTypes, {
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  // Fetch all exercises
  const allExercisesQuery = useQuery('allExercises', fetchAllExercises, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  })

  // Function to get exercises by muscle type
  const getExercisesByMuscleType = muscleTypeId => {
    return useQuery(['exercisesByMuscleType', muscleTypeId], () => fetchExercisesByMuscleType(muscleTypeId), {
      enabled: !!muscleTypeId,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      onSuccess: data => {
        // Update the cache for all exercises
        queryClient.setQueryData('allExercises', oldData => {
          if (!oldData) return data
          return oldData.map(exercise => data.find(newExercise => newExercise._id === exercise._id) || exercise)
        })
      },
    })
  }

  return {
    muscleTypes: {
      data: muscleTypesQuery.data,
      isLoading: muscleTypesQuery.isLoading,
      isError: muscleTypesQuery.isError,
      error: muscleTypesQuery.error,
    },
    allExercises: {
      data: allExercisesQuery.data,
      isLoading: allExercisesQuery.isLoading,
      isError: allExercisesQuery.isError,
      error: allExercisesQuery.error,
    },
    getExercisesByMuscleType,
  }
}
