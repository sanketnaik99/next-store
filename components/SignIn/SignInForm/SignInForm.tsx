import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useReducer } from "react";
import { validationSchema } from "./types";

const SignInForm = () => {
  const submitForm = async (values: { email: string }) => {};

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
