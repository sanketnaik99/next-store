import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/system/ThemeProvider";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../ducks";
import { initializeCart } from "../../../ducks/cart";
import { commerce } from "../../../pages/_app";
import { darkTheme, lightTheme } from "../../../theme";
import NavbarPlaceholder from "../Navbar/NavbarPlaceholder";

interface Props {
  children: React.ReactNode;
}

const Navbar = dynamic(() => import("../Navbar/Navbar"));

const Layout: React.FC<Props> = ({ children }) => {
  const [currentTheme, setTheme] = useState("light");
  const [hasLoaded, setLoaded] = useState(false);
  const [hasCartInitialized, setCartInitialized] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const initializeCommerceCart = async () => {
    const cart = await commerce.cart.retrieve();
    dispatch(initializeCart(cart));
  };

  useEffect(() => {
    if (!hasCartInitialized) {
      // Initialize Cart
      // console.log("Initialized Cart");
      initializeCommerceCart();
      setCartInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCartInitialized]);

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

  return (
    <>
      <Head>
        <title>Next Store</title>
      </Head>
      <ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <Suspense fallback={<NavbarPlaceholder />}>
          <Navbar
            setTheme={(theme: string) => setTheme(theme)}
            currentTheme={currentTheme}
          />
        </Suspense>
        {children}
        {/* Bottom Navbar */}
        {/* Footer */}
      </ThemeProvider>
    </>
  );
};

export default Layout;
