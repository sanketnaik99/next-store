import { Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../ducks";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";
import { commerce } from "./_app";
import { User } from "../ducks/user/types";
import { updateCustomer } from "../ducks/user";
import Head from "next/head";
import Meta from "../components/Shared/Meta/Meta";

export const validationSchema = object().shape({
  firstName: string()
    .required("Your first name is required")
    .min(3, "Please enter a valid name"),
  lastName: string()
    .required("Your last name is required")
    .min(3, "Please enter a valid name"),
  email: string()
    .email("Please enter a valid email address")
    .required("Your email address is required")
    .min(3, "Please enter a valid email address."),
});

const Profile = () => {
  const { firstName, lastName, email } = useSelector(
    (state: RootState) => state.user.user
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
    onSubmit: (values, helpers) => {
      handleProfileSubmit(values);
    },
  });

  const handleProfileSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    setLoading(true);
    setMessage("");
    if (
      values.firstName === firstName &&
      values.lastName === lastName &&
      values.email === email
    ) {
      setLoading(false);
      setMessage("Nothing to update");
    }

    try {
      const customer = await commerce.customer.update({
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
      });
      const updatedCustomer: User = {
        firstName: customer.firstname,
        lastName: customer.lastname,
        email: customer.email,
      };
      dispatch(updateCustomer(updatedCustomer));
      setLoading(false);
      setMessage("Successfully updated your profile!");
    } catch (error: any) {
      setLoading(false);
      setMessage(`${error?.data?.error?.message}`);
    }
  };

  return (
    <>
      <Head>
        <Meta
          title="Profile | Sanket Naik Store"
          description="View and edit everything about your current profile."
          url={process.env.NEXT_PUBLIC_BASE_URL + "/profile"}
          imageURL={
            process.env.NEXT_PUBLIC_BASE_URL + "/assets/store-banner.png"
          }
        />
      </Head>
      <Grid container sx={{ padding: 3, maxWidth: "100%" }} direction="column">
        <Typography variant="h3" component="h3" sx={{ fontWeight: "bold" }}>
          Hello {firstName}.
        </Typography>
        <Typography variant="body1" component="p">
          Want to edit your profile? You&apos;ve come to right place! Fill out
          the form below and we&apos;ll handle the rest.
        </Typography>
      </Grid>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          sx={{
            padding: 3,
          }}
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="First Name"
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              fullWidth
              loading={isLoading}
              variant="contained"
            >
              Update Profile
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            {message ? (
              <Typography textAlign="center" component="p" variant="body1">
                {message}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Profile;
