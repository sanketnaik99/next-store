import { Paper, Grid, Stack, Skeleton, Divider } from "@mui/material";
import React from "react";

const SkeletonCard = () => {
  return (
    <Paper>
      <Grid
        container
        spacing={2}
        sx={{
          padding: { md: "0.8rem", xs: "0.5rem" },
        }}
        alignItems="stretch"
      >
        <Grid item xs={12} md={5}>
          {/* Image */}
          <Skeleton variant="rectangular" height={200} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Stack
            direction="column"
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginBottom: { xs: "0.5rem", md: "0rem" } }}
            >
              <Stack>
                {/* Name */}
                <Skeleton variant="text" width={250} height={50} />
                <Skeleton variant="text" width={100} height={50} />
                {/* Variant */}
              </Stack>
              {/* Price */}
              <Skeleton variant="text" width={100} height={50} />
            </Stack>
            <Divider sx={{ display: { xs: "flex", md: "none" } }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginTop: { xs: "0.5rem", md: "0rem" } }}
            >
              <Skeleton variant="rectangular" width={100} height={50} />
              <Skeleton variant="rectangular" width={50} height={50} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SkeletonCard;
