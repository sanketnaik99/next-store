import { Price } from "@chec/commerce.js/types/price";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../ducks";
import {
  captureOrderError,
  captureOrderSuccess,
  generateCheckoutTokenError,
  generateCheckoutTokenLoading,
  resetCheckoutError,
} from "../../../ducks/checkout";
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
  const checkoutLoading = useSelector<RootState, boolean>(
    (state) => state.checkout.isLoading
  );
  const errorMessage = useSelector<RootState, string>(
    (state) => state.checkout.errorMessage ?? ""
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleConfirmOrder = async () => {
    dispatch(generateCheckoutTokenLoading());

    try {
      const token = await commerce.checkout.generateToken(cartID, {
        type: "cart",
      });
      console.log(token);
      try {
        const checkout = await commerce.checkout.capture(token.id, {
          line_items: cartItems,
          customer: {
            firstname: data.firstName,
            lastname: data.lastName,
            email: data.email,
          },
          pay_what_you_want: data.coffeeAmount.toFixed(2).toString(),
          payment: {
            gateway: "stripe",
          },
        });
        console.log(JSON.stringify(checkout));
        dispatch(captureOrderSuccess(checkout));
        // router.push(`/checkout/success/${checkout.id}`);
      } catch (err: any) {
        dispatch(captureOrderError(`${err?.data?.error?.message}`));
      }
    } catch (err: any) {
      console.log(err);
      dispatch(generateCheckoutTokenError(`${err?.data?.error?.message}`));
      setTimeout(() => {
        dispatch(resetCheckoutError());
      }, 4000);
    }
  };

  return (
    <>
      {errorMessage ? (
        <Slide direction="left" in={errorMessage !== ""}>
          <Alert
            variant="filled"
            severity="error"
            sx={{ position: "fixed", top: "6rem", right: "1rem" }}
          >
            {errorMessage}
          </Alert>
        </Slide>
      ) : null}
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
        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          onClick={handleConfirmOrder}
          loading={checkoutLoading}
        >
          Confirm Order
        </LoadingButton>
      </Stack>
    </>
  );
};

export default ReviewStep;
