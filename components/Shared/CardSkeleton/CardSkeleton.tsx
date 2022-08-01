import { Card, CardActions, CardContent, Skeleton, Stack } from "@mui/material";
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
        <Skeleton height={40} sx={{ marginBottom: "1rem", maxWidth: 300 }} />
        <Skeleton height={40} sx={{ width: "100%" }} />
        <Skeleton height={40} sx={{ width: "100%" }} />
      </CardContent>
      <CardActions>
        <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
          <Skeleton height={80} sx={{ width: "90%", maxWidth: 400 }} />
        </Stack>
      </CardActions>
    </Card>
  );
};

export default CardSkeleton;
