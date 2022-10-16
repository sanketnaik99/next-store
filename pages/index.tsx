import { CategoryCollection } from "@chec/commerce.js/features/categories";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategorySection from "../components/Home/CategorySection/CategorySection";
import Meta from "../components/Shared/Meta/Meta";
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
        <Meta
          title="Home | Sanket Naik Store"
          description="Welcome to my official wallpaper store. You can find lots of cool mobile and desktop wallpapers here which are perfect for devices of all screen sizes."
          url={process.env.NEXT_PUBLIC_BASE_URL ?? ""}
          imageURL={
            process.env.NEXT_PUBLIC_BASE_URL + "/assets/store-banner.png"
          }
        />
      </Head>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "92vh", position: "relative" }}
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
              Keep scrolling to explore a world of amazing wallpapers
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", bottom: 0, zIndex: -2 }}
        >
          <path
            fill="#2196f3"
            fillOpacity="1"
            d="M0,256L48,245.3C96,235,192,213,288,218.7C384,224,480,256,576,240C672,224,768,160,864,144C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
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
