import { Menu, ShoppingCartOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Container,
  Button,
} from "@mui/material";
import Link from "next/link";

import React, { useState } from "react";
import SideDrawer from "../SideDrawer/SideDrawer";
import { NavbarButton } from "./types";
import Logo from "../../../public/assets/store-logo.png";
import Image from "next/image";
import { useRouter } from "next/router";

const loggedInPages: NavbarButton[] = [
  { title: "Cart", link: "/cart" },
  { title: "Home", link: "/" },
];
const loggedOutPages: NavbarButton[] = [
  { title: "Sign Up", link: "/sign-up" },
  { title: "Sign In", link: "/sign-in" },
  { title: "Home", link: "/" },
];

interface Props {
  isLoggedIn: boolean;
}

const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const pages = isLoggedIn ? loggedInPages : loggedOutPages;
  const router = useRouter();

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, cursor: "pointer" }}>
            <Link href="/">
              <Image
                src={Logo}
                height={50}
                width={200}
                alt="Photo Shop Logo"
                placeholder="blur"
              />
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
              justifyContent: "center",
            }}
          >
            <Link href="/">
              <Image
                src={Logo}
                height={50}
                width={200}
                alt="Photo Shop Logo"
                placeholder="blur"
              />
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              cursor: "pointer",
              flexDirection: "row-reverse",
            }}
          >
            <IconButton
              size="large"
              aria-label="Cart Button"
              color="inherit"
              onClick={() => router.push("cart")}
            >
              <ShoppingCartOutlined />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "row-reverse",
            }}
          >
            <IconButton
              size="large"
              aria-label="Cart Button"
              color="inherit"
              onClick={() => router.push("cart")}
            >
              <ShoppingCartOutlined />
            </IconButton>
            {pages.map((page) => (
              <Link href={page.link} key={page.link}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
