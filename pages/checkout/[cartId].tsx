import { useRouter } from "next/router";
import React, { useState } from "react";
import InfoForm, {
  InfoValues,
} from "../../components/Checkout/InfoForm/InfoForm";
import PaymentForm from "../../components/Checkout/PaymentForm/PaymentForm";
import ReviewStep from "../../components/Checkout/ReviewStep/ReviewStep";

import { Paper, Step, StepLabel, Stepper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../ducks";
import Head from "next/head";
import Meta from "../../components/Shared/Meta/Meta";

export interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  coffeeAmount: number;
  paymentID?: string;
}

const Checkout = () => {
  const router = useRouter();
  const { cartId } = router.query;
  const [activeStep, setActiveStep] = useState(0);
  const { firstName, lastName, email } = useSelector(
    (state: RootState) => state.user.user
  );
  const [data, setData] = useState<CheckoutData>({
    firstName: firstName,
    lastName: lastName,
    email: email,
    coffeeAmount: 0,
  });

  const handleInfoSubmit = (values: InfoValues) => {
    console.log(values);
    setData({
      ...data,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    });
    setActiveStep(activeStep + 1);
  };

  const getStepPage = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return (
          <InfoForm
            initialData={data}
            handleInfoSubmit={(values: InfoValues) => handleInfoSubmit(values)}
          />
        );
      case 1:
        return (
          <PaymentForm
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            data={data}
            setData={setData}
          />
        );
      case 2:
        return <ReviewStep data={data} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <Meta
          title={`Checkout - ${cartId} | Sanket Naik Store`}
          description="Ready to place your order? Checkout your cart here."
          url={process.env.NEXT_PUBLIC_BASE_URL + `/checkout/${cartId}`}
          imageURL={process.env.NEXT_PUBLIC_BASE_URL + "/store-banner.png"}
        />
      </Head>
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
        {getStepPage(activeStep)}
      </Paper>
    </>
  );
};

export default Checkout;
