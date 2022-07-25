import { LineItem } from "@chec/commerce.js/types/line-item";
import Delete from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/system/useTheme";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../ducks";
import {
  removeItemError,
  removeItemLoading,
  removeItemSuccess,
  updateCartError,
  updateCartLoading,
  updateCartSuccess,
} from "../../../ducks/cart";
import { commerce } from "../../../pages/_app";
import CartItemCounter from "../CartItemCounter/CartItemCounter";
import RemoveItemModal from "../RemoveItemModal/RemoveItemModal";

interface Props {
  item: LineItem;
}

const CartItemCard: React.FC<Props> = ({ item }) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

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
    if (item.quantity === 1) {
      return deleteItem();
    }
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

  const deleteItem = () => {
    dispatch(removeItemLoading(item.id));
    commerce.cart
      .update(item.id, { quantity: 0 })
      .then((res) => {
        const newCart = res.cart;
        dispatch(removeItemSuccess(newCart));
      })
      .catch((err) => {
        console.log(err);
        dispatch(removeItemError());
      });
  };

  return (
    <Paper>
      <RemoveItemModal
        isModalOpen={isModalOpen}
        setModalOpen={() => setModalOpen(false)}
        productName={item.name}
        deleteItem={() => deleteItem()}
      />
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
              <Stack>
                {item.quantity > 1 ? (
                  <Typography
                    variant="body1"
                    component="p"
                    textAlign="center"
                    fontWeight={400}
                  >
                    {item.price.formatted_with_symbol}
                  </Typography>
                ) : null}
                <Typography
                  variant="h6"
                  component="h6"
                  textAlign="center"
                  fontWeight={600}
                >
                  {item.line_total.formatted_with_symbol}
                </Typography>
              </Stack>
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
              <IconButton
                color="error"
                size="large"
                onClick={() => setModalOpen(true)}
              >
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
