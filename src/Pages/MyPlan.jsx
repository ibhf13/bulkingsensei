import React from "react";
import { Typography, Box, Container, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme";
import barbellIcon from "../Images/Login/23603572.png";

const MainContent = styled(Container)({
  padding: theme.spacing(3),
  backgroundColor: '#d2cfc9',
  maxWidth: '1400px',
  margin: 'auto',
  minHeight: '100vh',
});

const RowBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
});

const ButtonBox = styled(Paper)({
  width: '416px',
  height: '200px',
  padding: theme.spacing(2),
  display: 'flex',
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

  return (
    <Box sx={{ backgroundColor: '#d2cfc9', minHeight: '100vh' }}>
      <MainContent>
        <Box display="flex" alignItems="center" mb={2}>
          <img src={barbellIcon} alt="Bulking Sensei" width="80" height="40" style={{ marginRight: theme.spacing(1) }} />
          <Typography variant="h6" sx={{ fontFamily: "Nanum Gothic, sans-serif" }}>
            Bulking Sensei
          </Typography>
        </Box>

        {/* Main Content Area */}
        <Box>
          {/* First Row */}
          <RowBox>
            <ButtonBox elevation={3} onClick={() => handleButtonClick('/biceps')}>
              <Typography variant="h6">Biceps</Typography>
            </ButtonBox>
            <ButtonBox elevation={3} onClick={() => handleButtonClick('/shoulder')}>
              <Typography variant="h6">Shoulder</Typography>
            </ButtonBox>
          </RowBox>

          {/* Second Row */}
          <RowBox>
            <ButtonBox elevation={3} onClick={() => handleButtonClick('/chest')}>
              <Typography variant="h6">Chest</Typography>
            </ButtonBox>
            <ButtonBox elevation={3} onClick={() => handleButtonClick('/back')}>
              <Typography variant="h6">Back</Typography>
            </ButtonBox>
          </RowBox>

          {/* Third Row */}
          <RowBox>
            <ButtonBox elevation={3} onClick={() => handleButtonClick('/arm')}>
              <Typography variant="h6">Arm</Typography>
            </ButtonBox>
            <ButtonBox elevation={3} onClick={() => handleButtonClick('/forearm')}>
              <Typography variant="h6">Forearm</Typography>
            </ButtonBox>
          </RowBox>

          {/* Fourth Row */}
          <RowBox>
            <ButtonBox elevation={3} onClick={() => handleButtonClick('/legs')}>
              <Typography variant="h6">Legs</Typography>
            </ButtonBox>
            <ButtonBox elevation={3} onClick={() => handleButtonClick('/glutes')}>
              <Typography variant="h6">Glutes</Typography>
            </ButtonBox>
          </RowBox>
        </Box>
      </MainContent>
    </Box>
  );
};

export default MyPlan;
