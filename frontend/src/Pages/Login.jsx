import React, { useState } from 'react'
import { TextField, Button, Typography, Link, Grid, Box, Paper, CircularProgress, ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Google as GoogleIcon, Facebook as FacebookIcon, Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useLogin } from '../hooks/useAuth'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import barbellIcon from '../Images/Login/23603572.png'
import bulkyManImage from '../Images/Login/Bulky_man.png'

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
  maxWidth: '683px',
  minHeight: '768px',
  boxShadow: 'none',
  borderRadius: '30px',
  textAlign: 'center',
  position: 'relative',
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}))

const InputBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#d8e9e9',
  borderRadius: '15px',
  width: '100%',
  maxWidth: '364px',
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

const LoginButton = styled(Button)(({ theme }) => ({
  width: '124px',
  height: '52px',
  borderRadius: '16px',
  backgroundColor: '#94C1C6',
  color: theme.palette.common.white,
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(2.5),
  fontSize: '12px',
  fontWeight: theme.typography.fontWeightBold,
  '&:hover': {
    backgroundColor: '#82B2B6',
  },
}))

const SocialLoginButton = styled(Button)(({ theme }) => ({
  width: '100%',
  maxWidth: '364px',
  height: '52px',
  borderRadius: '16px',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  fontSize: '12px',
  fontWeight: theme.typography.fontWeightBold,
  border: `1px solid ${theme.palette.grey[400]}`,
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}))

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: login, isLoading, error } = useLogin()

  const handleLogin = e => {
    e.preventDefault()
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate('/home')
        },
      }
    )
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
        <Grid container maxWidth="lg" justifyContent="center">
          <Grid item xs={12} md={6}>
            <FormBox
              // @ts-ignore
              component="form"
              onSubmit={handleLogin}
            >
              <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>
                Login and start bulking right now!
              </Typography>
              <img src={barbellIcon} alt="Barbell Icon" style={{ width: '100%', maxWidth: '320px', height: 'auto', marginBottom: '20px' }} />
              <InputBox>
                <PersonIcon sx={{ mr: 1 }} />
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
              <InputBox>
                <LockIcon sx={{ mr: 1 }} />
                <StyledTextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </InputBox>
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                sx={{
                  alignSelf: 'center',
                  mb: 2,
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot your password?
              </Link>
              <LoginButton type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Login'}
              </LoginButton>
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {
                    // @ts-ignore
                    error.message
                  }
                </Typography>
              )}
              <Box sx={{ width: '75%', height: '2px', bgcolor: 'lightgrey', my: 2 }} />
              <Typography sx={{ my: 2, fontWeight: 'bold' }}>Login with Others</Typography>
              <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item xs={12}>
                  <SocialLoginButton variant="contained" startIcon={<GoogleIcon />}>
                    Login with Google
                  </SocialLoginButton>
                </Grid>
                <Grid item xs={12}>
                  <SocialLoginButton variant="contained" startIcon={<FacebookIcon />}>
                    Login with Facebook
                  </SocialLoginButton>
                </Grid>
              </Grid>
              <Typography sx={{ mt: 4 }}>
                Not a member?{' '}
                <Link component={RouterLink} to="/signup" sx={{ color: '#5B9DAA', textDecoration: 'none' }}>
                  Register now
                </Link>
              </Typography>
            </FormBox>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                height: '100%',
                backgroundColor: '#d2cfc9',
                borderTopRightRadius: '30px',
                borderBottomRightRadius: '30px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  color: 'common.white',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)',
                  position: 'absolute',
                  bottom: '30px',
                  left: 0,
                  right: 0,
                  zIndex: 1,
                  lineHeight: 1.2,
                }}
              >
                Want to keep track of your gains?
                <br />
                <Link component={RouterLink} to="/signup" sx={{ color: '#94C1C6', textDecoration: 'none' }}>
                  Sign up
                </Link>
                &nbsp;now!
              </Typography>
              <img
                src={bulkyManImage}
                alt="Bulky man lifting weights"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '12px',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default Login
