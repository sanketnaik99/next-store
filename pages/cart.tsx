import { LineItem } from "@chec/commerce.js/types/line-item";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CartItemCard from "../components/Cart/CartItemCard/CartItemCard";
import SkeletonCard from "../components/Cart/SkeletonCard/SkeletonCard";
import { RootState } from "../ducks";

const Cart: NextPage = () => {
  const cartItems = useSelector<RootState, LineItem[]>(
    (state) => state.cart.cart.line_items
  );
  const isRemovingItem = useSelector<RootState, boolean>(
    (state) => state.cart.isRemovingItem
  );
  const removingProductId = useSelector<RootState, string | undefined>(
    (state) => state.cart.currentProductId
  );
  const theme = useTheme();

  return (
    <>
      <Grid container sx={{ padding: 3, maxWidth: "100%" }} direction="column">
        <Typography variant="h3" component="h3" sx={{ fontWeight: "bold" }}>
          Cart.
        </Typography>
        <Typography variant="body1" component="p">
          Here is a list of all the products in your cart.
        </Typography>
      </Grid>
      <Grid container sx={{ padding: 3 }}>
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            {cartItems.map((item) =>
              isRemovingItem && item.id === removingProductId ? (
                <SkeletonCard />
              ) : (
                <CartItemCard key={item.id} item={item} />
              )
            )}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={1}
          sx={{
            padding: { xs: 2, md: 0 },
            display: { xs: "block", md: "none" },
          }}
        >
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
          md={1}
          container
          justifyContent="center"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Divider orientation="vertical" variant="middle" />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box height={500}></Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
