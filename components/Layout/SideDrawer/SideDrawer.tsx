import Home from "@mui/icons-material/Home";
import Person from "@mui/icons-material/Person";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import React from "react";
import { Props, SideDrawerButton } from "./types";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Box,
  ListItemIcon,
} from "@mui/material";
import { Receipt, StoreMallDirectory } from "@mui/icons-material";

const loggedInButtons: SideDrawerButton[] = [
  { title: "Home", icon: <Home />, link: "/" },
  { title: "Profile", icon: <Person />, link: "/profile" },
  { title: "Products", icon: <StoreMallDirectory />, link: "/products" },
  { title: "Orders", icon: <Receipt />, link: "orders" },
  { title: "Cart", icon: <ShoppingCart />, link: "/cart" },
];

const loggedOutButtons: SideDrawerButton[] = [
  { title: "Home", icon: <Home />, link: "/" },
  { title: "Products", icon: <StoreMallDirectory />, link: "/products" },
  { title: "Sign In", icon: <Person />, link: "/sign-in" },
];

const SideDrawer: React.FC<Props> = ({
  isDrawerOpen,
  setDrawerOpen,
  isLoggedIn,
}) => {
  const buttons = isLoggedIn ? loggedInButtons : loggedOutButtons;
  const router = useRouter();

  return (
    <SwipeableDrawer
      anchor="left"
      open={isDrawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
    >
      <Box>
        <List>
          {buttons.map((button, index) => (
            <ListItem
              key={index}
              onClick={() => {
                router.push(button.link);
                setDrawerOpen(false);
              }}
            >
              <ListItemButton>
                <ListItemIcon>{button.icon}</ListItemIcon>
                <ListItemText primary={button.title}></ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default SideDrawer;
