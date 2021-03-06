import { Product } from "@chec/commerce.js/types/product";
import LoadingButton from "@mui/lab/LoadingButton";
import useTheme from "@mui/system/useTheme";

import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../ducks";
import {
  addToCartError,
  addToCartLoading,
  addToCartSuccess,
} from "../../../ducks/cart";
import { commerce } from "../../../pages/_app";
import { Props } from "./types";

import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isCartLoading = useSelector<RootState, boolean>(
    (state) => state.cart.isLoading
  );
  const currentProductId = useSelector<RootState, string>(
    (state) => state.cart.currentProductId ?? ""
  );
  const theme = useTheme();

  const addItemToCart = async (product: Product) => {
    dispatch(addToCartLoading(product.id));
    await commerce.cart
      .add(product.id, 1)
      .then((res) => {
        console.log(`Added ${product.name} to Cart`);
        // Dispatch Success Action
        dispatch(addToCartSuccess(res.cart));
      })
      .catch((err) => {
        console.log(`Error adding ${product.name} to Cart`);
        // Dispatch Error Action
        dispatch(addToCartError());
      });
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Image
          src={product.assets[0].url}
          height={300}
          width={500}
          alt={product.name}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          sx={{ fontWeight: "bold" }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" component="p">
          {product.seo.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ float: "inline-end" }}>
        <LoadingButton
          size="small"
          fullWidth
          variant="contained"
          onClick={() => {
            addItemToCart(product);
          }}
          loading={isCartLoading && currentProductId === product.id}
        >
          Add to Cart
        </LoadingButton>
        <Button size="small" fullWidth variant="outlined" color="neutral">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
