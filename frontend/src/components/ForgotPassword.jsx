import React, { useState } from 'react'
import { TextField, Button, Typography, Box, Paper, ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Email as EmailIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
})

const FormBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '400px',
  boxShadow: 'none',
  borderRadius: '30px',
  textAlign: 'center',
}))

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

const SubmitButton = styled(Button)(({ theme }) => ({
  width: '124px',
  height: '52px',
  borderRadius: '16px',
  backgroundColor: '#94C1C6',
  color: theme.palette.common.white,
  marginTop: theme.spacing(1.5),
  fontSize: '12px',
  fontWeight: theme.typography.fontWeightBold,
  '&:hover': {
    backgroundColor: '#82B2B6',
  },
}))

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Password reset requested for:', email)
    navigate('/login')
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'grey.200',
          p: 2,
        }}
      >
        <FormBox
          // @ts-ignore
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            Forgot Password
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Enter your email address and we'll send you a link to reset your password.
          </Typography>
          <InputBox>
            <EmailIcon sx={{ mr: 1 }} />
            <StyledTextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </InputBox>
          <SubmitButton type="submit" variant="contained">
            Reset Password
          </SubmitButton>
        </FormBox>
      </Box>
    </ThemeProvider>
  )
}

export default ForgotPassword
