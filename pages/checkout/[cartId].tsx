import { useRouter } from "next/router";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import InfoForm, {
  InfoValues,
} from "../../components/Checkout/InfoForm/InfoForm";
import PaymentForm from "../../components/Checkout/PaymentForm/PaymentForm";
import ReviewStep from "../../components/Checkout/ReviewStep/ReviewStep";

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
  const [data, setData] = useState<CheckoutData>({
    firstName: "",
    lastName: "",
    email: "",
    coffeeAmount: 0,
  });

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
        {getStepPage(activeStep)}
      </Paper>
    </div>
  );
};

export default Checkout;
