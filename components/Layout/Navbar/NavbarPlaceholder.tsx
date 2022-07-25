import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/assets/store-logo.svg";

const NavbarPlaceholder = () => {
  return (
    <AppBar position="sticky" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ cursor: "pointer" }}>
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
            <Stack direction="row" spacing={3}>
              <Skeleton width={120} height={40} />
              <Skeleton width={120} height={40} />
              <Skeleton width={120} height={40} />
            </Stack>
          </Box>
          <Box
            sx={{
              flexGrow: { xs: 1, md: 0 },
              display: "flex",
              flexDirection: "row-reverse",
              marginLeft: 3,
            }}
          >
            <Stack direction="row" spacing={3}>
              <Skeleton width={40} height={40} />
              <Skeleton width={40} height={40} />
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarPlaceholder;
