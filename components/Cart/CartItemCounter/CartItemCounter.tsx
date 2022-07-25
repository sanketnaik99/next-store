import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/system/useTheme";
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
    <ButtonGroup variant="outlined" size="small">
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
            color: theme.palette.getContrastText(
              theme.palette.background.default
            ),
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
