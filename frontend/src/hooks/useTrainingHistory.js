import { useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchTrainingHistory, recordTrainingSession, saveTrainingEntry } from '../api/index.api'

export const useTrainingHistory = () => {
  return useQuery('trainingHistory', fetchTrainingHistory, {
    refetchOnWindowFocus: false,
    retry: 2,
    onError: error => {
      console.error('Error fetching training history:', error)
    },
  })
}

export const useRecordTrainingSession = () => {
  const queryClient = useQueryClient()

  return useMutation(recordTrainingSession, {
    onSuccess: () => {
      queryClient.invalidateQueries('trainingHistory')
    },
    onError: error => {
      console.error('Error recording training session:', error)
    },
  })
}

export const useSaveTrainingEntry = () => {
  const queryClient = useQueryClient()

  return useMutation(saveTrainingEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries('trainingHistory')
    },
    onError: error => {
      console.error('Failed to save training entry:', error)
    },
  })
}
