import { Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import DownloadCard from "../../components/Checkout/DownloadCard/DownloadCard";
import { RootState } from "../../ducks";
import { Download, LineItem } from "../../ducks/checkout/types";

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const order = useSelector((state: RootState) =>
    state.user.orders?.data.find((order) => order.id === id)
  );

  const items = order?.order.line_items;
  const digitalDownloads = order?.fulfillment.digital.downloads;

  const formatDate = (epochDate: number) => {
    let date = new Date(epochDate * 1000);
    const period = date.getHours() < 12 ? "AM" : "PM";
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} - ${
      date.getHours() % 12
    }:${date.getMinutes()} ${period}`;
  };

  return (
    <>
      <Grid container sx={{ padding: 3, maxWidth: "100%" }} direction="column">
        <Grid item>
          <Typography variant="h3" component="h3" sx={{ fontWeight: "bold" }}>
            Your Order.
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ marginTop: "0.5rem" }}
          >
            Your order was processed successfully and you can find the details
            of your order below along with the download links for all the
            products that you have purchased
          </Typography>
        </Grid>
        <Grid item sx={{ paddingY: "2rem" }}>
          <Stack spacing={1}>
            <Typography variant="h6" component="h6">
              <b>Order ID:</b> {order?.id}
            </Typography>
            <Typography variant="h6" component="h6">
              <b>Order Amount:</b> {order?.order_value.formatted_with_symbol}
            </Typography>
            <Typography variant="h6" component="h6">
              <b>Ordered On:</b> {formatDate(order?.created ?? 0)}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ paddingLeft: 3, paddingRight: 3, marginBottom: 5 }}
        spacing={3}
      >
        {items &&
          items.map((item, index) => {
            return (
              <Grid item key={item.id + index} md={4} xs={12}>
                <DownloadCard
                  key={item.id + index}
                  item={item as LineItem}
                  download={
                    digitalDownloads?.find(
                      (download: Download) =>
                        download.product_id.toString() === item.product_id
                    ) ?? null
                  }
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default OrderDetails;
