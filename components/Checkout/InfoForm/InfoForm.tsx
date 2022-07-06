import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import validationSchema from "./types";

export interface InfoValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface Props {
  handleInfoSubmit: (values: InfoValues) => void;
}

const InfoForm: React.FC<Props> = ({ handleInfoSubmit }) => {
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values, helpers) => {
      handleInfoSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ margin: "2rem 0rem 1rem 0rem" }}>
        <Typography variant="h5" component="h5" sx={{ fontWeight: 600 }}>
          Contact Information
        </Typography>
        <Typography variant="body1" component="p" sx={{ fontWeight: 400 }}>
          Please fill in your information below to continue.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="First Name"
            label="First Name"
            variant="outlined"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Last Name"
            label="Last Name"
            variant="outlined"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Email"
            label="Email"
            variant="outlined"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid xs={12} container item spacing={3} justifyContent="space-between">
          <Grid item xs={6} md={3}>
            {/* <Button variant="contained" fullWidth>
            Back
          </Button> */}
          </Grid>
          <Grid item xs={6} md={3}>
            <Button variant="contained" fullWidth type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default InfoForm;
