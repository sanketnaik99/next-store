import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PaymentElement, Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Button,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { CreditCard, Description, LocalShipping } from "@mui/icons-material";
import { Box } from "@mui/system";
import InfoForm from "../../components/Checkout/InfoForm/InfoForm";

const Checkout = () => {
  const router = useRouter();
  const { cartId } = router.query;
  const [activeStep, setActiveStep] = useState(0);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
  );

  // useEffect(() => {
  //   router.beforePopState(({ as }) => {
  //     if (as !== router.asPath) {
  //       alert("Are you Sure");
  //       console.log(router.asPath);
  //       return false;
  //     }
  //     return true;
  //   });

  //   return () => {
  //     router.beforePopState(() => true);
  //   };
  // }, [router]);

  const getStepPage = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return <InfoForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Paper
        sx={{
          maxWidth: { xs: "95%", md: "75%" },
          padding: { xs: "1rem", md: "2rem" },
          margin: "3rem auto",
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step key="contact_info">
            <StepLabel>Contact Information</StepLabel>
          </Step>
          <Step key="payment">
            <StepLabel>Payment</StepLabel>
          </Step>
          <Step key="review">
            <StepLabel>Review</StepLabel>
          </Step>
        </Stepper>
        <Box sx={{ margin: "2rem 0rem 1rem 0rem" }}>
          <Typography variant="h5" component="h5" sx={{ fontWeight: 600 }}>
            Contact Information
          </Typography>
          <Typography variant="body1" component="p" sx={{ fontWeight: 400 }}>
            Please fill in your information below to continue.
          </Typography>
        </Box>
        {getStepPage(activeStep)}
      </Paper>
    </div>
  );
};

export default Checkout;
