import { createTheme } from "@mui/material";
declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#303030",
      paper: "#424242",
    },
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ff1744",
    },
    warning: {
      main: "#ff5722",
    },
    info: {
      main: "#00b0ff",
    },
    success: {
      main: "#00a152",
    },
    neutral: {
      main: "#E0E0E0",
      contrastText: "#000",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ff1744",
    },
    warning: {
      main: "#ff5722",
    },
    info: {
      main: "#00b0ff",
    },
    success: {
      main: "#00a152",
    },
    neutral: {
      main: "#424242",
      contrastText: "#fff",
    },
  },
});
