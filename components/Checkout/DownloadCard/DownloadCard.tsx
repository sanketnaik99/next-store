import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Download, LineItem } from "../../../ducks/checkout/types";

type Props = {
  item: LineItem;
  download: Download | null;
};

const DownloadCard: React.FC<Props> = ({ item, download }) => {
  console.log(download?.packages[0].access_link);
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Image
          src={item.image.url}
          height={300}
          width={500}
          alt={item.product_name}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          sx={{ fontWeight: "bold" }}
        >
          {item.product_name}
        </Typography>
      </CardContent>
      <CardActions sx={{ float: "inline-end" }}>
        <Link
          href={download?.packages[0].access_link ?? ""}
          passHref={true}
          target="_blank"
        >
          <Button size="small" fullWidth variant="contained">
            Download
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default DownloadCard;
