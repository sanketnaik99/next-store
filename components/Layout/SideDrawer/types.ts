import React, { ReactNode } from "react";

export interface Props {
  isDrawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
}

export interface SideDrawerButton {
  title: string;
  icon: ReactNode;
  link: string;
}
