import {
  Box,
  Button,
  DialogActions,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function AddStorageModal({ open, setOpen }) {
  return (
    <Modal
      open={open}
      onClose={(e) => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          width: 400,
          maxWidth: "90%",
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Add Room
        </Typography>
        <TextField
          id="input"
          label="New Room Name"
          //   value={buildingName}
          //   onChange={(e) => setBuildingName(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <DialogActions style={{ marginTop: "10px" }}>
          <Button
            // onClick={(e) => handleAddClick(e)}
            variant="contained"
            color="success"
          >
            Add
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
}

export default AddStorageModal;
