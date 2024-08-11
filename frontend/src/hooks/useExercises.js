import { useQuery } from 'react-query'
import { fetchExercises } from '../api'

export const useExercises = () => {
  return useQuery('exercises', fetchExercises, {
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
