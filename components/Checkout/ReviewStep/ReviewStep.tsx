import { Price } from "@chec/commerce.js/types/price";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../ducks";
import { CheckoutData } from "../../../pages/checkout/[cartId]";
import { commerce } from "../../../pages/_app";

interface Props {
  data: CheckoutData;
}

const ReviewStep: React.FC<Props> = ({ data }) => {
  const { formatted, formatted_with_symbol, formatted_with_code, raw } =
    useSelector<RootState, Price>((state) => state.cart.cart.subtotal);
  const cartItems = useSelector<RootState>(
    (state) => state.cart.cart.line_items
  );
  const cartID = useSelector<RootState, string>((state) => state.cart.cart.id);

  const handleConfirmOrder = async () => {
    const token = await commerce.checkout.generateToken(cartID, {
      type: "cart",
    });

    console.log(token);

    const checkout = commerce.checkout
      .capture(token.id, {
        line_items: cartItems,
        customer: {
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
        },
        pay_what_you_want: "0.0",
        payment: {
          gateway: "stripe",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          width: { xs: "100%", md: "50%" },
          marginX: "auto",
          marginTop: "2rem",
        }}
      >
        <Typography variant="h5" textAlign="center" sx={{ fontWeight: 600 }}>
          Contact Information
        </Typography>
        <Divider />
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              First Name
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {data.firstName}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Last Name
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {data.lastName}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Email
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {data.email}
            </Typography>
          </Stack>
        </Stack>
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ fontWeight: 600, paddingTop: "3rem" }}
        >
          Payment Information
        </Typography>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant={data.coffeeAmount > 0 ? "h6" : "h5"}
            sx={{ fontWeight: data.coffeeAmount > 0 ? 500 : 600 }}
          >
            {data.coffeeAmount > 0 ? "Subtotal" : "Total"}
          </Typography>
          <Typography variant={data.coffeeAmount > 0 ? "h6" : "h5"}>
            {formatted_with_symbol ?? "$0.0"}
          </Typography>
        </Stack>
        {data.coffeeAmount > 0 ? (
          <>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Coffee
              </Typography>
              <Typography variant="h6">
                ${data.coffeeAmount.toFixed(2)}
              </Typography>
            </Stack>
            {data.coffeeAmount > 0 ? <Divider /> : null}
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Total
              </Typography>
              <Typography variant="h5">
                ${(raw + data.coffeeAmount).toFixed(2)}
              </Typography>
            </Stack>
          </>
        ) : null}
        <Box sx={{ paddingTop: "2rem" }}></Box>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </Button>
      </Stack>
    </>
  );
};

export default ReviewStep;
