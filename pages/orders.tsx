import React, { useEffect } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { commerce } from "./_app";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerOrders,
  getCustomerOrdersError,
  getCustomerOrdersSuccess,
} from "../ducks/user";
import CardSkeleton from "../components/Shared/CardSkeleton/CardSkeleton";
import { RootState } from "../ducks";
import { Order } from "@chec/commerce.js/types/order";
import Link from "next/link";
import Head from "next/head";
import Meta from "../components/Shared/Meta/Meta";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector<RootState, Order[] | undefined>(
    (state) => state.user.orders?.data
  );

  useEffect(() => {
    fetchCustomerOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomerOrders = async () => {
    try {
      dispatch(getCustomerOrders());
      const orders = await commerce.customer.getOrders();
      dispatch(getCustomerOrdersSuccess(orders));
    } catch (error: any) {
      console.error(error);
      dispatch(getCustomerOrdersError(`${error?.data?.error?.message}`));
    }
  };

  const formatDate = (epochDate: number) => {
    let date = new Date(epochDate * 1000);
    const period = date.getHours() < 12 ? "AM" : "PM";
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} - ${
      date.getHours() % 12
    }:${date.getMinutes()} ${period}`;
  };

  const getOrderCards = () => {
    if (orders) {
      return orders.map((order) => (
        <Grid item md={4} xs={12} key={order.id}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="h6"
                sx={{ fontWeight: "bold" }}
              >
                {order.id}
              </Typography>
              <Typography variant="body2" component="p">
                <b>Ordered:</b> {formatDate(order.created)}
              </Typography>
              <Typography variant="body2" component="p">
                <b>Order Value:</b> {order.order_value.formatted_with_symbol}
              </Typography>
            </CardContent>
            <CardActions sx={{ float: "inline-end" }}>
              <Link href={`/order/${order.id}`}>
                <Button
                  size="small"
                  fullWidth
                  variant="outlined"
                  color="neutral"
                >
                  Order Details
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ));
    }
    return [0, 1, 2].map((number) => (
      <Grid item md={4} xs={12} key={number}>
        <CardSkeleton />
      </Grid>
    ));
  };

  return (
    <>
      <Head>
        <Meta
          title="Orders | Sanket Naik Store"
          description="View all of your past orders here. You can also download the items from your past orders here."
          url={process.env.NEXT_PUBLIC_BASE_URL + "/orders"}
          imageURL={process.env.NEXT_PUBLIC_BASE_URL + "/store-logo.png"}
        />
      </Head>
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
