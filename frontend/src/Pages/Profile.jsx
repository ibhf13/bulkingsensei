import React, { useState, useRef, useEffect } from 'react'
import { Box, Paper, Typography, Avatar, Grid, Button, CircularProgress, TextField, IconButton, Snackbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon, CameraAlt as CameraIcon } from '@mui/icons-material'
import { useUserInfo } from '../hooks/useUserInfo'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { updateUserInfo, uploadUserPhoto, API_BASE_URL } from '../api/index.api' // You'll need to create these API functions

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  backgroundColor: '#F0F8FF',
  borderRadius: '15px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}))

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(2),
}))

const LabelTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
}))

const AvatarWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&:hover .MuiIconButton-root': {
    opacity: 1,
  },
}))

const CameraIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  opacity: 0,
  transition: 'opacity 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const Profile = () => {
  const { data: fetchedUserInfo, isLoading: isUserLoading, error: userError, refetch } = useUserInfo()
  const { isAuthenticated } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [photoKey, setPhotoKey] = useState(Date.now())
  const [photoUrl, setPhotoUrl] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (fetchedUserInfo) {
      setUserInfo(fetchedUserInfo)
    }
  }, [fetchedUserInfo])

  useEffect(() => {
    if (userInfo && userInfo.photoUrl) {
      const fullPhotoUrl = `${API_BASE_URL}${userInfo.photoUrl}`
      console.log('Setting photo URL:', fullPhotoUrl) // Debugging line
      setPhotoUrl(fullPhotoUrl)
    }
  }, [userInfo])

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (isUserLoading || !userInfo)
    return <CircularProgress sx={{ position: 'absolute', top: '20%', left: '25%', minWidth: '25%', minHeight: '20%' }} />
  // @ts-ignore
  if (userError) return <Typography color="error">Error: {userError.message}</Typography>

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      setIsUpdating(true)

      const updatedFields = {
        personalInfo: {
          ...userInfo.personalInfo,
          bmi: calculateBMI(userInfo.personalInfo.weight, userInfo.personalInfo.height),
        },
        address: {
          street: userInfo.address.street,
          houseNumber: userInfo.address.houseNumber,
          plz: userInfo.address.plz,
          city: userInfo.address.city,
        },
      }

      const updatedUserInfo = await updateUserInfo(updatedFields)
      setUserInfo(updatedUserInfo)
      setIsEditing(false)
      setSnackbarMessage('Profile updated successfully!')
      setPhotoKey(Date.now()) // Force re-render of image
      setSnackbarOpen(true)
    } catch (error) {
      console.error('Error updating profile:', error)
      setSnackbarMessage('Failed to update profile. Please try again.')
      setSnackbarOpen(true)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    if (name in userInfo.personalInfo) {
      setUserInfo(prevState => ({
        ...prevState,
        personalInfo: { ...prevState.personalInfo, [name]: value },
      }))
    } else if (['street', 'houseNumber', 'plz', 'city'].includes(name)) {
      setUserInfo(prevState => ({
        ...prevState,
        address: { ...prevState.address, [name]: value },
      }))
    } else {
      setUserInfo(prevState => ({ ...prevState, [name]: value }))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setUserInfo(fetchedUserInfo) // Reset to original data
  }

  const handlePhotoChange = async e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      console.log('Selected file:', file)
      try {
        setIsUploadingPhoto(true)
        const formData = new FormData()
        formData.append('photo', file)
        const response = await uploadUserPhoto(formData)
        console.log('Upload response:', response)
        if (response && response.photoUrl) {
          const fullPhotoUrl = `${API_BASE_URL}${response.photoUrl}`
          console.log('Setting new photo URL:', fullPhotoUrl)
          setPhotoUrl(fullPhotoUrl)
          setSnackbarMessage('Photo uploaded successfully!')
        } else {
          throw new Error('No photo URL received from server')
        }
      } catch (error) {
        console.error('Error uploading photo:', error)
        setSnackbarMessage('Failed to upload photo. Please try again.')
      } finally {
        setIsUploadingPhoto(false)
        setSnackbarOpen(true)
      }
    }
  }

  const triggerPhotoUpload = () => {
    fileInputRef.current.click()
  }

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100
    return (weight / (heightInMeters * heightInMeters)).toFixed(1)
  }
  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 2, mt: '10vh' }}>
      <ProfilePaper elevation={3}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Grid item>
            <AvatarWrapper>
              <Avatar
                sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
                alt={userInfo.email}
                src={photoUrl || ''}
                onError={e => {
                  console.error('Error loading image:', e)
                  console.log('Attempted image URL:', photoUrl)
                }}
              />
              <CameraIconButton onClick={triggerPhotoUpload} disabled={isUploadingPhoto}>
                {isUploadingPhoto ? <CircularProgress size={24} /> : <CameraIcon />}
              </CameraIconButton>
              <input type="file" ref={fileInputRef} onChange={handlePhotoChange} style={{ display: 'none' }} accept="image/*" />
            </AvatarWrapper>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {userInfo.email}
            </Typography>
            {!isEditing && (
              <Button startIcon={<EditIcon />} variant="contained" color="primary" onClick={handleEdit}>
                Edit Profile
              </Button>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InfoBox>
              <LabelTypography variant="subtitle2">Age</LabelTypography>
              {isEditing ? (
                <TextField fullWidth name="age" value={userInfo.personalInfo.age} onChange={handleChange} type="number" />
              ) : (
                <Typography variant="h6">{userInfo.personalInfo.age}</Typography>
              )}
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoBox>
              <LabelTypography variant="subtitle2">Weight (kg)</LabelTypography>
              {isEditing ? (
                <TextField fullWidth name="weight" value={userInfo.personalInfo.weight} onChange={handleChange} type="number" />
              ) : (
                <Typography variant="h6">{userInfo.personalInfo.weight}</Typography>
              )}
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoBox>
              <LabelTypography variant="subtitle2">Height (cm)</LabelTypography>
              {isEditing ? (
                <TextField fullWidth name="height" value={userInfo.personalInfo.height} onChange={handleChange} type="number" />
              ) : (
                <Typography variant="h6">{userInfo.personalInfo.height}</Typography>
              )}
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoBox>
              <LabelTypography variant="subtitle2">BMI</LabelTypography>
              <Typography variant="h6">{userInfo.personalInfo.bmi}</Typography>
            </InfoBox>
          </Grid>
        </Grid>

        <InfoBox sx={{ mt: 2 }}>
          <LabelTypography variant="subtitle2">Address</LabelTypography>
          {isEditing ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="street" label="Street" value={userInfo.address.street} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="houseNumber" label="House Number" value={userInfo.address.houseNumber} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="plz" label="PLZ" value={userInfo.address.plz} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="city" label="City" value={userInfo.address.city} onChange={handleChange} />
              </Grid>
            </Grid>
          ) : (
            <Box>
              <Typography variant="body1">{userInfo.address.street + ' ' + userInfo.address.houseNumber}</Typography>
              <Typography variant="body1">{userInfo.address.plz + ' ' + userInfo.address.city}</Typography>
            </Box>
          )}
        </InfoBox>

        {isEditing && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button startIcon={<CancelIcon />} variant="outlined" color="warning" onClick={handleCancel} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button startIcon={<SaveIcon />} variant="contained" color="primary" onClick={handleSave} disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        )}
      </ProfilePaper>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
    </Box>
  )
}

export default Profile
