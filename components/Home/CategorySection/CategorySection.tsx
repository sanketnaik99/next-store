import { ProductCollection } from "@chec/commerce.js/features/products";
import { Category } from "@chec/commerce.js/types/category";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { commerce } from "../../../pages/_app";
import ProductCard from "../../Products/ProductCard/ProductCard";

type Props = {
  category: Category;
  index: number;
};

const CategorySection: React.FC<Props> = ({ category, index }) => {
  const [isLoadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductCollection>();
  const theme = useTheme();

  const fetchProducts = async () => {
    const products = await commerce.products.list({
      category_id: category.id,
      limit: 3,
    });
    setLoadingProducts(false);
    console.log(products);

    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ backgroundColor: index % 2 === 0 ? "#2196f3" : "inherit" }}>
      <Grid
        container
        justifyContent="center"
        direction={index % 2 === 0 ? "row-reverse" : "row"}
        alignItems="center"
        sx={{
          minHeight: 400,
          marginBottom: "2rem",
          paddingTop: "8rem",
        }}
        key={category.id}
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
              sx={{
                fontWeight: 600,
                textAlign: { xs: "center", md: "left" },
                color:
                  index % 2 === 0
                    ? theme.palette.getContrastText(theme.palette.primary.main)
                    : "inherit",
              }}
            >
              {category.name}.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h6"
              sx={{
                fontWeight: 400,
                textAlign: { xs: "center", md: "left" },
                color:
                  index % 2 === 0
                    ? theme.palette.getContrastText(theme.palette.primary.main)
                    : "inherit",
              }}
            >
              {category.description}
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
              // @ts-ignore
              src={category.assets[0].url}
              alt={category.name}
              height={600}
              width={800}
            />
          </Grid>
        </Grid>
      </Grid>
      {isLoadingProducts ? (
        <>
          <Grid
            container
            sx={{ paddingLeft: 3, paddingRight: 3, marginBottom: 5 }}
            spacing={3}
          >
            {[1, 2, 3].map((num) => (
              <Grid item key={num} md={4} xs={12}>
                <Card>
                  <CardContent sx={{}}>
                    <Skeleton height={300} sx={{ width: "100%" }} />
                    <Skeleton height={40} width={150} />
                    <Skeleton height={40} width={250} />
                    <Skeleton height={40} width={250} />
                  </CardContent>
                  <CardActions sx={{ float: "inline-end", flexGrow: 1 }}>
                    <Skeleton height={60} width={150} />
                    <Skeleton height={60} width={150} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Grid
          container
          sx={{ paddingLeft: 3, paddingRight: 3, paddingBottom: 5 }}
          spacing={3}
        >
          {products?.data &&
            products.data.map((product) => (
              <Grid item key={product.id} md={4} xs={12}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
};

export default CategorySection;
