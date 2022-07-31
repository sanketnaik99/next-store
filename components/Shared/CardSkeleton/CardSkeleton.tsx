import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CardSkeleton = () => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: 0,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton height={40} width={150} sx={{ marginBottom: "1rem" }} />
        <Skeleton height={40} width={300} />
        <Skeleton height={40} width={300} />
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Skeleton height={80} width={150} />
          <Skeleton height={80} width={150} />
        </Stack>
      </CardActions>
    </Card>
  );
};

export default CardSkeleton;
