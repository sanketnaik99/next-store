import { LineItem } from "@chec/commerce.js/types/line-item";
import { Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import Image from "next/image";
import React from "react";
import CartItemCounter from "../CartItemCounter/CartItemCounter";

interface Props {
  item: LineItem;
}

const CartItemCard: React.FC<Props> = ({ item }) => {
  const theme = useTheme();

  return (
    <Paper>
      <Grid container justifyContent="center" sx={{ padding: "0.5rem" }}>
        <Grid item xs={4}>
          <Image
            src={item!.image!.url}
            alt={item.name}
            width={400}
            height={200}
            layout="responsive"
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            paddingLeft: "10px",
          }}
        >
          <Typography variant="h6" component="h6" fontWeight={600}>
            {item.name}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              color: theme.palette.mode === "dark" ? "#BDBDBD" : "#757575",
              marginBottom: "1rem",
            }}
          >
            {item.sku}
          </Typography>
          <CartItemCounter itemCount={item.quantity} />
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            component="h6"
            textAlign="center"
            fontWeight={600}
          >
            {item.price.formatted_with_symbol}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItemCard;
