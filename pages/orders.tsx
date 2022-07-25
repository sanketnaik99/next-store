import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

const Orders = () => {
  return (
    <>
      <Grid container sx={{ padding: 3, maxWidth: "100%" }} direction="column">
        <Typography variant="h3" component="h3" sx={{ fontWeight: "bold" }}>
          Orders.
        </Typography>
        <Typography variant="body1" component="p">
          Here are all your past orders. Click on an order to view more
          information about it such as the items and order details.
        </Typography>
      </Grid>
    </>
  );
};

export default Orders;
