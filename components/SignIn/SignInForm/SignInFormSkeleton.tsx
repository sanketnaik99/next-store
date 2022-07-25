import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const SignInFormSkeleton = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 4 }} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Skeleton />
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
              <Skeleton />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SignInFormSkeleton;
