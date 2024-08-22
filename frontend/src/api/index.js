import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// User API
export const loginUser = async credentials => {
  const { data } = await api.post('/users/login', credentials)
  return data
}

export const registerUser = async userData => {
  const { data } = await api.post('/users/register', userData)
  return data
}

// Exercise API
export const fetchExercises = async () => {
  const { data } = await api.get('/exercises')
  return data
}

// Routine API
export const fetchRoutines = async () => {
  const { data } = await api.get('/routines')
  return data
}

export const createRoutine = async routine => {
  const { data } = await api.post('/routines', routine)
  return data
}

// Training History API
export const recordTrainingSession = async session => {
  const { data } = await api.post('/history', session)
  return data
}

export const fetchTrainingHistory = async () => {
  const { data } = await api.get('/history')
  return data
}
