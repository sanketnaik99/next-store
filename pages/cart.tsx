import { LineItem } from "@chec/commerce.js/types/line-item";
import {
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import CartItemCard from "../components/Cart/CartItemCard/CartItemCard";
import SkeletonCard from "../components/Cart/SkeletonCard/SkeletonCard";
import { RootState } from "../ducks";
import { useRouter } from "next/router";

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
  const cartSubtotal = useSelector<RootState, string | undefined>(
    (state) => state.cart.cart.subtotal.formatted_with_symbol
  );
  const cartId = useSelector<RootState, string | undefined>(
    (state) => state.cart.cart.id
  );
  const router = useRouter();

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
        <Grid item xs={12} md={7}>
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
        <Grid item xs={12} md={4}>
          <Typography variant="h4" component="h4" sx={{ fontWeight: 600 }}>
            Cart Summary
          </Typography>
          <Stack spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginTop: "1.5rem" }}
            >
              <Typography sx={{ fontWeight: 600 }}>Subtotal</Typography>
              <Typography>{cartSubtotal ?? "$0.0"}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 600 }}>Tax</Typography>
              <Typography>$0.0</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 600 }}>Shipping</Typography>
              <Typography>$0.0</Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" component="h6" sx={{ fontWeight: 600 }}>
                Total
              </Typography>
              <Typography variant="h6" component="h6">
                {cartSubtotal ?? "$0.0"}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => router.push(`/checkout/${cartId}`)}
            >
              Proceed to Checkout
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
