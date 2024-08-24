import { useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchRoutines, createRoutine } from '../api/index.api'

export const useRoutines = () => {
  return useQuery('routines', fetchRoutines)
}

export const useCreateRoutine = () => {
  const queryClient = useQueryClient()

  return useMutation(createRoutine, {
    onSuccess: () => {
      queryClient.invalidateQueries('routines') // Invalidate and refetch routines after creating a new one
    },
  })
}
