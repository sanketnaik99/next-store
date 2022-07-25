import Coffee from "@mui/icons-material/Coffee";
import Close from "@mui/icons-material/Close";
import {
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
  coffeeAmount: number;
  setCoffeeAmount: (amount: number) => void;
}

const BuyCoffeeModal: React.FC<Props> = ({
  isModalOpen,
  closeModal,
  coffeeAmount,
  setCoffeeAmount,
}) => {
  const theme = useTheme();

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Paper
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          [theme.breakpoints.down("md")]: {
            minWidth: "90%",
            padding: "1rem",
          },
          [theme.breakpoints.up("md")]: {
            maxWidth: "60%",
            p: "2rem",
          },
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Buy me a Coffee!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Choose any option you want or enter a custom amount below.
        </Typography>
        <Divider sx={{ marginTop: "0.5rem", marginBottom: "1rem" }} />
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={6} md={3} container justifyContent="center">
            <Button
              variant="contained"
              color={coffeeAmount === 5 ? "primary" : "neutral"}
              onClick={() => setCoffeeAmount(5)}
              fullWidth
              startIcon={<Coffee />}
            >
              1 Cup - $5
            </Button>
          </Grid>
          <Grid item xs={6} md={3} container justifyContent="center">
            <Button
              variant="contained"
              color={coffeeAmount === 15 ? "primary" : "neutral"}
              onClick={() => setCoffeeAmount(15)}
              fullWidth
              startIcon={<Coffee />}
            >
              3 Cups - $15
            </Button>
          </Grid>
          <Grid item xs={6} md={3} container justifyContent="center">
            <Button
              variant="contained"
              color={coffeeAmount === 25 ? "primary" : "neutral"}
              onClick={() => setCoffeeAmount(25)}
              fullWidth
              startIcon={<Coffee />}
            >
              5 Cups - $25
            </Button>
          </Grid>
          <Grid item xs={6} md={3} container justifyContent="center">
            <TextField
              label="Custom ($)"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              onChange={(e) => setCoffeeAmount(parseInt(e.target.value))}
            />
          </Grid>
        </Grid>
        {/* <Stack direction="row" spacing={1}>
          <Chip label="1 Cup - $5" variant="filled" />
          <Chip label="3 Cups - $15" variant="filled" color="secondary" />
        </Stack> */}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mt: "2rem" }}
        >
          <Button color="error" variant="contained" onClick={closeModal}>
            Close
          </Button>
          <Button
            color="success"
            variant="contained"
            disabled={coffeeAmount <= 0}
            onClick={closeModal}
          >
            Done
          </Button>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default BuyCoffeeModal;
