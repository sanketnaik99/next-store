import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { commerce } from "../../../pages/_app";
import { validationSchema } from "./types";

const SignInForm = () => {
  const getCallbackURL = (): string => {
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
    console.log("Calling commerce");
    commerce.customer
      .login(values.email, getCallbackURL())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
          <Grid item xs={6} md={4}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              data-cy="signin-submit-button"
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignInForm;
