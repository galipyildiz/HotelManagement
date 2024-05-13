import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { api, useInterceptor } from "../../utils/api";
import {
  addInventoryItemEndpoint,
  getAllStoragesEndpoint,
} from "./ApiEndPoints";

function InventoryMovements() {
  useInterceptor();
  const defaultNewInventoryItem = {
    name: "",
    locations: [],
  };
  const [storages, setStorages] = useState([]);
  const [selectedStorages, setSelectedStorages] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [newInventoryItem, setNewInventoryItem] = useState(
    defaultNewInventoryItem
  );

  useEffect(() => {
    getStoragesRequest();
  }, []);

  useEffect(() => {
    console.log(newInventoryItem);
  }, [newInventoryItem]);

  const getStoragesRequest = async () => {
    try {
      const response = await api.get(getAllStoragesEndpoint);
      setStorages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedStorages(typeof value === "string" ? value.split(",") : value);
    let locations = [];
    for (const storageId of value) {
      locations.push({
        storageId: storageId,
        quantity: 1,
      });
    }
    setNewInventoryItem({ ...newInventoryItem, locations: locations });
  };

  const handleQuantityChange = (e, storageId) => {
    let quantity = Number(e.target.value);
    let temp = newInventoryItem.locations.map((x) =>
      x.storageId === storageId ? { ...x, quantity: quantity } : x
    );
    setNewInventoryItem({ ...newInventoryItem, locations: temp });
  };

  const handleAddNewInventoryItemClick = async (e) => {
    e.preventDefault();
    await addInventoryItemReq();
    setSelectedStorages([]);
    setNewInventoryItem(defaultNewInventoryItem);
  };

  const addInventoryItemReq = async () => {
    try {
      console.log(newInventoryItem);
      const response = await api.post(addInventoryItemEndpoint, {
        name: newInventoryItem.name,
        locations: newInventoryItem.locations,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h5" marginBottom={5}>
        Inventory Movements
      </Typography>
      <div>
        <Typography paragraph marginBottom={5}>
          Add Inventory Item. Select Target Storages
        </Typography>
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="multiple-checkbox-label">Target Storages</InputLabel>
          <Select
            labelId="multiple-checkbox-label"
            id="multiple-checkbox"
            name="storages"
            multiple
            value={selectedStorages}
            onChange={handleChange}
            input={<OutlinedInput label="Target Storages" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                },
              },
            }}
          >
            {storages.map((storage) => (
              <MenuItem key={storage.id} value={storage.id}>
                <Checkbox
                  name="asdasd"
                  checked={selectedStorages.indexOf(storage.id) > -1}
                />
                <ListItemText primary={storage.id + " - " + storage.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {selectedStorages.length > 0 && (
        <div>
          <TextField
            id="input"
            label="New Inventory Item Name"
            value={newInventoryItem.name}
            onChange={(e) =>
              setNewInventoryItem({ ...newInventoryItem, name: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          {selectedStorages.map((selectedStorageId) => (
            <div key={selectedStorageId}>
              <TextField
                id="input"
                label="Storage"
                value={storages.find((x) => x.id === selectedStorageId).name}
                disabled
                sx={{ m: 2 }}
              />
              <TextField
                id="outlined-number"
                label="Quantity"
                type="number"
                onChange={(e) => handleQuantityChange(e, selectedStorageId)}
                sx={{ m: 2 }}
                defaultValue={
                  newInventoryItem.locations.find(
                    (x) => x.storageId === selectedStorageId
                  ).quantity
                }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                }}
              />
            </div>
          ))}
          <div style={{ display: "flex" }}>
            <Button
              style={{ marginLeft: "auto" }}
              color="success"
              variant="outlined"
              onClick={(e) => handleAddNewInventoryItemClick(e)}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryMovements;
