import React from "react";
import { useSelector } from "react-redux";
import DownloadCard from "../../../components/Checkout/DownloadCard/DownloadCard";
import { RootState } from "../../../ducks";
import { Download, LineItem } from "../../../ducks/checkout/types";

import { Grid, Typography } from "@mui/material";
import Head from "next/head";
import Meta from "../../../components/Shared/Meta/Meta";

const CheckoutSuccess = () => {
  const items = useSelector<RootState, LineItem[] | undefined>(
    (state) => state.checkout.checkoutResponse?.order?.line_items
  );
  const digitalDownloads = useSelector<RootState, Download[] | undefined>(
    (state) => state.checkout.checkoutResponse?.fulfillment?.digital.downloads
  );

  return (
    <>
      <Head>
        <Meta
          title={`Checkout Success | Sanket Naik Store`}
          description="Your order was placed successfully! Sit back and enjoy your new wallpapers"
          url={process.env.NEXT_PUBLIC_BASE_URL + "/checkout/success"}
          imageURL={process.env.NEXT_PUBLIC_BASE_URL + "/store-banner.png"}
        />
      </Head>
      <Grid container sx={{ padding: 3, maxWidth: "100%" }} direction="column">
        <Typography variant="h3" component="h3" sx={{ fontWeight: "bold" }}>
          Order Successful.
        </Typography>
        <Typography variant="body1" component="p">
          Your order was processed successfully. You can download the items
          below or visit the orders page to view all orders.
        </Typography>
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
                  item={item}
                  download={
                    digitalDownloads?.find(
                      (download) =>
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

export default CheckoutSuccess;
