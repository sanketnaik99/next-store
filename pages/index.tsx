import { CategoryCollection } from "@chec/commerce.js/features/categories";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategorySection from "../components/Home/CategorySection/CategorySection";
import SanketLogoDark from "../public/assets/sanket_logo_dark.png";
import SanketLogoLight from "../public/assets/sanket_logo_light.png";
import { commerce } from "./_app";

const Home: NextPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [categories, setCategories] = useState<CategoryCollection>();

  const fetchCategories = async () => {
    const categories = await commerce.categories.list();

    setCategories(categories);
  };

  useState(() => {
    fetchCategories();
  });

  return (
    <div>
      <Head>
        <title>Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: 600 }}
      >
        <Grid
          item
          padding={3}
          xs={12}
          md={6}
          container
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h3"
              component="h3"
              sx={{ fontWeight: 600, textAlign: { xs: "center", md: "left" } }}
            >
              Welcome.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h6"
              sx={{ fontWeight: 400, textAlign: { xs: "center", md: "left" } }}
            >
              Keep scrolling to explore a world of amazing products
            </Typography>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          md={6}
          item
          padding={3}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid>
            <Image
              src={
                theme.palette.mode === "dark" ? SanketLogoDark : SanketLogoLight
              }
              alt="Sanket Naik Logo"
            />
          </Grid>
        </Grid>
      </Grid>
      {categories
        ? categories.data
            .sort((c1, c2) => c1.created - c2.created)
            .map((category, index) => (
              <CategorySection
                key={category.id}
                category={category}
                index={index}
              />
            ))
        : null}
    </div>
  );
};

export default Home;
