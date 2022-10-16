import { NextPage } from "next";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import SignInFormSkeleton from "../../components/SignIn/SignInForm/SignInFormSkeleton";

import { Typography, Box, Container } from "@mui/material";
import Head from "next/head";
import Meta from "../../components/Shared/Meta/Meta";

const SignInForm = dynamic(
  () => import("../../components/SignIn/SignInForm/SignInForm")
);

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title="Sign In | Sanket Naik Store"
          description="Welcome to my official wallpaper store. You can find lots of cool mobile and desktop wallpapers here which are perfect for devices of all screen sizes. Sign in to your account here."
          url={process.env.NEXT_PUBLIC_BASE_URL ?? "/sign-in"}
          imageURL={
            process.env.NEXT_PUBLIC_BASE_URL + "/assets/store-banner.png"
          }
        />
      </Head>
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
    </>
  );
};

export default SignIn;
