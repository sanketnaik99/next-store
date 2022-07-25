import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import Menu from "@mui/icons-material/Menu";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Link from "next/link";

import React, { useState } from "react";
import SideDrawer from "../SideDrawer/SideDrawer";
import { NavbarButton } from "./types";
import Logo from "../../../public/assets/store-logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../ducks";

const loggedInPages: NavbarButton[] = [
  { title: "Orders", link: "/orders" },
  { title: "Profile", link: "/profile" },
  { title: "Home", link: "/" },
];
const loggedOutPages: NavbarButton[] = [
  { title: "Sign In", link: "/sign-in" },
  { title: "Home", link: "/" },
];

interface Props {
  setTheme: (theme: string) => void;
  currentTheme: string;
}

const Navbar: React.FC<Props> = ({ currentTheme, setTheme }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const itemCount = useSelector<RootState, number>(
    (state) => state.cart.cart.total_items
  );
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.user.isLoggedIn
  );
  const pages = isLoggedIn ? loggedInPages : loggedOutPages;

  return (
    <AppBar position="sticky" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, cursor: "pointer" }}>
            <Link href="/">
              <Image src={Logo} height={50} width={150} alt="Store Logo" />
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="Menu Button"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setDrawerOpen(true)}
              color="inherit"
            >
              <Menu />
            </IconButton>
            <SideDrawer
              isDrawerOpen={isDrawerOpen}
              setDrawerOpen={setDrawerOpen}
              isLoggedIn={isLoggedIn}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              cursor: "pointer",
            }}
          >
            <Link href="/">
              <Image src={Logo} height={50} width={150} alt="Store Logo" />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "row-reverse",
            }}
          >
            {pages.map((page) => (
              <Link href={page.link} key={page.link}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
          <IconButton
            aria-label="Cart Button"
            color="inherit"
            onClick={() => router.push("/cart")}
          >
            {itemCount > 0 ? (
              <Badge color="secondary" badgeContent={itemCount}>
                <ShoppingCartOutlined />
              </Badge>
            ) : (
              <ShoppingCartOutlined />
            )}
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() =>
              currentTheme === "light" ? setTheme("dark") : setTheme("light")
            }
          >
            {currentTheme === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
