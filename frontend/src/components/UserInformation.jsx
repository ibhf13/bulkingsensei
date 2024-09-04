import React from 'react'
import { TextField, Grid, Box } from '@mui/material'
import { Height as HeightIcon, Scale as ScaleIcon, Home as HomeIcon, Cake as CakeIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const InputBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#d8e9e9',
  borderRadius: '15px',
  width: '100%',
  height: '52px',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(0, 1),
}))

const StyledTextField = styled(TextField)({
  flex: 1,
  '& .MuiInputBase-root': {
    height: '100%',
    backgroundColor: 'transparent',
  },
  '& .MuiInputBase-input': {
    padding: '0 12px',
  },
  '& fieldset': {
    border: 'none',
  },
})

const UserInformation = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <InputBox>
          <CakeIcon sx={{ mr: 1 }} />
          <StyledTextField
            required
            fullWidth
            name="age"
            label="Age"
            type="number"
            id="age"
            value={formData.age}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </InputBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputBox>
          <ScaleIcon sx={{ mr: 1 }} />
          <StyledTextField
            required
            fullWidth
            name="weight"
            label="Weight (kg)"
            type="number"
            id="weight"
            value={formData.weight}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </InputBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputBox>
          <HeightIcon sx={{ mr: 1 }} />
          <StyledTextField
            required
            fullWidth
            name="height"
            label="Height (cm)"
            type="number"
            id="height"
            value={formData.height}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </InputBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputBox>
          <HomeIcon sx={{ mr: 1 }} />
          <StyledTextField
            required
            fullWidth
            name="street"
            label="Street"
            id="street"
            value={formData.street}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </InputBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputBox>
          <HomeIcon sx={{ mr: 1 }} />
          <StyledTextField
            required
            fullWidth
            name="houseNumber"
            label="House Number"
            id="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </InputBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputBox>
          <HomeIcon sx={{ mr: 1 }} />
          <StyledTextField
            required
            fullWidth
            name="plz"
            label="PLZ (Postleitzahl)"
            id="plz"
            value={formData.plz}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </InputBox>
      </Grid>
      <Grid item xs={12}>
        <InputBox>
          <HomeIcon sx={{ mr: 1 }} />
          <StyledTextField
            required
            fullWidth
            name="city"
            label="City"
            id="city"
            value={formData.city}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </InputBox>
      </Grid>
    </Grid>
  )
}

export default UserInformation
