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

const Arm = () => {
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
            <ButtonBox elevation={3} onClick={() => handleOpen('Bicep Curl')}>
              <Typography variant="h6">Bicep Curl</Typography>
            </ButtonBox>
            <ButtonBox elevation={3} onClick={() => handleOpen('Tricep Extension')}>
              <Typography variant="h6">Tricep Extension</Typography>
            </ButtonBox>
          </RowBox>

          {/* Second Row */}
          <RowBox>
            <ButtonBox elevation={3} onClick={() => handleOpen('Hammer Curl')}>
              <Typography variant="h6">Hammer Curl</Typography>
            </ButtonBox>
            <ButtonBox elevation={3} onClick={() => handleOpen('Skull Crusher')}>
              <Typography variant="h6">Skull Crusher</Typography>
            </ButtonBox>
          </RowBox>

          {/* Third Row */}
          <RowBox>
            <ButtonBox elevation={3} onClick={() => handleOpen('Close-Grip Bench Press')}>
              <Typography variant="h6">Close-Grip Bench Press</Typography>
            </ButtonBox>
            <ButtonBox elevation={3} onClick={() => handleOpen('Concentration Curl')}>
              <Typography variant="h6">Concentration Curl</Typography>
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

export default Arm;