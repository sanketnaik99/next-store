import { CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../../../theme";
import Navbar from "../Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [currentTheme, setTheme] = useState("light");
  const [hasLoaded, setLoaded] = useState(false);

  useEffect(() => {
    // Get stored theme.
    // Initially there is no theme in storage so storedTheme will be null.
    const storedTheme = localStorage.getItem("theme");

    // Check if theme has been stored and if it is the first load.
    // If the theme has been stored in local storage and hasLoaded is false -> Then make the theme from localstorage as the currentTheme.
    if (hasLoaded === false && storedTheme) {
      setLoaded(true);
      setTheme(storedTheme);
    }

    // If currentTheme is updated, update LocalStorage.
    if (currentTheme !== storedTheme && hasLoaded) {
      localStorage.setItem("theme", currentTheme);
    }

    // Set Loaded = true after first run
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme]);

  const isLoggedIn = false;
  return (
    <>
      <Head>
        <title>Next Store</title>
      </Head>
      <ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <Navbar
          isLoggedIn={isLoggedIn}
          setTheme={(theme: string) => setTheme(theme)}
          currentTheme={currentTheme}
        />
        {children}
        {/* Bottom Navbar */}
        {/* Footer */}
      </ThemeProvider>
    </>
  );
};

export default Layout;
