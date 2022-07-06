import { Price } from "@chec/commerce.js/types/price";
import { Coffee } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../ducks";
import BuyCoffeeModal from "../BuyCoffeeModal/BuyCoffeeModal";

const PaymentForm = () => {
  const { formatted, formatted_with_symbol, formatted_with_code, raw } =
    useSelector<RootState, Price>((state) => state.cart.cart.subtotal);

  const [coffeeAmount, setCoffeeAmount] = useState<number>(0);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <BuyCoffeeModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        coffeeAmount={coffeeAmount}
        setCoffeeAmount={(amount: number) => setCoffeeAmount(amount)}
      />
      <Box sx={{ margin: "2rem 0rem 1rem 0rem" }}>
        <Typography variant="h5" component="h5" sx={{ fontWeight: 600 }}>
          Payment Information
        </Typography>
        <Typography variant="body1" component="p" sx={{ fontWeight: 400 }}>
          Please fill in your payment details below to continue.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} justifyContent="center">
          {raw === 0 ? (
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ padding: { xs: "1rem", md: "1rem 3rem", lg: "1rem 5rem" } }}
            >
              <Image
                src="/assets/free.png"
                height={100}
                width={100}
                alt="Free"
              />
              <Typography
                textAlign="center"
                variant="body1"
                component="p"
                sx={{ marginTop: "2rem" }}
              >
                All items in your cart are free and you can continue to the next
                step to review your order.
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                sx={{ fontWeight: 600 }}
              >
                Still feel like paying?
              </Typography>
              <Button
                variant="contained"
                endIcon={<Coffee />}
                onClick={() => setModalOpen(true)}
              >
                Buy me a Coffee
              </Button>
            </Stack>
          ) : (
            <>Pay Please</>
          )}
        </Grid>
        <Grid item xs={12} md={1}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Total
            </Typography>
            <Typography variant="h5">
              {formatted_with_symbol ?? "$0.0"}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentForm;
