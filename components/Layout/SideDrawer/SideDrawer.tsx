import { Home, Person, PersonAdd, ShoppingCart } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Box,
  ListItemIcon,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { Props, SideDrawerButton } from "./types";

const loggedInButtons: SideDrawerButton[] = [
  { title: "Home", icon: <Home />, link: "/" },
  { title: "Cart", icon: <ShoppingCart />, link: "/cart" },
];

const loggedOutButtons: SideDrawerButton[] = [
  { title: "Home", icon: <Home />, link: "/" },
  { title: "Sign In", icon: <Person />, link: "/sign-in" },
  { title: "Sign Up", icon: <PersonAdd />, link: "/sign-up" },
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
