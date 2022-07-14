import { Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../ducks";

const CheckoutSuccess = () => {
  // const items = useSelector<RootState>(state => state.checkout.checkoutResponse)

  return (
    <>
      <Grid container sx={{ padding: 3, maxWidth: "100%" }} direction="column">
        <Typography variant="h3" component="h3" sx={{ fontWeight: "bold" }}>
          Order Successful.
        </Typography>
        <Typography variant="body1" component="p">
          Your order was processed successfully. You can download the items
          below or visit the orders page to view all orders.
        </Typography>
      </Grid>
      <Grid container sx={{ marginTop: "3rem" }} spacing={2}>
        <Grid></Grid>
      </Grid>
    </>
  );
};

export default CheckoutSuccess;
