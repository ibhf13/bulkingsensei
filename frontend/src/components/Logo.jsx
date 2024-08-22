import React from 'react'
import { Typography, Box } from "@mui/material";
import barbellIcon from "../Images/Login/23603572.png";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme";

const Logo = () => {
    const navigate = useNavigate();

    const styleLogo = {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer'
        }
    }
    return (
        <Box onClick={() => navigate("/home")} sx={styleLogo}>
            <img src={barbellIcon} alt="Bulking Sensei" width="80" height="40" style={{ marginRight: theme.spacing(1) }} />
            <Typography variant="h6" sx={{ fontFamily: "Nanum Gothic, sans-serif" }}>
                Bulking Sensei
            </Typography>
        </Box>)
}

export default Logo