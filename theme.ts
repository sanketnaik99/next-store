import { createTheme } from '@mui/material';


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#ff6d00',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff1744',
    },
    warning: {
      main: '#ff5722',
    },
    info: {
      main: '#00b0ff',
    },
    success: {
      main: '#00e676',
    },
  },
});

export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#009688',
      },
      secondary: {
        main: '#ff6d00',
        contrastText: '#ffffff',
      },
      error: {
        main: '#ff1744',
      },
      warning: {
        main: '#ff5722',
      },
      info: {
        main: '#00b0ff',
      },
      success: {
        main: '#00e676',
      },
    },
  });

