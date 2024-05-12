import {
  Box,
  Button,
  DialogActions,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { api, useInterceptor } from "../../utils/api";
import { addBuildingEndPoint } from "./ApiEndPoints";

function AddBuildingModal({ open, setOpen }) {
  useInterceptor();
  const [buildingName, setBuildingName] = useState("");

  const handleAddClick = async (e) => {
    try {
      const response = await api.post(addBuildingEndPoint, {
        name: buildingName,
      });
      if (response.status === 200) {
        setBuildingName("");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          Add Building
        </Typography>
        <TextField
          id="input"
          label="New Building Name"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <DialogActions style={{ marginTop: "10px" }}>
          <Button
            onClick={(e) => handleAddClick(e)}
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

export default AddBuildingModal;
