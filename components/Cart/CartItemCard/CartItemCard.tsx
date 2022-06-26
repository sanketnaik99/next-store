import { LineItem } from "@chec/commerce.js/types/line-item";
import { Delete } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
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
      {/* Horizontal View */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "0.5rem", display: { md: "flex", xs: "none" } }}
      >
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
              marginBottom: "0.8rem",
            }}
          >
            {item.sku}
          </Typography>
          <CartItemCounter itemCount={item.quantity} />
        </Grid>
        <Grid
          item
          container
          direction="column"
          xs={2}
          spacing={3}
          alignItems="center"
        >
          <Grid item xs>
            <Typography
              variant="h6"
              component="h6"
              textAlign="center"
              fontWeight={600}
            >
              {item.price.formatted_with_symbol}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton color="error" size="large">
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {/* Vertical View */}
      <Stack
        spacing={2}
        sx={{
          padding: { md: "0.8rem", xs: "0.5rem" },
          display: { md: "none", xs: "flex" },
        }}
      >
        <Image
          src={item!.image!.url}
          alt={item.name}
          width={400}
          height={200}
          layout="responsive"
        />
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography variant="h6" component="h6" fontWeight={600}>
              {item.name}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{
                color: theme.palette.mode === "dark" ? "#BDBDBD" : "#757575",
              }}
            >
              {item.sku}
            </Typography>
          </Stack>
          <Typography
            variant="h6"
            component="h6"
            textAlign="center"
            fontWeight={600}
          >
            {item.price.formatted_with_symbol}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <CartItemCounter itemCount={item.quantity} />

          <IconButton color="error" size="large">
            <Delete />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CartItemCard;
