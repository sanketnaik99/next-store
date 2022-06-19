import { Product } from "@chec/commerce.js/types/product";
import { Grid, Typography } from "@mui/material";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import ProductCard from "../components/Products/ProductCard/ProductCard";
import { commerce } from "./_app";

interface Props {
  products: Product[];
}

const Products: NextPage<Props> = ({ products }) => {
  return (
    <>
      <Grid container sx={{ padding: 3, maxWidth: "100%" }} direction="column">
        <Typography variant="h3" component="h3" sx={{ fontWeight: "bold" }}>
          Products.
        </Typography>
        <Typography variant="body1" component="p">
          Here are all the products that are available
        </Typography>
      </Grid>
      <Grid
        container
        sx={{ paddingLeft: 3, paddingRight: 3, marginBottom: 5 }}
        spacing={3}
      >
        {products.map((product) => (
          <Grid item key={product.id} md={4} xs={12}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Products;

export const getStaticProps: GetStaticProps = async (context) => {
  const productsData = await commerce.products.list();
  return {
    props: {
      products: productsData.data,
    },
  };
};
