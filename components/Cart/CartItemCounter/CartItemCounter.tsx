import { Add, Remove } from "@mui/icons-material";
import { Button, ButtonGroup, Typography, useTheme } from "@mui/material";
import React from "react";

interface Props {
  itemCount?: number;
  increment?: () => void;
  decrement?: () => void;
}

const CartItemCounter: React.FC<Props> = ({
  itemCount,
  increment,
  decrement,
}) => {
  const theme = useTheme();

  return (
    <ButtonGroup variant="contained" size="small">
      <Button>
        <Remove />
      </Button>
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
      <Button>
        <Add />
      </Button>
    </ButtonGroup>
  );
};

export default CartItemCounter;
