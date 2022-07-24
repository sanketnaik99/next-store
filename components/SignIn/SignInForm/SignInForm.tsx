import { LoadingButton } from "@mui/lab";
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { commerce } from "../../../pages/_app";
import { validationSchema } from "./types";

const SignInForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const theme = useTheme();

  const getCallbackURL = (): string => {
    console.log("CURRENT ENVIRONMENT", process.env.NEXT_PUBLIC_ENVIRONMENT);
    switch (process.env.NEXT_PUBLIC_ENVIRONMENT) {
      case "local":
        return "https://localhost:3000/sign-in/callback";
      case "production":
        return "https://store.sanketnaik.dev/sign-in/callback";
      default:
        return "https://localhost:3000/sign-in/callback";
    }
  };

  const submitForm = async (values: { email: string }) => {
    // console.log("Calling commerce");
    setLoading(true);
    commerce.customer
      .login(values.email, getCallbackURL())
      .then((res) => {
        setLoading(false);
        setMessage("Email sent successfully! Please check your inbox.");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 4 }} justifyContent="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            data-cy="signin-email-input-field"
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          sx={{ marginTop: 3 }}
        >
          <Grid item xs={6} md={5}>
            <Stack spacing={3}>
              <LoadingButton
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                loading={isLoading}
                data-cy="signin-submit-button"
              >
                Sign In
              </LoadingButton>
              {message ? (
                <Typography textAlign="center" component="p" variant="body1">
                  {message}
                </Typography>
              ) : null}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignInForm;
