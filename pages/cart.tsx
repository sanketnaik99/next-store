import { LineItem } from "@chec/commerce.js/types/line-item";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../ducks";

const Cart: NextPage = () => {
  const cartItems = useSelector<RootState, LineItem[]>(
    (state) => state.cart.cart.line_items
  );

  return (
    <>
      <Grid container sx={{ padding: 3, maxWidth: "100%" }} direction="column">
        <Typography variant="h3" component="h3" sx={{ fontWeight: "bold" }}>
          Cart.
        </Typography>
        <Typography variant="body1" component="p">
          Here is a list of all the products in your cart.
        </Typography>
      </Grid>
      <Grid container sx={{ padding: 3 }}>
        <Grid item container spacing={2} xs={12} md={6}>
          {cartItems.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="200"
                  image={item.image!.url}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} md={1}>
          <Divider
            orientation="vertical"
            sx={{ display: { xs: "none", md: "flex" } }}
          />
          <Divider
            orientation="horizontal"
            sx={{ display: { xs: "flex", md: "none" } }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box height={500}></Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
