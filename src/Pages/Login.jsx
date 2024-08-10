import React, { memo } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Person as PersonIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Importing Poppins and Roboto fonts
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css"; // Poppins SemiBold
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css"; // Roboto Bold

import barbellIcon from "../Images/Login/23603572.png";
import bulkyManImage from "../Images/Login/Bulky_man.png";

// Create a theme to use Roboto globally
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

// Styled components using @mui/system
const BackgroundBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: theme.palette.grey[200],
});

const FormBox = styled(Paper)({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "683px",
  height: "768px",
  boxShadow: "none",
  borderBottomLeftRadius: "30px",
  borderTopLeftRadius: "30px",
  textAlign: "center",
  position: "relative",
  justifyContent: "space-between",
});

const InputBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#d8e9e9",
  borderRadius: "15px",
  width: "364px",
  height: "52px",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(0, 1),
});

const StyledTextField = styled(TextField)({
  flex: 1,
  "& .MuiInputBase-root": {
    height: "100%",
    display: "flex",
    alignItems: "center",
    padding: 1,
    backgroundColor: "transparent",
  },
  "& .MuiInputBase-input": {
    height: "100%",
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    lineHeight: "normal",
  },
  "& fieldset": {
    border: "none",
  },
});

const IconWrapper = styled(Box)({
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "center",
});

const BaseButton = styled(Button)({
  width: "364px",
  height: "52px",
  borderRadius: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textTransform: "none",
});

const LoginButton = styled(BaseButton)({
  width: "124px",
  backgroundColor: "#94C1C6",
  color: theme.palette.common.white,
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(2.5),
  fontFamily: "Roboto, Arial, sans-serif",
  fontSize: "12px",
  fontWeight: theme.typography.fontWeightBold,
  "&:hover": {
    backgroundColor: "#82B2B6",
  },
});

const SocialLoginButton = styled(BaseButton)({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  fontFamily: "Poppins, Arial, sans-serif",
  fontSize: "12px",
  fontWeight: theme.typography.fontWeightBold,
  border: `1px solid ${theme.palette.grey[400]}`,
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  "& .MuiButton-startIcon": {
    color: theme.palette.common.black,
  },
});

const RightBoxText = styled(Typography)({
  color: theme.palette.common.white,
  fontFamily: "Roboto, Arial, sans-serif",
  fontSize: "32px",
  fontWeight: theme.typography.fontWeightBold,
  textAlign: "center",
  textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)",
  position: "absolute",
  bottom: "30px",
  left: 0,
  right: 0,
  zIndex: 1,
  lineHeight: 1.2,
});

const LoginWithOthers = styled(Typography)({
  display: "flex",
  alignItems: "center",
  fontFamily: "Roboto, Arial, sans-serif",
  fontSize: "16px",
  fontWeight: "normal",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  "&::before, &::after": {
    content: '""',
    flex: 1,
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    margin: theme.spacing(0, 1),
  },
});

const RegisterText = styled(Typography)({
  marginTop: theme.spacing(5),
  paddingBottom: "81px",
  fontFamily: "Poppins, Arial, sans-serif",
  fontSize: "14px",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  gap: "4px",
});

const Divider = styled(Box)({
  width: "75%",
  height: "2px",
  backgroundColor: "lightgrey",
  margin: `${theme.spacing(2)} 0`, // Add some margin for spacing
});

const Login = memo(() => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundBox>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormBox>
            <Typography
              component="h1"
              sx={{
                mt: 2,
                fontFamily: "Poppins, Arial, sans-serif",
                fontSize: "17px",
                fontWeight: 400,
                pb: 1,
              }}
            >
              Login and start bulking right now!
            </Typography>
            <img
              src={barbellIcon}
              alt="Barbell Icon"
              width="320"
              height="112"
            />
            <Box
              component="form"
              noValidate
              sx={{
                mt: 2,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <InputBox>
                <IconWrapper>
                  <PersonIcon />
                </IconWrapper>
                <StyledTextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username" // Ensure label is clear and accessible
                  name="username"
                  autoComplete="username"
                  autoFocus
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </InputBox>
              <InputBox>
                <IconWrapper>
                  <LockIcon />
                </IconWrapper>
                <StyledTextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password" // Ensure label is clear and accessible
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </InputBox>
              <Link
                href="#"
                variant="body2"
                sx={{
                  alignSelf: "flex-start",
                  mb: 2,
                  fontFamily: "Poppins, Arial, sans-serif",
                  fontSize: "12px",
                  fontWeight: "bold",
                  pl: "150px",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot your password?
              </Link>
              <LoginButton type="submit" variant="contained" >
                Login
              </LoginButton>

               {/* Divider Line */}
               <Divider />

              <LoginWithOthers align="center">
                <strong>Login&nbsp;</strong> with Others
              </LoginWithOthers>
              <Grid container spacing={1.5} sx={{ justifyContent: "center" }}>
                <Grid item>
                  <SocialLoginButton
                    variant="contained"
                    startIcon={<GoogleIcon sx={{scale: "125%", marginRight: "4px"}} />}
                    sx={{ marginBottom: "10px"}} // Ensure proper spacing
                  >
                    Login with <strong>&nbsp;Google</strong>
                  </SocialLoginButton>
                </Grid>
                <Grid item>
                  <SocialLoginButton
                    variant="contained"
                    startIcon={<FacebookIcon sx={{scale: "150%", marginRight: "5px"}}/>}
                    sx={{ marginTop: "-10px" }} // Ensure proper spacing
                  >
                    Login with <strong>&nbsp;Facebook</strong>
                  </SocialLoginButton>
                </Grid>
              </Grid>
              <RegisterText variant="body2" align="center">
                <span style={{ color: "black" }}>Not a member?</span>{" "}
                <Link
                  href="#"
                  style={{ color: "#5B9DAA", textDecoration: "none" }}
                >
                  Register now
                </Link>
              </RegisterText>
            </Box>
          </FormBox>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              width: "683px",
              height: "768px",
              backgroundColor: "#d2cfc9",
              borderTopRightRadius: "30px",
              borderBottomRightRadius: "30px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <RightBoxText>
              Want to keep track of your gains?
              <br /><Link
                  href=""
                  style={{color: "#94C1C6", textDecoration: "none" }}
                >
                 Sign up 
                </Link>
                &nbsp;now!
            </RightBoxText>
            <img
              src={bulkyManImage}
              alt="Bulky man lifting weights"
              style={{
                width: "683px",
                height: "683px",
                borderRadius: "12px",
                position: "absolute",
                bottom: "50px",
              }}
            />
          </Box>
        </Box>
      </BackgroundBox>
    </ThemeProvider>
  );
});

// Assign display name to the component
Login.displayName = "Login";

export default Login;
