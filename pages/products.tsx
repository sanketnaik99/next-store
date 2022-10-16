import { Product } from "@chec/commerce.js/types/product";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import ProductCard from "../components/Products/ProductCard/ProductCard";
import { commerce } from "./_app";

import { Grid, Typography } from "@mui/material";
import Head from "next/head";
import Meta from "../components/Shared/Meta/Meta";

interface Props {
  products: Product[];
}

const Products: NextPage<Props> = ({ products }) => {
  return (
    <>
      <Head>
        <Meta
          title="Products | Sanket Naik Store"
          description="Browse through all the available wallpapers on the store and learn more about them."
          url={process.env.NEXT_PUBLIC_BASE_URL + "/products"}
          imageURL={process.env.NEXT_PUBLIC_BASE_URL + "/store-logo.png"}
        />
      </Head>
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
