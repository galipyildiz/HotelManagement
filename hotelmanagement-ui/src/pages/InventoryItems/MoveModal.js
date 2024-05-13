import {
  Box,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { getAllRoomsEndPoint, moveInventoryItemEndPoint } from "./ApiEndPoint";

function MoveModal({ open, setOpen, inventoryItem }) {
  const [rooms, setRooms] = useState([]);
  const [targetRoomId, setTargetRoomId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getRoomsRequest();
    console.log(inventoryItem);
  }, []);

  const getRoomsRequest = async () => {
    try {
      const response = await api.get(getAllRoomsEndPoint);
      setRooms(response.data);
      setTargetRoomId(response.data[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveClick = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(moveInventoryItemEndPoint, {
        inventoryItemId: inventoryItem.inventoryItemId,
        fromStorageId: inventoryItem.storageId,
        toRoomId: targetRoomId,
        quantity: quantity,
      });
      console.log(response.data);
      setOpen(false);
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
          Move - {inventoryItem.inventoryItemName} - Inventory Item
        </Typography>
        <FormControl fullWidth style={{ marginTop: "10px" }}>
          <InputLabel id="simple-select-label">Target Room</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={targetRoomId}
            label="Target Room"
            onChange={(e) => setTargetRoomId(e.target.value)}
          >
            {rooms.map((room) => (
              <MenuItem key={room.id} value={room.id}>
                {room.id} - {room.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "10px" }}>
          <TextField
            id="outlined-number"
            label="Quantity"
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            defaultValue={quantity}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                min: 1,
                max: inventoryItem.quantity,
              },
            }}
          />
        </FormControl>
        <DialogActions style={{ marginTop: "10px" }}>
          <Button
            onClick={(e) => handleMoveClick(e)}
            variant="contained"
            color="secondary"
          >
            Move
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
}

export default MoveModal;
