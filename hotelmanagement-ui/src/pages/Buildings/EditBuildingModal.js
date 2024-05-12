import {
  Box,
  Button,
  DialogActions,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { api, useInterceptor } from "../../utils/api";
import {
  getGetBuildingByIdEndPoint,
  updateBuildingEndPoint,
} from "./ApiEndPoints";

function EditBuildingModal({ open, setOpen, buildingId }) {
  useInterceptor();
  const [buildingName, setBuildingName] = useState("");

  useEffect(() => {
    getBuildingByIdReq();
  }, []);

  const getBuildingByIdReq = async () => {
    try {
      const response = await api.get(
        getGetBuildingByIdEndPoint + `?id=${buildingId}`
      );
      setBuildingName(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = async (e) => {
    await updateBuildingReq(buildingName);
    setOpen(false);
  };

  const updateBuildingReq = async (newName) => {
    try {
      const response = await api.put(
        updateBuildingEndPoint + `?id=${buildingId}`,
        {
          name: newName,
        }
      );
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
          Edit Building
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
            onClick={(e) => handleEditClick(e)}
            variant="contained"
            color="secondary"
          >
            Edit
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
}

export default EditBuildingModal;
