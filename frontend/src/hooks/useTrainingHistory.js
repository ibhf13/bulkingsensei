import { useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchTrainingHistory, recordTrainingSession } from '../api'

export const useTrainingHistory = () => {
  return useQuery('trainingHistory', fetchTrainingHistory)
}

export const useRecordTrainingSession = () => {
  const queryClient = useQueryClient()

  return useMutation(recordTrainingSession, {
    onSuccess: () => {
      queryClient.invalidateQueries('trainingHistory') // Invalidate and refetch history after recording a session
    },
  })
}
