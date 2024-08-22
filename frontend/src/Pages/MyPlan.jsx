import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme";
import Logo from "../components/Logo";

const MainContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#d2cfc9',
  padding: theme.spacing(6),


});


const ButtonBox = styled(Paper)({
  display: 'flex',
  minHeight: '40vh',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
  },
  '&:active': {
    transform: 'scale(0.98)',
    boxShadow: theme.shadows[12],
  },
});

const MyPlan = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };
  const Muscles = ['Biceps', 'Shoulder', 'Chest', 'Back', 'Arm', 'Forearm', 'Legs', 'Glutes'];

  return (
    <MainContent>

      <Logo />

      {/* Main Content Area */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {Muscles.map((muscle) => (
          <Box
            key={muscle}
            sx={{
              flex: "1 0 calc(50% - 20px)",
              maxWidth: "calc(50% - 20px)",
              marginTop: "24px",
            }}
          >
            <ButtonBox onClick={() => handleButtonClick(`/${muscle.toLowerCase()}`)}>
              <Typography variant="h5" sx={{ fontFamily: "Nanum Gothic, sans-serif" }}>
                {muscle}
              </Typography>
            </ButtonBox>
          </Box>
        ))}
      </Box>
    </MainContent>
  )
}

export default MyPlan;
