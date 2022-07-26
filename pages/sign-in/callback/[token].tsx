import { ErrorMessage } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../ducks";
import {
  generateLoginTokenError,
  generateLoginTokenSuccess,
  getCustomerError,
  getCustomerSuccess,
  initLogin,
} from "../../../ducks/user";
import { User } from "../../../ducks/user/types";
import { commerce } from "../../_app";
import HelloImage from "../../../public/assets/hello.png";
import ErrorImage from "../../../public/assets/error.png";
import Image from "next/image";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { CircularProgress, Grid, Stack, Typography } from '@mui/material';

interface Props {
  token: string;
}

const SignInWithToken: React.FC<Props> = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector<RootState>((state) => state.user.isLoading);
  const errorMessage = useSelector<RootState>(
    (state) => state.user.errorMessage
  );
  const firstName = useSelector<RootState>(
    (state) => state.user.user.firstName
  );

  const handleUserSignIn = async () => {
    dispatch(initLogin());

    try {
      const customerToken = await commerce.customer.getToken(token);
      dispatch(generateLoginTokenSuccess());
      try {
        const about = await commerce.customer.about();
        const user: User = {
          firstName: about.firstname,
          lastName: about.lastname,
          email: about.email,
        };
        dispatch(getCustomerSuccess(user));
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error: any) {
        dispatch(getCustomerError(error?.data?.error?.message));
      }
    } catch (error: any) {
      dispatch(generateLoginTokenError(error?.data?.error?.message));
    }
  };

  useEffect(() => {
    if (token) {
      handleUserSignIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <>
      {isLoading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minWidth: "100wh", minHeight: "100vh" }}
        >
          <Grid item xs={10} md={3}>
            <Stack justifyContent="center">
              <CircularProgress sx={{ margin: "auto" }} />
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                sx={{ paddingTop: "1rem", fontWeight: 600 }}
              >
                Signing In
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      ) : !isLoading && errorMessage !== "" ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minWidth: "100wh", minHeight: "100vh" }}
        >
          <Grid item xs={10} md={3}>
            <Stack justifyContent="center" alignItems="center">
              <Image
                src={ErrorImage}
                width={150}
                height={150}
                alt="There was an Error"
              />
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                color="error"
                sx={{ paddingTop: "1rem", fontWeight: 600 }}
              >
                UNEXPECTED ERROR!
              </Typography>
              <Typography
                variant="body1"
                component="p"
                textAlign="center"
                sx={{ paddingTop: "1rem", fontWeight: 500 }}
              >
                {`${errorMessage}`}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minWidth: "100wh", minHeight: "100vh" }}
        >
          <Grid item xs={10} md={3}>
            <Stack justifyContent="center" alignItems="center">
              <Image
                src={HelloImage}
                width={200}
                height={200}
                alt="Welcome Back!"
              />
              <Typography
                variant="h5"
                component="h5"
                textAlign="center"
                color="primary"
                sx={{ paddingTop: "1rem", fontWeight: 600 }}
              >
                SUCCESS!
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                sx={{ paddingTop: "1rem", fontWeight: 600 }}
              >
                {`Welcome back ${firstName}!`}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      token: context.params?.token?.toString() ?? "undefined",
    },
  };
};

export default SignInWithToken;
