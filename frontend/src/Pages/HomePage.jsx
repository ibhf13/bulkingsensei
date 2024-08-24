import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Divider,
  Container,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  LinearProgress,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useNavigate } from 'react-router-dom';
import theme from "../styles/theme";
import barbellIcon from "../Images/Login/23603572.png";
import ProgressBar from "../components/ProgressBar";
import WaterIntake from "../components/WaterIntake";
import Sidebar from "../components/Sidebar";

const MainContent = styled(Container)({
  padding: theme.spacing(3),
  backgroundColor: '#d2cfc9',
  maxWidth: '1400px',
  margin: 'auto',
  minHeight: '100vh',
});

const SetGoalsButton = styled(ButtonBase)({
  width: '200px',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#94C1C6',
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  color: 'white',
  fontWeight: 'bold',
  boxShadow: theme.shadows[3],
  '&:hover': {
    backgroundColor: '#82A9B3',
    boxShadow: theme.shadows[6],
  },
});

const MyPlanButton = styled(ButtonBase)({
  width: '200px',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontWeight: 'bold',
  boxShadow: theme.shadows[3],
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[6],
  },
  '&:hover $icon': {
    color: theme.palette.primary.main,
  },
});

const SquarePaperButton = styled(Paper)({
  width: '200px',
  height: '200px',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
});

const SidebarPaper = styled(Paper)({
  width: '230px',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
});

const RectanglePaper = styled(Paper)({
  width: '416px',
  height: '200px',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
});

const LargeRectanglePaper = styled(Paper)({
  width: '848px',
  height: '400px',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
});

const HomePage = ({ user }) => {
  const navigate = useNavigate();
  const monthlyProgress = 80;
  const stepsProgress = 50;

  const [goals, setGoals] = useState([]);
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState("");

  const handleOpenGoalDialog = () => {
    setGoalDialogOpen(true);
  };

  const handleCloseGoalDialog = () => {
    setGoalDialogOpen(false);
  };

  const handleAddGoal = () => {
    setGoals([...goals, { title: newGoal, progress: 0 }]);
    setNewGoal("");
    setGoalDialogOpen(false);
  };

  const handleNavigateToMyPlan = () => {
    navigate('/myplan');
  };

  return (
    <Box sx={{ backgroundColor: '#d2cfc9', minHeight: '100vh' }}>
      <Sidebar />
      <MainContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={2}>
              <img src={barbellIcon} alt="Bulking Sensei" width="80" height="40" style={{ marginRight: theme.spacing(1) }} />
              <Typography variant="h6" sx={{ fontFamily: "Nanum Gothic, sans-serif" }}>
                Bulking Sensei
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={9}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Welcome Back, {user.name}!
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <SquarePaperButton elevation={3}>
                  <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                    <DirectionsRunIcon sx={{ fontSize: '2rem', color: '#5CB5E1' }} />
                    <Typography variant="h6" sx={{ fontSize: '1.25rem', marginLeft: '8px' }}>Steps</Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: '1.5rem', textAlign: 'center' }}>2,500 Steps</Typography>
                  <LinearProgress variant="determinate" value={stepsProgress} sx={{ mt: 1, width: '100%', height: '8px' }} />
                  <Typography variant="caption" sx={{ mt: 1, textAlign: 'center' }}>{stepsProgress}% of your goals</Typography>
                </SquarePaperButton>
              </Grid>

              <Grid item>
                <SquarePaperButton elevation={3}>
                  <WaterIntake />
                </SquarePaperButton>
              </Grid>

              <Grid item>
                <MyPlanButton elevation={3} onClick={handleNavigateToMyPlan}>
                  <Typography variant="h6" align="center" color="textSecondary">
                    My Plan
                  </Typography>
                </MyPlanButton>
              </Grid>

              <Grid item>
                <SetGoalsButton elevation={3} onClick={handleOpenGoalDialog}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Set your Goals
                  </Typography>
                </SetGoalsButton>
              </Grid>

              <Grid item>
                <RectanglePaper elevation={3} onClick={() => navigate("/1")}>
                  <Typography variant="h6">Backend Excersises</Typography>
                  {/* Add Activity content here */}
                </RectanglePaper>
              </Grid>

              <Grid item>
                <RectanglePaper elevation={3}>
                  <Typography variant="h6">Progress</Typography>
                  {/* Add Progress content here */}
                </RectanglePaper>
              </Grid>

              <Grid item xs={12}>
                <LargeRectanglePaper elevation={3}>
                  <Typography variant="h6">Statistics</Typography>
                  {/* Add Statistics content here */}
                </LargeRectanglePaper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={3} sx={{ paddingLeft: theme.spacing(6) }}>
            <SidebarPaper elevation={3}>
              <Avatar
                alt={user.name}
                src={user.avatar}
                sx={{ width: 56, height: 56, mb: 2 }}
              />
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2">{user.city}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Your Goals</Typography>
              {goals.length === 0 ? (
                <Typography variant="body2">No goals set yet.</Typography>
              ) : (
                goals.map((goal, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="body2">{goal.title}</Typography>
                    <LinearProgress variant="determinate" value={goal.progress} />
                  </Box>
                ))
              )}
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Monthly Progress</Typography>
              <ProgressBar value={monthlyProgress} />
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Scheduled</Typography>
              <Typography variant="body2">Training - Yoga Class</Typography>
              <Typography variant="body2">22 Mar</Typography>
              <Typography variant="body2">Training - Swimming</Typography>
              <Typography variant="body2">22 Mar</Typography>
            </SidebarPaper>
          </Grid>
        </Grid>

        {/* Dialog for setting goals */}
        <Dialog open={goalDialogOpen} onClose={handleCloseGoalDialog}>
          <DialogTitle>Set a New Goal</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Goal Title"
              type="text"
              fullWidth
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseGoalDialog} color="secondary">Cancel</Button>
            <Button onClick={handleAddGoal} color="primary">Add Goal</Button>
          </DialogActions>
        </Dialog>
      </MainContent>
    </Box>
  );
};

// Adding PropTypes to validate user prop
HomePage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    city: PropTypes.string.isRequired,
  }).isRequired,
};

// Default props for HomePage component
HomePage.defaultProps = {
  user: {
    name: 'User Name',
    avatar: '',
    city: 'City',
  },
};

export default HomePage;
