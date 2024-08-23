import React from "react";
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../styles/theme";
import barbellIcon from "../Images/Login/23603572.png";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarPaper = styled(Paper)({
    width: '230px',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <SidebarPaper>
            <img src={barbellIcon} alt="Bulking Sensei" width="80" height="40" style={{ marginBottom: theme.spacing(1) }} />
            <Typography variant="h6" sx={{ fontFamily: "Nanum Gothic, sans-serif" }}>
                Bulking Sensei
            </Typography>
            <List component="nav">
                <ListItem button onClick={() => handleNavigation('/home')}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation('/profile')}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <FitnessCenterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Plan" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/plan/weekly')}>
                            <ListItemText primary="Weekly Plan" />
                        </ListItem>
                        <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/plan/monthly')}>
                            <ListItemText primary="Monthly Plan" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button onClick={() => handleNavigation('/training-history')}>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Training History" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation('/calendar-history')}>
                    <ListItemIcon>
                        <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText primary="Calendar History" />
                </ListItem>
            </List>
        </SidebarPaper>
    );
};

export default Sidebar;