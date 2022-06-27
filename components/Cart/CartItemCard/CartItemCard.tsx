import { LineItem } from "@chec/commerce.js/types/line-item";
import { Delete } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../ducks";
import {
  updateCartError,
  updateCartLoading,
  updateCartSuccess,
} from "../../../ducks/cart";
import { commerce } from "../../../pages/_app";
import CartItemCounter from "../CartItemCounter/CartItemCounter";

interface Props {
  item: LineItem;
}

const CartItemCard: React.FC<Props> = ({ item }) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector<RootState, boolean>(
    (state) => state.cart.isLoading
  );
  const loadingProductId = useSelector<RootState, string | undefined>(
    (state) => state.cart.currentProductId
  );

  const incrementItemCount = () => {
    // Set Loading
    dispatch(updateCartLoading(item.id));
    commerce.cart
      .update(item.id, { quantity: item.quantity + 1 })
      .then((response) => {
        const newCart = response.cart;
        dispatch(updateCartSuccess(newCart));
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateCartError());
      });
  };

  const decrementItemCount = () => {
    // Set Loading
    dispatch(updateCartLoading(item.id));
    commerce.cart
      .update(item.id, { quantity: item.quantity - 1 })
      .then((response) => {
        const newCart = response.cart;
        dispatch(updateCartSuccess(newCart));
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateCartError());
      });
  };

  return (
    <Paper>
      <Grid
        container
        spacing={2}
        sx={{
          padding: { md: "0.8rem", xs: "0.5rem" },
        }}
        alignItems="stretch"
      >
        <Grid item xs={12} md={5}>
          <Image
            src={item!.image!.url}
            alt={item.name}
            width={400}
            height={200}
            layout="responsive"
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Stack
            direction="column"
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginBottom: { xs: "0.5rem", md: "0rem" } }}
            >
              <Stack>
                <Typography variant="h6" component="h6" fontWeight={600}>
                  {item.name}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#BDBDBD" : "#757575",
                  }}
                >
                  {item.sku}
                </Typography>
              </Stack>
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                fontWeight={600}
              >
                {item.price.formatted_with_symbol}
              </Typography>
            </Stack>
            <Divider sx={{ display: { xs: "flex", md: "none" } }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginTop: { xs: "0.5rem", md: "0rem" } }}
            >
              <CartItemCounter
                itemCount={item.quantity}
                increment={() => incrementItemCount()}
                decrement={() => decrementItemCount()}
                isLoading={isLoading && loadingProductId === item.id}
              />
              <IconButton color="error" size="large">
                <Delete />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItemCard;
