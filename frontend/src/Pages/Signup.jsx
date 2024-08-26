import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Link,
    Box,
    Paper,
    CircularProgress,
    ThemeProvider,
    createTheme,
    CssBaseline,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
    Lock as LockIcon,
    Email as EmailIcon,
} from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useRegister } from '../hooks/useAuth';

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import barbellIcon from "../Images/Login/23603572.png";

const theme = createTheme({
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
});

const FormBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "500px",
    minHeight: "768px",
    boxShadow: "none",
    borderRadius: "30px",
    textAlign: "center",
    position: "relative",
    justifyContent: "space-between",
}));

const InputBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d8e9e9",
    borderRadius: "15px",
    width: "100%",
    height: "52px",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 1),
}));

const SignupButton = styled(Button)(({ theme }) => ({
    width: "124px",
    height: "52px",
    borderRadius: "16px",
    backgroundColor: "#94C1C6",
    color: theme.palette.common.white,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(2.5),
    fontSize: "12px",
    fontWeight: theme.typography.fontWeightBold,
    "&:hover": {
        backgroundColor: "#82B2B6",
    },
}));

const StyledTextField = styled(TextField)({
    flex: 1,
    "& .MuiInputBase-root": {
        height: "100%",
        backgroundColor: "transparent",
    },
    "& .MuiInputBase-input": {
        padding: "0 12px",
    },
    "& fieldset": {
        border: "none",
    },
});

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { mutate: register, isLoading, error } = useRegister();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const { confirmPassword, ...dataToSend } = formData;
        register(dataToSend, {
            onSuccess: () => navigate('/home'),
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "grey.200",
                p: 2,
            }}
        >
            <FormBox component="form" onSubmit={handleSignup}>
                <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
                    Sign up and start your bulking journey!
                </Typography>
                <img
                    src={barbellIcon}
                    alt="Barbell Icon"
                    style={{ width: "100%", maxWidth: "200px", height: "auto", marginBottom: "20px" }}
                />
                <Box sx={{ width: '100%' }}>
                    <InputBox>
                        <EmailIcon sx={{ mr: 1 }} />
                        <StyledTextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </InputBox>
                    <InputBox>
                        <LockIcon sx={{ mr: 1 }} />
                        <StyledTextField
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </InputBox>
                </Box>

                <SignupButton type="submit" variant="contained" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
                </SignupButton>
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error.message}
                    </Typography>
                )}
                <Typography sx={{ mt: 4 }}>
                    Already have an account?{" "}
                    <Link component={RouterLink} to="/" sx={{ color: "#5B9DAA", textDecoration: "none" }}>
                        Login here
                    </Link>
                </Typography>
            </FormBox>
        </Box>
    );
};

export default Signup;