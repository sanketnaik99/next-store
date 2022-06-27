import { Add, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, ButtonGroup, Typography, useTheme } from "@mui/material";
import React from "react";

interface Props {
  itemCount?: number;
  increment: () => void;
  decrement: () => void;
  isLoading?: boolean;
}

const CartItemCounter: React.FC<Props> = ({
  itemCount,
  increment,
  decrement,
  isLoading = false,
}) => {
  const theme = useTheme();

  return (
    <ButtonGroup variant="contained" size="small">
      <LoadingButton
        variant="contained"
        loading={isLoading}
        color="primary"
        onClick={() => decrement()}
      >
        <Remove />
      </LoadingButton>
      <Button variant="outlined">
        <Typography
          variant="h6"
          component="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.contrastText,
          }}
        >
          {itemCount}
        </Typography>
      </Button>
      <LoadingButton
        variant="contained"
        loading={isLoading}
        color="primary"
        onClick={() => increment()}
      >
        <Add />
      </LoadingButton>
    </ButtonGroup>
  );
};

export default CartItemCounter;
