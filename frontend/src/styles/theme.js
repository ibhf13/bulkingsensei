import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#94C1C6", // Primary color from the login page
    },
    secondary: {
      main: "#d2cfc9", // Secondary color from the login page
    },
    background: {
      default: "#f5f5f5", // Background color
      paper: "#ffffff",  // Background color for Paper components
    },
    text: {
      primary: "#000000",
      secondary: "#5B9DAA", // Accent color
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 300,
    },
  },
  shape: {
    borderRadius: 16, // Consistent border radius
  },
});

export default theme;
