import { NextPage } from "next";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import SignInFormSkeleton from "../../components/SignIn/SignInForm/SignInFormSkeleton";

import { Typography, Box, Container } from '@mui/material';

const SignInForm = dynamic(
  () => import("../../components/SignIn/SignInForm/SignInForm")
);

const SignIn: NextPage = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h3" component="h3">
          Sign In.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          textAlign="center"
          sx={{ marginTop: 1.5, fontWeight: 400 }}
        >
          Please enter your email below to receive a magic link to sign in to
          the application.
        </Typography>
      </Box>
      <Suspense fallback={<SignInFormSkeleton />}>
        <SignInForm />
      </Suspense>
    </Container>
  );
};

export default SignIn;
