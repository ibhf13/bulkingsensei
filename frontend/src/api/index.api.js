import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://bulkingsensei-backend.vercel.app/api',
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
    console.log('User info received:', data) // Log the received data
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
    const response = await api.post('/users/upload-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('Upload photo response:', response.data)
    return response.data // This should contain { photoUrl: '...' }
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
