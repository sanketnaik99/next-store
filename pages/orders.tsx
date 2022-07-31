import React, { useEffect } from "react";

import { Grid, Typography } from "@mui/material";
import { commerce } from "./_app";
import { useDispatch } from "react-redux";
import {
  getCustomerOrders,
  getCustomerOrdersError,
  getCustomerOrdersSuccess,
} from "../ducks/user";
import CardSkeleton from "../components/Shared/CardSkeleton/CardSkeleton";

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCustomerOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomerOrders = async () => {
    try {
      dispatch(getCustomerOrders());
      const orders = await commerce.customer.getOrders();
      console.log("ORDERS", orders);
      dispatch(getCustomerOrdersSuccess(orders));
    } catch (error: any) {
      console.error(error);
      dispatch(getCustomerOrdersError(`${error?.data?.error?.message}`));
    }
  };

  const getOrderCards = () => {
    // if (orders){
    //   return <></>
    // }
    return [0, 1, 2].map((number) => (
      <Grid item md={4} xs={12} key={number}>
        <CardSkeleton />
      </Grid>
    ));
  };

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
      <Grid
        container
        sx={{ paddingLeft: 3, paddingRight: 3, marginBottom: 5 }}
        spacing={3}
      >
        {getOrderCards()}
      </Grid>
    </>
  );
};

export default Orders;
