import React, { useState } from "react";
import { Typography, Box, Container, Paper, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../../styles/theme";
import barbellIcon from "../../Images/Login/23603572.png";

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

const Glutes = () => {
  const [open, setOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState("");

  const handleOpen = (exerciseName) => {
    setCurrentExercise(exerciseName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <ButtonBox elevation={3} onClick={() => handleOpen('Glute Bridge')}>
              <Typography variant="h6">Glute Bridge</Typography>
            </ButtonBox>
            <ButtonBox elevation={3} onClick={() => handleOpen('Hip Thrust')}>
              <Typography variant="h6">Hip Thrust</Typography>
            </ButtonBox>
          </RowBox>

          {/* Second Row */}
          <RowBox>
            <ButtonBox elevation={3} onClick={() => handleOpen('Donkey Kick')}>
              <Typography variant="h6">Donkey Kick</Typography>
            </ButtonBox>
            <ButtonBox elevation={3} onClick={() => handleOpen('Fire Hydrant')}>
              <Typography variant="h6">Fire Hydrant</Typography>
            </ButtonBox>
          </RowBox>

          {/* Third Row */}
          <RowBox>
            <ButtonBox elevation={3} onClick={() => handleOpen('Lateral Band Walk')}>
              <Typography variant="h6">Lateral Band Walk</Typography>
            </ButtonBox>
            <ButtonBox elevation={3} onClick={() => handleOpen('Single Leg Deadlift')}>
              <Typography variant="h6">Single Leg Deadlift</Typography>
            </ButtonBox>
          </RowBox>
        </Box>
      </MainContent>

      {/* Popup Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentExercise}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Details about the {currentExercise} exercise go here.
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Glutes;
