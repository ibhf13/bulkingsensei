import axios from 'axios'

// export const API_BASE_URL = 'https://bulkingsensei-backend.vercel.app/api'
export const API_BASE_URL = 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  config => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      config.headers['User-Id'] = userId
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export const getUserInfo = async () => {
  try {
    const { data } = await api.get('/users/info')
    console.log('User info received:', data)
    return data
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw error
  }
}

export const updateUserInfo = async userData => {
  try {
    const { data } = await api.put('/users/update', userData)
    return data
  } catch (error) {
    console.error('Error updating user info:', error)
    throw error
  }
}

export const uploadUserPhoto = async formData => {
  try {
    console.log('Uploading photo...')
    const response = await api.post('/users/upload-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('Upload response:', response.data)
    return response.data
  } catch (error) {
    console.error('Error uploading photo:', error)
    throw error
  }
}

export const loginUser = async credentials => {
  try {
    const response = await api.post('/users/login', credentials)
    localStorage.setItem('userId', response.data.userId)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error data:', error.response.data)
      console.error('Error status:', error.response.status)
    }
    throw error
  }
}

export const registerUser = async userData => {
  try {
    const { data } = await api.post('/users/register', userData)
    return data
  } catch (error) {
    throw error.response.data // return error message from server
  }
}

// Exercise related API calls
export const fetchAllExercises = async () => {
  try {
    const { data } = await api.get('/exercises')
    return data
  } catch (error) {
    console.error('Error fetching all exercises:', error)
    throw error
  }
}

export const fetchMuscleTypes = async () => {
  try {
    const { data } = await api.get('/exercises/muscle-types')
    return data
  } catch (error) {
    console.error('Error fetching muscle types:', error)
    throw error
  }
}

export const fetchExercisesByMuscleType = async muscleTypeId => {
  try {
    const { data } = await api.get(`/exercises/muscle-type/${muscleTypeId}`)
    return data
  } catch (error) {
    console.error(`Error fetching exercises for muscle type ${muscleTypeId}:`, error)
    throw error
  }
}

// Routine related API calls
export const fetchRoutines = async () => {
  try {
    const { data } = await api.get('/routines')
    return data
  } catch (error) {
    console.error('Error fetching routines:', error)
    throw error
  }
}

export const createRoutine = async routine => {
  try {
    const { data } = await api.post('/routines', routine)
    return data
  } catch (error) {
    console.error('Error creating routine:', error)
    throw error
  }
}

// Training History related API calls
export const recordTrainingSession = async session => {
  try {
    const { data } = await api.post('/history', session)
    return data
  } catch (error) {
    console.error('Error recording training session:', error)
    throw error
  }
}

export const fetchTrainingHistory = async () => {
  try {
    const { data } = await api.get('/history')
    return data
  } catch (error) {
    console.error('Error fetching training history:', error.response || error)
    throw error.response?.data || error
  }
}
export const saveTrainingEntry = async trainingData => {
  try {
    const { data } = await api.post('/history', trainingData)
    return data
  } catch (error) {
    console.error('Error saving training entry:', error)
    throw error
  }
}
