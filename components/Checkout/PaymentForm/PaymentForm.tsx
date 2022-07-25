import { Price } from "@chec/commerce.js/types/price";
import Coffee from "@mui/icons-material/Coffee";
import Edit from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../ducks";
import { CheckoutData } from "../../../pages/checkout/[cartId]";
import BuyCoffeeModal from "../BuyCoffeeModal/BuyCoffeeModal";

interface Props {
  activeStep: number;
  setActiveStep: (newStep: number) => void;
  data: CheckoutData;
  setData: (data: CheckoutData) => void;
}

const PaymentForm: React.FC<Props> = ({
  activeStep,
  setActiveStep,
  data,
  setData,
}) => {
  const { formatted, formatted_with_symbol, formatted_with_code, raw } =
    useSelector<RootState, Price>((state) => state.cart.cart.subtotal);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
  );

  const [coffeeAmount, setCoffeeAmount] = useState<number>(data.coffeeAmount);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const theme = useTheme();

  const handleNextStep = async (
    elements: StripeElements | null,
    stripe: Stripe | null
  ) => {
    setPaymentError("");
    setLoading(true);
    if (coffeeAmount === 0) {
      console.log("No Coffee Amount");
      setLoading(false);
      setActiveStep(activeStep + 1);
    } else {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) return;

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.log(error);
        setLoading(false);
        setPaymentError(
          error.message ?? "An unknown error occurred. Please try again."
        );
      } else {
        console.log(paymentMethod);
        setLoading(false);
        setData({ ...data, paymentID: paymentMethod.id });
        setActiveStep(activeStep + 1);
      }
    }
  };

  return (
    <>
      <BuyCoffeeModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        coffeeAmount={coffeeAmount}
        setCoffeeAmount={(amount: number) => {
          setCoffeeAmount(amount);
          setData({ ...data, coffeeAmount: amount });
        }}
      />
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <>
              <Box sx={{ margin: "2rem 0rem 1rem 0rem" }}>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{ fontWeight: 600 }}
                >
                  Payment Information
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ fontWeight: 400 }}
                >
                  Please fill in your payment details below to continue.
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={7} justifyContent="center">
                  {raw === 0 && coffeeAmount === 0 ? (
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{
                        padding: {
                          xs: "1rem",
                          md: "1rem 3rem",
                          lg: "1rem 5rem",
                        },
                      }}
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
                        All items in your cart are free and you can continue to
                        the next step to review your order.
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
                    <form>
                      <Box
                        sx={{
                          backgroundColor: theme.palette.background.paper,
                          padding: "1.3rem",
                          borderRadius: "0.5rem",
                        }}
                      >
                        <CardElement
                          options={{
                            style: {
                              base: {
                                color: theme.palette.getContrastText(
                                  theme.palette.background.paper
                                ),
                                iconColor: theme.palette.getContrastText(
                                  theme.palette.background.paper
                                ),
                                fontFamily: "Arial, sans-serif",
                                fontSmoothing: "antialiased",
                                fontSize: "16px",
                                "::placeholder": {
                                  color: theme.palette.getContrastText(
                                    theme.palette.background.paper
                                  ),
                                },
                              },
                            },
                          }}
                        />
                      </Box>
                      {paymentError !== "" ? (
                        <Typography
                          color="error"
                          variant="body1"
                          component="p"
                          sx={{ marginTop: "1rem" }}
                        >
                          {paymentError}
                        </Typography>
                      ) : null}
                    </form>
                  )}
                </Grid>
                <Grid item xs={12} md={1}>
                  <Divider orientation="vertical" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant={coffeeAmount > 0 ? "h6" : "h5"}
                        sx={{ fontWeight: coffeeAmount > 0 ? 500 : 600 }}
                      >
                        {coffeeAmount > 0 ? "Subtotal" : "Total"}
                      </Typography>
                      <Typography variant={coffeeAmount > 0 ? "h6" : "h5"}>
                        {formatted_with_symbol ?? "$0.0"}
                      </Typography>
                    </Stack>
                    {coffeeAmount > 0 ? (
                      <>
                        <Stack direction="row" justifyContent="space-between">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                              Coffee
                            </Typography>
                            <IconButton onClick={() => setModalOpen(true)}>
                              <Edit />
                            </IconButton>
                          </Stack>
                          <Typography variant="h6">
                            ${coffeeAmount.toFixed(2)}
                          </Typography>
                        </Stack>
                        {coffeeAmount > 0 ? <Divider /> : null}
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            Total
                          </Typography>
                          <Typography variant="h5">
                            ${(raw + coffeeAmount).toFixed(2)}
                          </Typography>
                        </Stack>
                      </>
                    ) : null}
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  container
                  item
                  spacing={3}
                  justifyContent="space-between"
                >
                  <Grid item xs={6} md={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => setActiveStep(activeStep - 1)}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <LoadingButton
                      variant="contained"
                      fullWidth
                      type="submit"
                      loading={isLoading}
                      onClick={() => handleNextStep(elements, stripe)}
                    >
                      Next
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
