import { Product } from "@chec/commerce.js/types/product";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../ducks";
import { addToCart } from "../../../ducks/cart";
import { commerce } from "../../../pages/_app";
import { Props } from "./types";

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const addItemToCart = async (product: Product) => {
    await commerce.cart
      .add(product.id, 1)
      .then((res) => {
        console.log(`Added ${product.name} to Cart`);
        // Dispatch Success Action
        dispatch(addToCart(res.cart));
      })
      .catch((err) => {
        console.log(`Error adding ${product.name} to Cart`);
        // Dispatch Error Action
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
        <Button
          size="small"
          fullWidth
          variant="contained"
          onClick={() => {
            addItemToCart(product);
          }}
        >
          Add to Cart
        </Button>
        <Button size="small" fullWidth variant="outlined">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
