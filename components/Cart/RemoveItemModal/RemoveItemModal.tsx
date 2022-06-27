import {
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  isModalOpen: boolean;
  setModalOpen: () => void;
  deleteItem: () => void;
  productName: string;
}

const RemoveItemModal: React.FC<Props> = ({
  isModalOpen,
  setModalOpen,
  productName,
  deleteItem,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={setModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you Sure?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure that you want to remove {productName} from your cart?
          This action is permanent.
        </Typography>
        <Divider sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" color="success" onClick={setModalOpen}>
            No, Close
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteItem();
              setModalOpen();
            }}
          >
            Delete
          </Button>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default RemoveItemModal;
